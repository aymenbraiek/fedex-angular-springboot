package com.trung.demo.security;

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

import com.trung.demo.model.Consignment;
import com.trung.demo.model.Role;
import com.trung.demo.model.User;
import com.trung.demo.repository.ConsignmentRepository;
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
	
	@Autowired
	private ConsignmentRepository consignmentRepository;
	
	
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(myUserDetailsService);
		
		// setup default admin & user for the app
		String encodedPass = new BCryptPasswordEncoder().encode("pass");
		User admin = new User("Phuong", "Chu", "aiko@gmail.com", encodedPass, encodedPass);
		admin.addRole(new Role("ADMIN", admin));
		userRepository.save(admin);
		
		User admin2 = new User("Trung", "Vo", "vtt311096@gmail.com", encodedPass, encodedPass);
		admin2.addRole(new Role("ADMIN", admin2));
		userRepository.save(admin2);
		
		User emp1 = new User("Quang", "Vo", "vtq3008@gmail.com", encodedPass, encodedPass);
		emp1.addRole(new Role("EMPLOYEE", emp1));
		emp1.addRole(new Role("ADMIN", emp1));
		userRepository.save(emp1);
		
		User user = new User("Andrew", "White", "andrew@gmail.com", encodedPass, encodedPass);
		user.addRole(new Role("CUSTOMER", user));
		userRepository.save(user);
		
		// add some fake consignments
		Consignment cons1 = new Consignment(
			"Small description",
			"1126 Highfield Ct",
			"Bethel Park",
			"Pennsylvania",
			15102,
			"USA",
			14.5,
			"USD",
			admin,
			false
		);
		
		admin.addConsignment(cons1);
		consignmentRepository.save(cons1);
		
		Consignment cons2 = new Consignment(
			"Food for winter semester",
			"153 Christian Ave",
			"Stony Brook",
			"New York",
			11790,
			"USA",
			56.5,
			"USD",
			admin,
			true
		);
			
		admin.addConsignment(cons2);
		consignmentRepository.save(cons2);
		
		Consignment cons3 = new Consignment(
			"Cloths for summer",
			"61 Ngo Thi Thu Minh",
			"Tan Binh",
			"Ho Chi Minh",
			70000,
			"Vietnam",
			76.5,
			"USD",
			user,
			false
		);
			
		user.addConsignment(cons3);
		consignmentRepository.save(cons3);
	}
	
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
	    
		http.csrf().disable().authorizeRequests()
			.antMatchers("/users/all").hasAuthority("ADMIN")
			.antMatchers("/roles/**").hasAuthority("ADMIN")
			.antMatchers("/users/**").permitAll()
			.antMatchers("/login").permitAll()
			.antMatchers("/register").permitAll()
			.antMatchers("/consignments/**").permitAll()
			.anyRequest().authenticated()
			.and()
			.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		
		// excluded the preflight requests from authorization 
		// our API expects an authorization token in the OPTIONS request as well
		// therefore, we need to exclude OPTIONS requests from authorization checks
		http.cors();
		
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
