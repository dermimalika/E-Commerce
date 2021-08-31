package com.techgeeknext.service;


import com.techgeeknext.dao.UserDao;
import com.techgeeknext.entities.User;
import com.techgeeknext.exception.UserNotFoundException;
import com.techgeeknext.model.Product;
import com.techgeeknext.repository.ProductRepository;
import com.techgeeknext.repository.UserRepository;
//import org.eclipse.jgit.lib.ObjectId;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;


@Service
@Slf4j
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    ProductRepository productRepository;

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


    public User updateUser(Long id, User userUpdate) {

        if (userRepository.findUserById(id) != null){
            User existingUser = userRepository.findById(id).get();

            existingUser.setFirstName(userUpdate.getFirstName());
            existingUser.setLastName(userUpdate.getLastName());
            existingUser.setEmail(userUpdate.getEmail());
            existingUser.setUsername(userUpdate.getUsername());
            existingUser.setPhone(userUpdate.getPhone());
            existingUser.setAdr(userUpdate.getAdr());
            existingUser.setGenre(userUpdate.getGenre());

            User updatedUser= userRepository.save(existingUser);

            return updatedUser;
        }else{
            return null;
        }
    }


    /*public Page<Product> getAllProducts(int page, int pageSize)
    {
        Pageable paging = PageRequest.of(page, pageSize);

        Page<Product> pagedResult = productRepository.findAll(paging);

        if(pagedResult.hasContent()) {
            return pagedResult.getContent();
        } else {
            return new ArrayList<Product>();
        }
    }*/

}
