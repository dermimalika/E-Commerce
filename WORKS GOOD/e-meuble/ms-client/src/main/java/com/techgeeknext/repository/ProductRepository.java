package com.techgeeknext.repository;

import com.techgeeknext.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@EnableJpaRepositories
public interface ProductRepository extends JpaRepository<Product,Long> {

    @Query("SELECT p from Product p where p.id is not null")
    public List<Product> getAll();

    Page<Product> findAll(Pageable pageable);

}
