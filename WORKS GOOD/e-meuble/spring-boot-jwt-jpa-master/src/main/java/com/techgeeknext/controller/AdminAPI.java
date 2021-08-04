package com.techgeeknext.controller;


import com.techgeeknext.config.ResetPSW;
import com.techgeeknext.dao.AdminDao;
import com.techgeeknext.entities.Admin;
import com.techgeeknext.service.AdminService;
import com.techgeeknext.service.JwtUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/admins")
public class AdminAPI {
    @Autowired
    AdminDao adminDao;

    @Autowired
    private JwtUserDetailsService userDetailsService;

    @Autowired
    private PasswordEncoder bcryptEncoder;


        private  final  AdminService adminService;

        public AdminAPI(AdminService adminService, AdminDao adminDao){this.adminService= adminService;
            this.adminDao = adminDao;
        }
    //Afficher All Admins
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/username/{username}")
    public Admin getAdmin(@PathVariable("username") String username )
    {return adminDao.findAdminByUsername(username);}

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
    //========== Forgot PSW
    //Type Object a recuperer from angular {mail:this.mail}
    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping(path = {"forgotpsw"})
    public Admin forgotPSw(@RequestBody String mail){

        return adminDao.findAdminByUsername(mail);
        }
    //=======================
    //========= Reset PSW
    //Type Object a recuperer from angular {password:this.password}
    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/resetpsw")
    public Admin resetPSW(@RequestBody ResetPSW rpsw){
        adminDao.updatePSW(bcryptEncoder.encode(rpsw.password),rpsw.mail);
        return adminDao.findAdminByUsername(rpsw.mail);
        }

    //===================

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

