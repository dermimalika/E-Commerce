package com.techgeeknext.dao;

import com.techgeeknext.entities.Delivery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.stereotype.Repository;

@Repository
@EnableJpaRepositories
public interface DeliveryRepository extends JpaRepository<Delivery,Long> {
}
