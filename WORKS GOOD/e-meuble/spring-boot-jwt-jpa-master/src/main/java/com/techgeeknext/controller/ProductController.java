package com.techgeeknext.controller;

import com.techgeeknext.dao.ProductRepository;
import com.techgeeknext.entities.Admin;
import com.techgeeknext.entities.Product;
import com.techgeeknext.service.FileUploadUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Date;
import java.util.List;
import java.util.Random;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path = "products")
public class ProductController {

    private byte[] bytes;
    private String fileNameInController;

    @Autowired
    private ProductRepository productRepository;
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/get")
    public List<Product> getProducts() {
        return productRepository.findAll();
    }

    // To generate A String
    public static String generateRandomPassword(int len) {
        String chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijk"
                +"lmnopqrstuvwxyz!@#$%&";
        Random rnd = new Random();
        StringBuilder sb = new StringBuilder(len);
        for (int i = 0; i < len; i++)
            sb.append(chars.charAt(rnd.nextInt(chars.length())));
        return sb.toString();
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/upload")
    public void uploadImage(@RequestParam("file") MultipartFile multipartFile) throws IOException {

        fileNameInController = generateRandomPassword(8)+"-"+StringUtils.cleanPath(multipartFile.getOriginalFilename());
        String uploadDir="..\\FrontAdmin\\src\\assets\\product-photos\\";
        FileUploadUtil.saveFile(uploadDir, fileNameInController, multipartFile);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping(value= "/add")
    public void createProduct(@RequestBody Product product) throws IOException {
        System.out.println("in add prodcts ");
        product.setFileUrl(fileNameInController);

        product.setArch(false);
        Product savedProduct = productRepository.save(product);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PutMapping("/update/{id}")
    public Product updateProduct(@ModelAttribute Product product,@PathVariable("id") Long id,@RequestParam("file") MultipartFile multipartFile)throws IOException  {

        if (productRepository.findById(id).isPresent()){
            Product existingProduct = productRepository.findById(product.getId()).get();
            String p ="" ;
            p =StringUtils.cleanPath(multipartFile.getOriginalFilename());

            existingProduct.setName(product.getName());
            existingProduct.setCategory(product.getCategory());
            existingProduct.setWeight(product.getWeight());
            existingProduct.setQuantity(product.getQuantity());
            existingProduct.setDescription(product.getDescription());
            existingProduct.setPrice(product.getPrice());
            existingProduct.setFileUrl(p);

            Product updatedProduct = productRepository.save(existingProduct);

            return updatedProduct;
        }else{
            return null;
        }
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
