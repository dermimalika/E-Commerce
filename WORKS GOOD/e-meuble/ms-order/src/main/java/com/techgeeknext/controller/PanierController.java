package com.techgeeknext.controller;


import com.techgeeknext.Exceptions.PanierItemNotExistException;
import com.techgeeknext.Exceptions.ProductNotExistException;
import com.techgeeknext.Service.PanierService;
import com.techgeeknext.Service.ProductService;
import com.techgeeknext.dao.ProductRepository;
import com.techgeeknext.dao.UserRepository;
import com.techgeeknext.dto.ApiResponse;
import com.techgeeknext.dto.Panier.AddToPanierDto;
import com.techgeeknext.dto.Panier.PanierDto;
import com.techgeeknext.entities.Product;
import com.techgeeknext.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/panier")
public class PanierController {

    @Autowired
    private PanierService panierService;

    @Autowired
    private ProductService productService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/add")
    public ResponseEntity<ApiResponse> addToPanier(@RequestBody AddToPanierDto addToPanierDto,@RequestParam("user_id") Long user_id) throws ProductNotExistException {
        Product product = productService.getProductById(addToPanierDto.getProductId());
        User user = userRepository.getById(user_id);
        System.out.println("product to add"+ product.getName());
        panierService.addToPanier(addToPanierDto,product,user);
        return new ResponseEntity<ApiResponse>(new ApiResponse(true,"Added to panier"), HttpStatus.CREATED);
    }


    @PostMapping("/test")
    public ResponseEntity<ApiResponse> test(@RequestParam ("user_id") Long user_id) throws ProductNotExistException{
        User user = userRepository.getById(user_id);
        System.out.println("user is" + user.getFirstName());
        return new ResponseEntity<ApiResponse>(new ApiResponse(true,"USER IS"), HttpStatus.CREATED);
    }

    @GetMapping("/getPanierItems")
    public ResponseEntity<PanierDto> getPanierItems(@RequestParam Long user_id) {
        User user =  userRepository.getById(user_id);
        PanierDto panierDto = panierService.listPanierItems(user);
        return new ResponseEntity<PanierDto>(panierDto,HttpStatus.OK);

    }

    @PostMapping("/update/{panietItemId}")
    public ResponseEntity<ApiResponse> updatePanierItem(@RequestBody @Valid AddToPanierDto panierDto,@RequestParam("user_id") Long user_id) throws ProductNotExistException{
        User user = userRepository.getById(user_id);
        Product product = productService.getProductById(panierDto.getProductId());
        panierService.updatePanierItem(panierDto,user,product);
        return new ResponseEntity<ApiResponse>(new ApiResponse(true,"Product has been updates"),HttpStatus.OK);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<ApiResponse> deletePanierItem(@RequestParam("id")int panierItemId,@RequestParam("user_id") Long user_id) throws PanierItemNotExistException {
        panierService.deletePanierItem(panierItemId,user_id);
        return new ResponseEntity<ApiResponse>(new ApiResponse(true,"Item has been removed"), HttpStatus.OK);

    }



}
