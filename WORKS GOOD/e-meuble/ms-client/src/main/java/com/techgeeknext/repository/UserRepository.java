package com.techgeeknext.repository;

import com.techgeeknext.entities.User;
import com.techgeeknext.exception.UserNotFoundException;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@EnableJpaRepositories
public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByUsername(String username);
    User findByEmail(String email);

    User findUserByUsername(String username);
    @Query("SELECT u from User u Where u.username = :username")
    public User getUserByUsername(@Param("username") String username);


    public User findUserById(Long id) ;


}
