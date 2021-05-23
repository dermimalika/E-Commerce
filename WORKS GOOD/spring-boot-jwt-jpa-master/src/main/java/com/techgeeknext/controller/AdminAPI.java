package com.techgeeknext.controller;


import com.techgeeknext.dao.AdminDao;
import com.techgeeknext.service.AdminService;
import com.techgeeknext.entities.Admin;
import org.springframework.beans.factory.annotation.Autowired;
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
        @GetMapping("/all")
        public List<Admin> getAdmins() {return adminDao.findAll();}

        //Delete Admin
        @CrossOrigin(origins = "http://localhost:4200")
        @DeleteMapping(path = { "delAdmin/{id}" })
        public List<Admin> delete(@PathVariable("id") Long id) {
            adminDao.delAdmin(id);
            return adminDao.findAll();
        }

        //Add Admin
    /*
        @CrossOrigin(origins = "http://localhost:4200")
        @PostMapping("/addadmin")
        public List<Admin> create(@RequestBody Admin admin) {
            adminDao.save(admin);
            return adminDao.findAll();
        }*/



    }

