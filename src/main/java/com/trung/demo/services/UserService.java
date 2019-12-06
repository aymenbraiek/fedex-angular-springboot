package com.trung.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.trung.demo.model.Role;
import com.trung.demo.model.User;
import com.trung.demo.repository.UserRepository;
import com.trung.demo.validator.Validator;

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
	
	// check if names and email are valid format
	public boolean isValid(User user) {
		boolean isEmailValid = Validator.isValidEmail(user.getEmail());
		boolean isFirstNameValid = Validator.isValidName(user.getFirstName());
		boolean isLastNameValid = Validator.isValidName(user.getLastName());
		return isEmailValid && isFirstNameValid && isLastNameValid;
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
		
		if (isValid(newUser)) {
			// if names fields and email are valid format
			String encodedPassword = new BCryptPasswordEncoder().encode(newUser.getPassword()); 
			newUser.setPassword(encodedPassword);
			newUser.setConfirmPassword(encodedPassword);
			// default Role as CUSTOMER
			newUser.addRole(new Role("CUSTOMER", newUser));
			userRepo.save(newUser);
			return true;
		}
		return false;
	}
	
	public boolean updateUser(String oldUserName, User updated_user) {
		User foundUser = userRepo.findByEmail(oldUserName);
		if (foundUser == null)
			return false;
		
		if (oldUserName.equals(updated_user.getEmail())) {
			if (isValid(updated_user)) {
				foundUser.setFirstName(updated_user.getFirstName());
				foundUser.setLastName(updated_user.getLastName());
				userRepo.save(foundUser);
			} else {
				return false;
			}
		} else {
			if (userRepo.existsByEmail(updated_user.getEmail()))
				return false;
			
			if (isValid(updated_user) ) {
				foundUser.setFirstName(updated_user.getFirstName());
				foundUser.setLastName(updated_user.getLastName());
				foundUser.setEmail(updated_user.getEmail());
				userRepo.save(foundUser);
			} else {
				return false;
			}
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
