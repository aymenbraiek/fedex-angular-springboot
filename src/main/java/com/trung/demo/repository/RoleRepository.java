package com.trung.demo.repository;

import org.springframework.data.repository.CrudRepository;

import com.trung.demo.model.Role;

public interface RoleRepository extends CrudRepository<Role, String> {
	Role findByRole(String role);
}
