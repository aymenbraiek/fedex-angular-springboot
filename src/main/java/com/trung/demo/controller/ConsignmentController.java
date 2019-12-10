package com.trung.demo.controller;

import java.util.Map;

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
}
