package com.techgeeknext.controller;


import com.techgeeknext.dao.AdminDao;
import com.techgeeknext.entities.Store;
import com.techgeeknext.service.AdminService;
import com.techgeeknext.entities.Admin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/admins")
public class AdminAPI {
        @Autowired
        AdminDao adminDao;

        private  final  AdminService adminService;

        public  AdminAPI(AdminService adminService, AdminDao adminDao){this.adminService= adminService;
            this.adminDao = adminDao;
        }
    //Afficher All Admins
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/username/{username}")
    public Admin getAdmin(@PathVariable("username") String username ) {return adminDao.findAdminByUsername(username);}

        //Afficher All Admins
        @CrossOrigin(origins = "http://localhost:4200")
        @GetMapping("/all")
        public List<Admin> getAdmins() {return adminDao.findAll();}

        //Delete Admin
        @CrossOrigin(origins = "http://localhost:4200")
        @DeleteMapping(path = { "delAdmin/{id}" })
        public List<Admin> delete(@PathVariable("id") Long id) {
            adminDao.delAdmin(id);
            return adminDao.findAll();
        }




    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/update/{id}")
    public List<Admin> updAdmin(@PathVariable("id") Long id,@RequestBody Admin admin){
        //Optional<Store> s = storeRepository.findById(id);
        adminService.updateAdmin(id,admin);
        return adminDao.findAll(); }


    //Add Admin
    /*
        @CrossOrigin(origins = "http://localhost:4200")
        @PostMapping("/addadmin")
        public List<Admin> create(@RequestBody Admin admin) {
            adminDao.save(admin);
            return adminDao.findAll();
        }*/



    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/archAdmin/{id}")
    public List<Admin> archAdmin(@PathVariable("id") Long id){
        adminDao.archAdmin(id);
        return adminDao.findAll(); }


    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/restoreAdmin/{id}")
    public List<Admin> restoreAdmin(@PathVariable("id") Long id){
        adminDao.restoreAdmin(id);
        return adminDao.findAll(); }




    }

