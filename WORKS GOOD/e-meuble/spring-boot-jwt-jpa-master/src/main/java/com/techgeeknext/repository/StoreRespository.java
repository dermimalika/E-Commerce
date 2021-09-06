package com.techgeeknext.repository;

import com.techgeeknext.entities.Store;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StoreRespository extends JpaRepository<Store,Long> {
}
