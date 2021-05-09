package com.ecomm.adminmanager.Service;


import com.ecomm.adminmanager.dao.AdminDao;
import com.ecomm.adminmanager.entities.Admin;
import com.ecomm.adminmanager.exception.UserNotFoundException;
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
