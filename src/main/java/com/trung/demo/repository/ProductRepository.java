package com.trung.demo.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.trung.demo.model.Product;

public interface ProductRepository extends CrudRepository<Product, Integer> {
	Product findByName(String name);
	List<Product> findByAvailability(boolean availability);
}
