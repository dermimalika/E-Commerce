package com.proj.admin_auth.Repository;

import com.proj.admin_auth.Model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category,Integer> {
}
