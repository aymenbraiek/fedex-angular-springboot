package com.trung.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.trung.demo.services.ProductService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class ProductController {
	@Autowired
	private ProductService productService;
	
	@RequestMapping(value="/products/all", method=RequestMethod.GET)
	public ResponseEntity<?> getAllProducts() {
		return ResponseEntity.ok(productService.getAllProducts());
	}
}
