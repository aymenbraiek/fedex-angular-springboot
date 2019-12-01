package com.trung.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.trung.demo.model.AuthRequest;
import com.trung.demo.model.AuthResponse;
import com.trung.demo.model.User;
import com.trung.demo.repository.UserRepository;
import com.trung.demo.security.JwtUtil;

@Service
public class AuthService {
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	UserService userService;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	
	public boolean isFilled(String field) {
		return field != null && !field.equals("");
	}
	
	public AuthResponse validateLogin(AuthRequest authReq) {		
		AuthResponse authRes = new AuthResponse();
		
		// check if username & password are filled
		boolean userNameFilled = isFilled(authReq.getEmail());
		boolean passwordFilled = isFilled(authReq.getPassword());
		
		// check if username is filled
		if (!userNameFilled) {
			authRes.setEmailErrMsg("Please enter email");
		}
		
		// check if password is filled
		if (!passwordFilled) {
			authRes.setPasswordErrMsg("Please enter password");
		}
		
		// if one of them isn't filled --> return
		if (!userNameFilled || !passwordFilled) {
			authRes.setValid(false);
			return authRes;
		}
		
		// all fields are filled, start authenticate
		try {
			Authentication authObj = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authReq.getEmail(), authReq.getPassword()));
			
			// good authentication, create JWT token
			String jwtToken = jwtUtil.generateToken(authReq.getEmail());
			
			authRes.setJwtToken("Bearer " + jwtToken);
			authRes.setValid(authObj.isAuthenticated());
			authRes.setEmailErrMsg(null);
			authRes.setPasswordErrMsg(null);
			authRes.setCurrent_user(userRepo.findByEmail(authReq.getEmail()));
			authRes.setSuccessMsg("You have logged in successfully!");
			
			return authRes;
			
		} catch (AuthenticationException e) {
			authRes.setValid(false);
			// wrong username
			if (!userRepo.existsByEmail(authReq.getEmail())) {
				authRes.setEmailErrMsg("Invalid username");
			} else {
				// correct username, wrong password
				authRes.setPasswordErrMsg("Invalid password");
			}
			return authRes;
		}
	}
	
	public AuthResponse register(User newUser) {
		AuthResponse authRes = new AuthResponse();
		
		boolean isFirstNameFilled = isFilled(newUser.getFirstName());
		boolean isLastNameFilled = isFilled(newUser.getLastName());
		boolean isEmailFilled = isFilled(newUser.getEmail());
		boolean isPasswordFilled = isFilled(newUser.getPassword());
		
		if (!isFirstNameFilled) {
			authRes.setFirstNameErrMsg("Please enter first name");
		}
		
		if (!isLastNameFilled) {
			authRes.setLastNameErrMsg("Please enter last name");
		}
		
		if (!isEmailFilled) {
			authRes.setEmailErrMsg("Please enter email");
		}
		
		if (!isPasswordFilled) {
			authRes.setPasswordErrMsg("Please password");
		}
		
		if (!isFirstNameFilled || !isLastNameFilled || !isEmailFilled || !isPasswordFilled ) {
			authRes.setValid(false);
			return authRes;
		}
		
		if (!newUser.getPassword().equals(newUser.getConfirmPassword())) {
			authRes.setConfirmPasswordErrMsg("Passwords not matched");
			authRes.setValid(false);
			return authRes;
		}
		
		if (userRepo.existsByEmail(newUser.getEmail())) {
			authRes.setValid(false);
			authRes.setGeneralErr("This user already exists");
			return authRes;
		}
		
		newUser.setPassword(new BCryptPasswordEncoder().encode(newUser.getPassword()));
		userRepo.save(newUser);
		authRes.setValid(true);
		authRes.setSuccessMsg("Your account has been created! You can login now");
		return authRes;
	}
	
}
