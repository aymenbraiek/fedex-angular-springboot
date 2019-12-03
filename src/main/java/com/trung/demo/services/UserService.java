package com.trung.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

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
			if (isValid(updated_user) && updated_user.getPassword().equals(updated_user.getConfirmPassword())) {
				foundUser = updated_user;
				String encodedPassword = new BCryptPasswordEncoder().encode(foundUser.getPassword()); 
				foundUser.setPassword(encodedPassword);
				foundUser.setConfirmPassword(encodedPassword);
				userRepo.save(foundUser);
			} else {
				return false;
			}
		} else {
			if (userRepo.existsByEmail(updated_user.getEmail()))
				return false;
			
			if (isValid(updated_user) && updated_user.getPassword().equals(updated_user.getConfirmPassword()) ) {
				this.deleteUser(oldUserName);
				String encodedPassword = new BCryptPasswordEncoder().encode(updated_user.getPassword()); 
				updated_user.setPassword(encodedPassword);
				updated_user.setConfirmPassword(encodedPassword);
				userRepo.save(updated_user);
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
