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
	
	public User getUser(String email) {
		return userRepo.findByEmail(email);
	}
	
	public boolean addUser(User newUser) {
		if (newUser == null)
			return false;
		
		if (userRepo.existsByEmail(newUser.getEmail())) {
			return false;
		}
		
		if (!newUser.getPassword().equals(newUser.getConfirmPassword())) {
			return false;
		}
		
		newUser.setPassword(new BCryptPasswordEncoder().encode(newUser.getPassword()));
		newUser.setConfirmPassword(new BCryptPasswordEncoder().encode(newUser.getPassword()));
		userRepo.save(newUser);
		return true;
	}
	
	public boolean updateUser(String oldUserName, User updated_user) {
		User foundUser = userRepo.findByEmail(oldUserName);
		if (foundUser == null)
			return false;
		
		if (oldUserName.equals(updated_user.getEmail())) {
			foundUser = updated_user;
			foundUser.setPassword(new BCryptPasswordEncoder().encode(foundUser.getPassword()));
			userRepo.save(foundUser);
		} else {
			if (userRepo.existsByEmail(updated_user.getEmail()))
				return false;
			
			this.deleteUser(oldUserName);
			updated_user.setPassword(new BCryptPasswordEncoder().encode(updated_user.getPassword()));
			userRepo.save(updated_user);
		}
		return true;		
	}
	
	public boolean deleteUser(String email) {
		User foundUser = userRepo.findByEmail(email);
		if (foundUser == null)
			return false;
		
		userRepo.deleteById(email);
		return true;
	}
}
