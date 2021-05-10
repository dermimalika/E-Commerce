package com.ecomm.adminmanager.dao;

import com.ecomm.adminmanager.entities.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface AdminDao extends JpaRepository<Admin,Long> {

    void deleteAdminById(Long id);

    Optional<Admin> findAdminById(Long id);
}
