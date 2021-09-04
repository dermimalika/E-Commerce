package com.techgeeknext.controller;


import com.techgeeknext.dao.UserDao;
import com.techgeeknext.entities.AuthRequestLogin;
import com.techgeeknext.entities.User;

import com.techgeeknext.model.Category;
import com.techgeeknext.model.Comment;
import com.techgeeknext.model.Product;
import com.techgeeknext.repository.CategoryRepository;
import com.techgeeknext.repository.ProductRepository;
import com.techgeeknext.repository.UserRepository;
import com.techgeeknext.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

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

    @Autowired
    private CategoryRepository categoryRepository;


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



    ///////////////////////////AFFICHAGE DES PROD PAR PAGINATION//////////////////////////////////////
    @GetMapping(value = "/products")
    public ResponseEntity<Map<String,Object>> getAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "3") int size){
    try {
        List<Product> Products = new ArrayList<Product>();
        Pageable paging = PageRequest.of(page, size);
        Page<Product> pageProducts = productRepository.findAll(paging);
        Products = pageProducts.getContent();
        Map<String, Object> response = new HashMap<>();
        response.put("Products", Products);
        response.put("CurrentPage", pageProducts.getNumber());
        response.put("totalItems", pageProducts.getTotalElements());
        response.put("totalPages", pageProducts.getTotalPages());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }catch (Exception e){
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
    }
    @GetMapping("/getCategorys")
    public List<Category> getProducts() {
        return categoryRepository.findAll();
    }
    ////////////////////////////////////////FILTER PRODUCT BY CATEGORY//////////////////////////////////////////////////////////

    @GetMapping("/products/cat")
    public ResponseEntity<Map<String,Object>> getFilteredProducts(@RequestParam(required = false) String category,@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "3") int size){
        try {
            System.out.println("category in the params of filtring request :"+category);
            System.out.println("page in the params of filtring request :"+page);
            List<Product>Products= new ArrayList<>();
            Pageable paging  = PageRequest.of(page,size);
            Page<Product> pagecats;
                pagecats = productRepository.findByCategory(category,paging);
                Products = pagecats.getContent();
                Map<String,Object> response = new HashMap<>();
                response.put("ProductsFilterCategory", Products);
                response.put("CurrentPage",pagecats.getNumber());
                response.put("totalItems",pagecats.getTotalElements());
                response.put("totalPages",pagecats.getTotalPages());
                return new ResponseEntity<>(response,HttpStatus.OK);

        } catch (Exception e){
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    ///////////////////////////////////////////////////SERCH PRODUCT BY KEY WORD////////////////////////////////////////////////////////////////////////
    @GetMapping("/products/search")
    public ResponseEntity<Map<String,Object>> getSearchedProducts(@RequestParam(required = false) String filter,@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "3") int size){
        try {
            List<Product>Products= new ArrayList<>();
            Pageable paging  = PageRequest.of(page,size);
            Page<Product> pagecats;
            pagecats = productRepository.findByNameContaining(filter,paging);
            Products = pagecats.getContent();
            Map<String,Object> response = new HashMap<>();
            response.put("ProductsFilterKeyWord", Products);
            response.put("CurrentPage",pagecats.getNumber());
            response.put("totalItems",pagecats.getTotalElements());
            response.put("totalPages",pagecats.getTotalPages());
            return new ResponseEntity<>(response,HttpStatus.OK);

        } catch (Exception e){
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }








    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    @GetMapping(value = "/produit/{id}")
    public Optional<Product> getProduit(@PathVariable("id") Long id)
    {
        System.out.println("produit :");
        System.out.println(productRepository.findById(id));
        return productRepository.findById(id);
    }

    @GetMapping(value = "/profile/{id}")
    public User getProfile(@PathVariable("id") Long id)
    {
        System.out.println("Profile :");
        System.out.println(userRepository.findUserById(id));
        return userRepository.findUserById(id);
    }

    @PostMapping("/update/{id}")
    public User updateUser(@PathVariable("id") Long id,@RequestBody User user)
    {
        userService.updateUser(id,user);
        System.out.println("update profile :");
        System.out.println(user);
        return userRepository.findUserById(id);
    }



}
