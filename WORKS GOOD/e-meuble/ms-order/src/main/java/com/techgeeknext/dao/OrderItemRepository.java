package com.techgeeknext.dao;

import com.techgeeknext.entities.OrderItem;
import org.hibernate.metamodel.model.convert.spi.JpaAttributeConverter;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
@EnableJpaRepositories
public interface OrderItemRepository extends JpaRepository<OrderItem,Integer> {
}
