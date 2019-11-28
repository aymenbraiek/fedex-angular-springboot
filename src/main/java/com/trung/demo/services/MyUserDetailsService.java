package com.trung.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.trung.demo.model.User;
import com.trung.demo.repository.UserRepository;

@Service
public class MyUserDetailsService implements UserDetailsService {
	
	@Autowired
	private UserRepository userRepository;
	
	@Override
	public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
		System.out.println("In MyUserDetailsService: " + userName);
		
		// this is just auto authenticate credentials (password), not principal (userName)
		
		User foundUser = userRepository.findByUsername(userName);
		
		if (foundUser == null) {
			System.out.println("User " + userName + " not found!");
			throw new UsernameNotFoundException("User " + userName + " not found!");
		}
		
		return org.springframework.security.core.userdetails.User//
				.withUsername(foundUser.getUsername())
				.password(foundUser.getPassword())
				.roles()
		        .build();
	}
	
}
