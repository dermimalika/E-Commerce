package com.techgeeknext.dao;


import com.techgeeknext.entities.Order;
import com.techgeeknext.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@EnableJpaRepositories
public interface OrderRepository  extends JpaRepository<Order,Integer> {
    List<Order> findAllByUserOrderByCreatedDateDesc(User user);
}
