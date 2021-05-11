package com.esi.first_part.dao;

import com.esi.first_part.entities.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.web.bind.annotation.RequestBody;

import javax.transaction.Transactional;
import java.sql.Date;
import java.util.List;

@RepositoryRestController
public interface StoreRepository extends JpaRepository<Store,Long> {
    List<Store> findStoreByNom(String n);
/*
    @Modifying
    @Transactional
    @Query(value=" Insert Into Store (nom) Values(:nom) ",nativeQuery = true)
    int addStore(@RequestBody Store store);

    @Modifying
    @Transactional
    @Query(value="update Store s set s.nom=:nom where s.idStore=:id")
    int updStore(@Param("id") Long id,@Param("nom") String nom);
*/

    @Modifying
    @Transactional
    @Query("delete from Store s where s.idStore =:id")
    void delStore(@Param("id") Long id);

}
