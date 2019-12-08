package com.trung.demo.model;

import javax.persistence.Id;

import org.hibernate.annotations.Type;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

import lombok.Getter;
import lombok.Setter;

@Entity
@Setter @Getter
public class Product {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private int id;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "description")
	private String description;
	
	@Column(name = "price")
	private double price;
	
	@Column(name = "Currency")
	private String currency;
	
	@Column(name = "quantity")
	private int quantity;
	
	@Column(name = "availability")
	@Type(type = "org.hibernate.type.NumericBooleanType")
	private boolean availability;
	
	@Column(name = "imageUrl")
	private String imageUrl;
	
	
	public Product() {
		
	}
	
	public Product(int id, String name, String description, double price, 
			String currency, int quantity, boolean availability, String imageUrl) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.price = price;
		this.currency = currency;
		this.quantity = quantity;
		this.availability = availability;
		this.imageUrl = imageUrl;
	}
	
}
