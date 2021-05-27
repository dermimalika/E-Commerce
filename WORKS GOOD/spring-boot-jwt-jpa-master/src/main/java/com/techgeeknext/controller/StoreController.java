package com.techgeeknext.controller;

import com.techgeeknext.dao.StoreRepository;
import com.techgeeknext.entities.Store;
import com.techgeeknext.service.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class StoreController {


    @Autowired
    StoreRepository storeRepository;

    @Autowired
    StoreService storeService;

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/store/all")       //"http://localhost:8082/api/store/all"
    public List<Store> getStores(){
        return  storeRepository.findAll();
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/store/{id}")      //"http://localhost:8082/api/store/1"
    public Store getStoreById(@PathVariable("id") Long id){ return storeRepository.findById(id).get(); }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/addStore")      //"http://localhost:8082/api/addStore/amel3"
    public List<Store> addStore(@RequestBody Store store){
            storeRepository.save(store);
        return storeRepository.findAll(); }

    @CrossOrigin(origins = "http://localhost:4200")
    @DeleteMapping("/delStore/{id}")      //"http://localhost:8082/api/delStore/3"
    public List<Store> delStore(@PathVariable("id") Long id){
        storeRepository.delStore(id);
        return storeRepository.findAll(); }
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/archStore/{id}")      //"http://localhost:8082/api/archStore/3"
    public List<Store> archStore(@PathVariable("id") Long id){
        storeRepository.archStore(id);
        return storeRepository.findAll(); }


    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/updStore/{id}")      //"http://localhost:8082/api/updStore/6"
    public List<Store> updStore(@PathVariable("id") Long id,@RequestBody Store store){
        //Optional<Store> s = storeRepository.findById(id);
        storeService.updateStore(id,store);
        return storeRepository.findAll(); }


    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/restoreStore/{id}")
    public List<Store> restoreStore(@PathVariable("id") Long id){

        storeRepository.restoreStore(id);
        return storeRepository.findAll(); }
}
