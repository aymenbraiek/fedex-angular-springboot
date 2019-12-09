package com.trung.demo.services;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.trung.demo.model.Consignment;
import com.trung.demo.model.User;

@Service
public class ConsignmentService {
	@Autowired
	private UserService userService;
	
	public Set<Consignment> getAllConsignments(String userEmail) {
		User user = userService.getUser(userEmail);
		if (user != null)
			return user.getConsignments();
		return new HashSet<Consignment>();
	}
	
	public Set<Consignment> getAllConsignmentsNotReceived(String userEmail) {
		Set<Consignment> consignments = getAllConsignments(userEmail);
		Set<Consignment> notReceived = new HashSet<>();
		
		for (Consignment cons:consignments) {
			if (!cons.isReceived()) {
				notReceived.add(cons);
			}
		}
		return notReceived;
	}
	
	public Set<Consignment> getAllConsignmentsReceived(String userEmail) {
		Set<Consignment> consignments = getAllConsignments(userEmail);
		Set<Consignment> received = new HashSet<>();
		
		for (Consignment cons:consignments) {
			if (cons.isReceived()) {
				received.add(cons);
			}
		}
		return received;
	}
}
