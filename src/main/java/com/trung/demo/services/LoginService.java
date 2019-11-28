package com.trung.demo.services;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.trung.demo.exceptions.CustomException;
import com.trung.demo.model.AuthRequest;
import com.trung.demo.model.AuthResponse;
import com.trung.demo.model.User;
import com.trung.demo.repository.UserRepository;
import com.trung.demo.security.JwtUtil;

@Service
public class LoginService {
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	
	public boolean isUserNameFilled(String userName) {
		return userName != null && !userName.equals("");
	}
	
	public boolean isPasswordFilled(String password) {
		return password != null && !password.equals("");
	}
	
	public AuthResponse validateLogin(AuthRequest authReq) {		
		AuthResponse authRes = new AuthResponse();
		
		// check if username & password are filled
		boolean userNameFilled = isUserNameFilled(authReq.getUsername());
		boolean passwordFilled = isPasswordFilled(authReq.getPassword());
		
		// check if username is filled
		if (!userNameFilled) {
			authRes.setUserNameErrMsg("Please enter username");
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
			Authentication authObj = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authReq.getUsername(), authReq.getPassword()));
			
			// good authentication, create JWT token
			String jwtToken = jwtUtil.generateToken(authReq.getUsername());
			authRes.setJwt(jwtToken);
			authRes.setValid(authObj.isAuthenticated());
			authRes.setUserNameErrMsg(null);
			authRes.setPasswordErrMsg(null);
			authRes.setCurrent_user(userRepo.findByUsername(authReq.getUsername()));
			
			return authRes;
			
		} catch (AuthenticationException e) {
			authRes.setValid(false);
			// wrong username
			if (!userRepo.existsByUsername(authReq.getUsername())) {
				authRes.setUserNameErrMsg("Invalid username");
			} else {
				// correct username, wrong password
				authRes.setPasswordErrMsg("Invalid password");
			}
			return authRes;
		}
	}
	
}
