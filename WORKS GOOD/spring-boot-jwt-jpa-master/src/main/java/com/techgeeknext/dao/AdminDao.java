package com.techgeeknext.dao;

import com.techgeeknext.entities.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@RepositoryRestController
public interface AdminDao extends JpaRepository<Admin,Long> {


    Optional<Admin> findAdminById(Long id);

    Admin findAdminByUsername(String username);

    @Query("SELECT u from Admin u Where u.username = :username")
    public Admin getUserByUsername(@Param("username") String username);

    @Modifying
    @Transactional
    @Query("delete from Admin a where a.id=:id")
    void delAdmin(@Param("id") Long id);

    @Modifying
    @Transactional
    @Query("update Admin a set a.arch=true where a.id=:id")
    void archAdmin(@Param("id") Long id);

    @Modifying
    @Transactional
    @Query("update Admin a set a.arch=false where a.id=:id")
    void restoreAdmin(@Param("id") Long id);

}
