package com.trung.demo.services;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.trung.demo.model.User;
import com.trung.demo.repository.UserRepository;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepo;
	
	public UserService() {
	
	}
	
	public List<User> getUsers() {
		return (List<User>) userRepo.findAll();
	}
	
	public User getUser(String userName) {
		return userRepo.findByUserName(userName);
	}
	
	public boolean addUser(User newUser) {
		if (newUser == null)
			return false;
		
		if (userRepo.existsByUserName(newUser.getUserName())) {
			return false;
		}
		userRepo.save(newUser);
		return true;
	}
	
	public boolean updateUser(String oldUserName, User updated_user) {
		User foundUser = userRepo.findByUserName(oldUserName);
		if (foundUser == null)
			return false;
		
		if (oldUserName.equals(updated_user.getUserName())) {
			foundUser = updated_user;
			userRepo.save(foundUser);
		} else {
			if (userRepo.existsByUserName(updated_user.getUserName()))
				return false;
			
			this.deleteUser(oldUserName);
			userRepo.save(updated_user);
		}
		return true;		
	}
	
	public boolean deleteUser(String userName) {
		User foundUser = userRepo.findByUserName(userName);
		if (foundUser == null)
			return false;
		
		userRepo.deleteById(userName);
		return true;
	}
}
