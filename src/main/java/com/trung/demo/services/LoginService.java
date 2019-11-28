package com.trung.demo.services;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import com.trung.demo.model.AuthRequest;
import com.trung.demo.model.AuthResponse;
import com.trung.demo.model.User;
import com.trung.demo.repository.UserRepository;

@Service
public class LoginService {
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	
	public boolean isUserNameFilled(String userName) {
		return userName != null && !userName.equals("");
	}
	
	public boolean isPasswordFilled(String password) {
		return password != null && !password.equals("");
	}
	
	public AuthResponse validateLogin(AuthRequest authReq) {
		AuthResponse authRes = new AuthResponse();
		authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authReq.getUserName(), authReq.getPassword()));
		
		
//		boolean userNameFilled = isUserNameFilled(credentials.get("userName"));
//		boolean passwordFilled = isPasswordFilled(credentials.get("password"));
//		
//		if (!userNameFilled) {
//			res.put("userNameErrMsg", "Please enter username");
//		} else {
//			res.put("userNameErrMsg", null);
//		}
//		
//		if (!passwordFilled) {
//			res.put("passwordErrMsg", "Please enter password");
//		} else {
//			res.put("passwordErrMsg", null);
//		}
//		
//		if (!userNameFilled || !passwordFilled) {
//			res.put("valid", false);
//			res.put("current_user", null);
//			return res;
//		}
//		
//		if (!userRepo.existsByUserName(credentials.get("userName"))) {
//			res.put("valid", false);
//			res.put("userNameErrMsg", "Invalid username");
//			res.put("passwordErrMsg", null);
//			res.put("current_user", null);
//		} else {
//			User foundUser = userRepo.findByUserName(credentials.get("userName"));
//			if (foundUser.getPassword().equals(credentials.get("password"))) {
//				res.put("valid", true);
//				res.put("userNameErrMsg", null);
//				res.put("passwordErrMsg", null);
//				res.put("current_user", foundUser);
//			} else {
//				res.put("valid", false);
//				res.put("userNameErrMsg", null);
//				res.put("passwordErrMsg", "Invalid password");
//				res.put("current_user", null);
//			}
//		}
		
		return authRes;
	}
	
}
