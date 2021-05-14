package com.esi.first_part.dao;


import com.esi.first_part.entities.Admin;
import com.esi.first_part.entities.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.webmvc.RepositoryRestController;

import javax.transaction.Transactional;
import java.util.List;

@RepositoryRestController
public interface AdminRepository extends JpaRepository<Admin,Long> {
    //List<Admin> findAdminByNom(String n);

}
