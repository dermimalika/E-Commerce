package com.techgeeknext.controller;


import com.techgeeknext.entities.AuthRequestLogin;
import com.techgeeknext.entities.User;

import com.techgeeknext.repository.UserRepository;
import com.techgeeknext.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value ="/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;
    @PostMapping(value = "/register")
    public User save(@RequestBody User user){
        return userService.save(user);
    }






    @GetMapping(value = "/secure")
    public String getSecure() {
        return "Secure endpoint available";
    }





}
