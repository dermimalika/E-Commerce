package com.techgeeknext.service;


import com.techgeeknext.dao.AdminDao;
import com.techgeeknext.entities.Admin;
import com.techgeeknext.exception.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class AdminService {

@Autowired
AdminDao adminDao;

    public Admin updateAdmin(Long id, Admin adminUpdate) {

        if (adminDao.findById(id).isPresent()){
            Admin existingAdmin = adminDao.findById(id).get();

            existingAdmin.setName(adminUpdate.getName());
            existingAdmin.setUsername(adminUpdate.getUsername());
            existingAdmin.setPhone(adminUpdate.getPhone());


            Admin updatedAdmin = adminDao.save(existingAdmin);

            return updatedAdmin;
        }else{
            return null;
        }
    }

    public Admin findAdminById(Long id) {
        return adminDao.findAdminById(id)
                .orElseThrow(() -> new UserNotFoundException("User by id " + id + " was not found"));
    }



}
