package com.esi.first_part.services;

import com.esi.first_part.dao.StoreRepository;
import com.esi.first_part.entities.Store;
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
