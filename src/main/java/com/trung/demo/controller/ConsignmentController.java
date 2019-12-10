package com.trung.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.trung.demo.model.AddConsignment;
import com.trung.demo.services.ConsignmentService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class ConsignmentController {
	@Autowired
	private ConsignmentService consignmentService;
	
	@RequestMapping(value="/consignments/all", method=RequestMethod.POST)
	public ResponseEntity<?> getAllConsignments(@RequestBody String email) {
		return ResponseEntity.ok(consignmentService.getConsignments(email));
	}
	
	@RequestMapping(value="/consignments/notReceived", method=RequestMethod.POST)
	public ResponseEntity<?> getAllConsignmentsNotReceived(@RequestBody String email) {
		return ResponseEntity.ok(consignmentService.getAllConsignmentsNotReceived(email));
	}
	
	@RequestMapping(value="/consignments/received", method=RequestMethod.POST)
	public ResponseEntity<?> getAllConsignmentsReceived(@RequestBody String email) {
		return ResponseEntity.ok(consignmentService.getAllConsignmentsReceived(email));
	}
	
	@RequestMapping(value="/consignments/add", method=RequestMethod.POST)
	public ResponseEntity<?> addConsignment(@RequestBody AddConsignment payload) {
		boolean valid = consignmentService.addConsignment(payload.getUser(), payload.getConsignment());
		if (valid) {
			return ResponseEntity.ok(valid);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(valid);
	}
}
