package com.trung.demo.repository;
import org.springframework.data.repository.CrudRepository;

import com.trung.demo.model.User;

public interface UserRepository extends CrudRepository<User, String> {
	User findByEmail(String email);
	boolean existsByEmail(String email);
}
