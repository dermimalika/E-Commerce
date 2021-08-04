package com.techgeeknext.controller;


import com.techgeeknext.dao.UserDao;
import com.techgeeknext.entities.AuthRequestLogin;
import com.techgeeknext.entities.User;

import com.techgeeknext.model.Product;
import com.techgeeknext.repository.ProductRepository;
import com.techgeeknext.repository.UserRepository;
import com.techgeeknext.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@EnableFeignClients
@RequestMapping(value ="/users")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private UserDao userDao;

    @Autowired
    private ProductRepository productRepository;


    AuthRequestLogin authRequestLogin;

    @Autowired
    private UserRepository userRepository;
    @PostMapping(value = "/register")
    public User save(@RequestBody User user){
        return userService.save(user);
    }


    /*@GetMapping(value = "/{id}")
    public ResponseEntity findById(@RequestParam("id") Long idc)
    {
        return ResponseEntity.ok(userRepository.findById(idc));
    }

    */
    /*@ResponseBody
    public User findByUsername(@RequestParam("username") String username) {
        return userRepository.findByUsername(username);
    }*/

    @PostMapping(value="/login")
    public User getUserByEmail(@RequestBody AuthRequestLogin authRequestLogin) throws Exception
    {
        final User user = userService.loadUserByEmail(authRequestLogin.getEmail());
        User user1 = userRepository.findByEmail(authRequestLogin.getEmail());
        return  user;
    }

    @PostMapping(value="/forgotpsw")
    public User forgotPassword(@RequestBody AuthRequestLogin authRequestLogin) throws Exception
    {
        final User user = userService.loadUserByEmail(authRequestLogin.getEmail());
        User user1 = userRepository.findByEmail(authRequestLogin.getEmail());
        return  user;
    }

    @PostMapping(value = "/resetpsw")
    public User updatePsw(@RequestBody AuthRequestLogin authRequestLogin)throws Exception{
        userDao.updatePSW(authRequestLogin.getPassword(),authRequestLogin.getEmail());
        final User user = userService.loadUserByEmail(authRequestLogin.getEmail());
        return user;
    }

    @GetMapping(value = "/secure")
    public String getSecure() {
        return "Secure endpoint available";
    }


    @GetMapping(value = "/products")
    public List<Product> getProducts(){
        return productRepository.getAll();
    }


    @GetMapping(value = "/profile/{id}")
    public User getProfile(@PathVariable("id") Long id)
    {

        return userRepository.findUserById(id);
    }

    @PostMapping("/update/{id}")
    public User updateUser(@PathVariable("id") Long id,@RequestBody User user)
    {
        userService.updateUser(id,user);
        return userRepository.findUserById(id);
    }



}
