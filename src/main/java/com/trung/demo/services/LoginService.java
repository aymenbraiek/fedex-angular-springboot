package com.trung.demo.services;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.trung.demo.model.User;
import com.trung.demo.repository.UserRepository;

@Service
public class LoginService {
	@Autowired
	private UserRepository userRepo;
	
	public Map<String, Object> validateLogin(Map<String, String> credentials) {
		Map<String, Object> res = new HashMap<>();
		
		if (!userRepo.existsByUserName(credentials.get("userName"))) {
			res.put("valid", false);
			res.put("userNameErrMsg", "Invalid username");
			res.put("passwordErrMsg", null);
		} else {
			User foundUser = userRepo.findByUserName(credentials.get("userName"));
			if (foundUser.getPassword().equals(credentials.get("password"))) {
				res.put("valid", true);
				res.put("userNameErrMsg", null);
				res.put("passwordErrMsg", null);
			} else {
				res.put("valid", false);
				res.put("userNameErrMsg", null);
				res.put("passwordErrMsg", "Invalid password");
			}
		}
		
		return res;
	}
}
