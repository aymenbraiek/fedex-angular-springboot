package com.trung.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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
		
		User foundUser = userRepository.findByUserName(userName);
		
		if (foundUser == null) {
			System.out.println("User " + userName + " not found!");
			throw new UsernameNotFoundException("User " + userName + " not found!");
		}
		
		return (UserDetails) foundUser;
		
//		if (userName.equals("trung"))
//			return new User("trung", "$2y$12$CM5CXgQOC1dkOGr65SxPHu57h0pSABl/ukRxSxfqeJrp8h6gwhJ46", new ArrayList<>());
//		
//		return new User("", "", new ArrayList<>());
	}

}
