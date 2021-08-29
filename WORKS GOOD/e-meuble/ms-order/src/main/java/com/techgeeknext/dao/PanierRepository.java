package com.techgeeknext.dao;

import com.techgeeknext.entities.Panier;
import com.techgeeknext.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PanierRepository extends JpaRepository<Panier,Integer> {
    List<Panier> findAllByUserOrderByCreatedDateDesc(User user);
    List<Panier> deleteByUser(User user);


}
