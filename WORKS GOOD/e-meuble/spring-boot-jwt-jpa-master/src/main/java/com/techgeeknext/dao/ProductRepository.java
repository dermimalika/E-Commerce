package com.techgeeknext.dao;

import com.techgeeknext.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.transaction.annotation.Transactional;

@RepositoryRestController
public interface ProductRepository extends JpaRepository<Product, Long> {
    @Modifying
    @Transactional
    @Query("update Product p set p.arch=true where p.id=:id")
    void archProduct(@Param("id") Long id);

    @Modifying
    @Transactional
    @Query("update Product p set p.arch=false where p.id=:id")
    void restoreProduct(@Param("id") Long id);
}
