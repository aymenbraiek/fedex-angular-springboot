package com.trung.demo.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.trung.demo.model.AuthRequest;
import com.trung.demo.model.AuthResponse;
import com.trung.demo.model.User;
import com.trung.demo.services.AuthService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class IndexController {
	
	@Autowired
	public AuthService authService;
	
	@RequestMapping(value = "/hello", method = RequestMethod.GET)
	public ResponseEntity<?> hello() {
		Map<String, String> map = new HashMap<>();
		map.put("response", "Hello!!!");
 		return ResponseEntity.ok(map);
	}
	
	@RequestMapping(value = "/login", method = RequestMethod.POST, produces = "application/json")
	public AuthResponse validateLogin(@RequestBody AuthRequest authReq) {
		return authService.validateLogin(authReq);
	}
	
	@RequestMapping(value = "/register", method = RequestMethod.POST, produces = "application/json")
	public AuthResponse register(@RequestBody User newUser) {
		return authService.register(newUser);
	}
}
