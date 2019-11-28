package com.trung.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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
		return userRepo.findByUsername(userName);
	}
	
	public boolean addUser(User newUser) {
		if (newUser == null)
			return false;
		
		if (userRepo.existsByUsername(newUser.getUsername())) {
			return false;
		}
		
		newUser.setPassword(new BCryptPasswordEncoder().encode(newUser.getPassword()));
		userRepo.save(newUser);
		return true;
	}
	
	public boolean updateUser(String oldUserName, User updated_user) {
		User foundUser = userRepo.findByUsername(oldUserName);
		if (foundUser == null)
			return false;
		
		if (oldUserName.equals(updated_user.getUsername())) {
			foundUser = updated_user;
			foundUser.setPassword(new BCryptPasswordEncoder().encode(foundUser.getPassword()));
			userRepo.save(foundUser);
		} else {
			if (userRepo.existsByUsername(updated_user.getUsername()))
				return false;
			
			this.deleteUser(oldUserName);
			updated_user.setPassword(new BCryptPasswordEncoder().encode(updated_user.getPassword()));
			userRepo.save(updated_user);
		}
		return true;		
	}
	
	public boolean deleteUser(String userName) {
		User foundUser = userRepo.findByUsername(userName);
		if (foundUser == null)
			return false;
		
		userRepo.deleteById(userName);
		return true;
	}
}
