package com.trung.demo.security;

import java.util.Arrays;
import java.util.HashSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.trung.demo.model.Role;
import com.trung.demo.model.User;
import com.trung.demo.repository.UserRepository;
import com.trung.demo.services.MyUserDetailsService;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Autowired
	private JwtRequestFilter jwtRequestFilter;
	
	@Autowired
	private MyUserDetailsService myUserDetailsService;
	
	@Autowired
	private UserRepository userRepository;
	
	
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(myUserDetailsService);
		
		// setup default admin & user for the app
		String encodedPass = new BCryptPasswordEncoder().encode("pass");
		User admin = new User("Phuong", "Chu", "aiko@gmail.com", encodedPass, encodedPass);
		admin.addRole(new Role("ADMIN"));
		userRepository.save(admin);
		
		User admin2 = new User("Trung", "Vo", "vtt311096@gmail.com", encodedPass, encodedPass);
		admin2.addRole(new Role("ADMIN"));
		userRepository.save(admin2);
		
		User emp1 = new User("Quang", "Vo", "vtq3008@gmail.com", encodedPass, encodedPass);
		emp1.addRole(new Role("EMPLOYEE"));
		userRepository.save(emp1);
	}
	
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
	    
		http.csrf().disable().authorizeRequests()
			.antMatchers("/users/**").permitAll()
			.antMatchers("/login").permitAll()
			.antMatchers("/register").permitAll()
			.anyRequest().authenticated()
			.and()
			.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		
		http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
	}	


	@Override
	@Bean
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}

	@Bean
	public PasswordEncoder getPasswordEncoder() {
		return new BCryptPasswordEncoder(12);
	}
	
}
