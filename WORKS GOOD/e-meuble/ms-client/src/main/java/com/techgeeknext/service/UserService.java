package com.techgeeknext.service;


import com.techgeeknext.dao.UserDao;
import com.techgeeknext.entities.User;
import com.techgeeknext.exception.UserNotFoundException;
import com.techgeeknext.repository.UserRepository;
//import org.eclipse.jgit.lib.ObjectId;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;


@Service
@Slf4j
public class UserService {

    private final UserRepository repository;
    private final RestTemplate restTemplate;

    @Autowired
    public UserService(UserRepository repository,
                       RestTemplate restTemplate) {
        this.repository = repository;
        this.restTemplate = restTemplate;
    }


    public User save(User user) {
        return this.repository.save(user);
    }



    public User loadUserByEmail(String email) throws Exception{
        User user = repository.findByEmail(email);
        if (user == null){
            throw new Exception("email not found exception: "+ email);
        }
        return user;
    }



}