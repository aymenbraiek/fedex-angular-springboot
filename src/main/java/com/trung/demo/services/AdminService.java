package com.trung.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.trung.demo.model.AdminAddUserRequest;
import com.trung.demo.model.Role;
import com.trung.demo.model.User;
import com.trung.demo.repository.UserRepository;

@Service
public class AdminService {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private UserService userService;
	
	public User adminAddUser(AdminAddUserRequest user) {
		boolean isFirstNameFilled = !user.getFirstName().equals("");
		boolean isLastNameFilled = !user.getLastName().equals("");
		boolean isEmailFilled = !user.getEmail().equals("");
		boolean isRoleSelected = !user.getRole().equals("");
				
		if (!isFirstNameFilled || !isLastNameFilled || !isEmailFilled || !isRoleSelected
				|| !userService.isValid(user.getFirstName(), user.getLastName(), user.getEmail())) {
			return null;
		}
		
		String encodedPass = generateBcryptPassword();
		User newUser = new User(user.getFirstName(), user.getLastName(), user.getEmail(), encodedPass, encodedPass);
		newUser.addRole(new Role(user.getRole(), newUser));
		userRepository.save(newUser);
		return newUser;
	}
	
	public String generateBcryptPassword() {
		String encodedPass = new BCryptPasswordEncoder().encode("pass");
		return encodedPass;
	}
}
