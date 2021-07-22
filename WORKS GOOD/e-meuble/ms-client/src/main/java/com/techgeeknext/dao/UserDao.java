package com.techgeeknext.dao;


import com.techgeeknext.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@RepositoryRestController
public interface UserDao extends JpaRepository<User,Long> {


    Optional<User> findUserById(Long id);

    User findUserByUsername(String username);

    @Query("SELECT u from User u Where u.username = :username")
    public User getUserByUsername(@Param("username") String username);

    @Modifying
    @Transactional
    @Query("delete from User a where a.id=:id")
    void delUser(@Param("id") Long id);



}
