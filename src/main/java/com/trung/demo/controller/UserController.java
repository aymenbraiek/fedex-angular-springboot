package com.trung.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.trung.demo.model.User;
import com.trung.demo.services.UserService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@RequestMapping(value = "/users", method = RequestMethod.GET, produces = "application/json")
	public List<User> getUsers() {
		return userService.getUsers();
	}
	
	@RequestMapping(value = "users/{userName}", method = RequestMethod.GET, produces = "application/json")
	public User getUser(@PathVariable String userName) {
		return userService.getUser(userName);
	}
	
	@RequestMapping(value = "/users/add", method = RequestMethod.POST, produces = "application/json")
	public boolean addUser(@RequestBody User newUser) {
		return userService.addUser(newUser);
	}
	
	@RequestMapping(value = "/users/update/{oldUserName}", method = RequestMethod.PUT, produces = "application/json")
	public boolean updateUser(@PathVariable String oldUserName, @RequestBody User updated_user) {
		return userService.updateUser(oldUserName, updated_user);
	}
	
	@RequestMapping(value = "/users/delete/{userName}", method = RequestMethod.DELETE, produces = "application/json")
	public boolean deleteUser(@PathVariable String userName) {
		return userService.deleteUser(userName);
	}
}
