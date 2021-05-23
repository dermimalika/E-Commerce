package com.techgeeknext.service;


import com.techgeeknext.dao.AdminDao;
import com.techgeeknext.entities.Admin;
import com.techgeeknext.exception.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class AdminService {

@Autowired
    AdminDao adminDao;

    public Admin updateAdmin(Admin admin) {
        return adminDao.save(admin);
    }

    public Admin findAdminById(Long id) {
        return adminDao.findAdminById(id)
                .orElseThrow(() -> new UserNotFoundException("User by id " + id + " was not found"));
    }



}
