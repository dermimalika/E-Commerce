package com.techgeeknext.controller;

import com.techgeeknext.entities.Admin;
import com.techgeeknext.entities.Product;
import com.techgeeknext.dao.ProductRepository;
import com.techgeeknext.entities.Store;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path = "products")
public class ProductController {

    private byte[] bytes;

    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/get")
    public List<Product> getProducts() {
        return productRepository.findAll();
    }

    @PostMapping("/upload")
    public void uploadImage(@RequestParam("imageFile") MultipartFile file) throws IOException {
        this.bytes = file.getBytes();
    }


    @PostMapping("/add")
    public void createProduct(@RequestBody Product product) throws IOException {
        product.setPicByte(this.bytes);
        productRepository.save(product);
        this.bytes = null;
    }
    @PutMapping("/update")
    public void updateProduct(@RequestBody Product product) {
        productRepository.save(product);;
    }


    @CrossOrigin(origins = "http://localhost:4200")
    @DeleteMapping(path = {"/delProduct/{id}"})
    public Product deleteProduct(@PathVariable("id") long id) {
        Product product = productRepository.getOne(id);
        productRepository.deleteById(id);
        return product;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/archProduct/{id}")
    public List<Product> archProduct(@PathVariable("id") Long id){
        productRepository.archProduct(id);
        return productRepository.findAll(); }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/restoreProduct/{id}")
    public List<Product> restoreProduct(@PathVariable("id") Long id){

        productRepository.restoreProduct(id);
        return productRepository.findAll(); }
}
