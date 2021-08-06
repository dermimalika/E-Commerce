package com.techgeeknext.service;

import com.techgeeknext.dao.StoreRepository;
import com.techgeeknext.entities.Store;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StoreService {
    @Autowired
    StoreRepository storeRepository;

    public Store updateStore(Long id, Store storeUpdate) {

        if (storeRepository.findById(id).isPresent()){
            Store existingStore = storeRepository.findById(id).get();

            existingStore.setNom(storeUpdate.getNom());

            Store updatedStore = storeRepository.save(existingStore);

            return updatedStore;
        }else{
            return null;
        }
    }
}
