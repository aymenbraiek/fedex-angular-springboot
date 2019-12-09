package com.trung.demo.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.trung.demo.model.Consignment;

public interface ConsignmentRepository extends CrudRepository<Consignment, Integer> {

}
