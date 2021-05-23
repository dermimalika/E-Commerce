package com.techgeeknext.repository;
import com.techgeeknext.entities.Admin;
import org.springframework.data.repository.CrudRepository;
public interface UserRepository extends CrudRepository<Admin, Integer> {
    Admin findByUsername(String username);
}