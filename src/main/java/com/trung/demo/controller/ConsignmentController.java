package com.trung.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.trung.demo.services.ConsignmentService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class ConsignmentController {
	@Autowired
	private ConsignmentService consignmentService;
	
	@RequestMapping(value="/consignments/all", method=RequestMethod.POST)
	public ResponseEntity<?> getAllConsignments(@RequestBody String userEmail) {
		return ResponseEntity.ok(consignmentService.getAllConsignments(userEmail));
	}
	
	@RequestMapping(value="/consignments/notReceived", method=RequestMethod.POST)
	public ResponseEntity<?> getAllConsignmentsNotReceived(@RequestBody String userEmail) {
		return ResponseEntity.ok(consignmentService.getAllConsignmentsNotReceived(userEmail));
	}
	
	@RequestMapping(value="/consignments/received", method=RequestMethod.POST)
	public ResponseEntity<?> getAllConsignmentsReceived(@RequestBody String userEmail) {
		return ResponseEntity.ok(consignmentService.getAllConsignmentsReceived(userEmail));
	}
}
