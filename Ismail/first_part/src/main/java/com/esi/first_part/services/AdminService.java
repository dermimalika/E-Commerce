package com.esi.first_part.services;


import com.esi.first_part.dao.AdminDao;
import com.esi.first_part.entities.Admin;
import com.esi.first_part.exception.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class AdminService {

@Autowired
    AdminDao adminDao;

public Admin addAdmin(Admin admin){
    return adminDao.save(admin);
}

    public List<Admin> findAllAdmins() {
        return adminDao.findAll();
    }


    public Admin updateAdmin(Admin admin) {
        return adminDao.save(admin);
    }

    public Admin findAdminById(Long id) {
        return adminDao.findAdminById(id)
                .orElseThrow(() -> new UserNotFoundException("User by id " + id + " was not found"));
    }

    public void deleteAdmin(Long id){
        adminDao.deleteAdminById(id);
    }

}
