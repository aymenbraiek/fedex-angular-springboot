package com.trung.demo.repository;
import org.springframework.data.repository.CrudRepository;

import com.trung.demo.model.User;

public interface UserRepository extends CrudRepository<User, String> {
	User findByUsername(String userName);
	boolean existsByUsername(String userName);
}
