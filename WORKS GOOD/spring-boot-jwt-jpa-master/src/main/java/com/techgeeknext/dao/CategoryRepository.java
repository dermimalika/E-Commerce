package com.techgeeknext.dao;

import com.techgeeknext.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.transaction.annotation.Transactional;

@RepositoryRestController
public interface CategoryRepository extends JpaRepository<Category,Long> {

    @Modifying
    @Transactional
    @Query("update Category c set c.arch=true where c.id=:id")
    void archCategory(@Param("id") Long id);
    @Modifying
    @Transactional
    @Query("update Category c set c.arch=false where c.id=:id")
    void restoreCategory(@Param("id") Long id);
}
