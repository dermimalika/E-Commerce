package com.techgeeknext.controller;

import com.techgeeknext.dao.ProductRepository;
import com.techgeeknext.entities.Product;
import com.techgeeknext.service.FileUploadUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
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
        String chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijk";
        Random rnd = new Random();
        StringBuilder sb = new StringBuilder(len);
        for (int i = 0; i < len; i++)
            sb.append(chars.charAt(rnd.nextInt(chars.length())));
        return sb.toString();
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/upload")
    public void uploadImage(@RequestParam("file") MultipartFile multipartFile) throws IOException {

        String l=  StringUtils.cleanPath(multipartFile.getOriginalFilename());
        System.out.println(l);
        String uploadDir="..\\FrontAdmin\\src\\assets\\product-photos\\";
        FileUploadUtil.saveFile(uploadDir, l , multipartFile);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping(value= "/add")
    public void createProduct(@RequestBody Product product) throws IOException {
        System.out.println("in add prodcts ");
        System.out.println(product.getFileUrl());
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

        File file = new File("..\\FrontAdmin\\src\\assets\\"+product.getfileUrlImagePath());

        if(file.delete()){
            System.out.println(file.getName() + " is deleted!");
        }else{
            System.out.println("Delete operation is failed.");
        }
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
