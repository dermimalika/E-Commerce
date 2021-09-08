package com.techgeeknext.controller;

import com.techgeeknext.dao.ProductRepository;
import com.techgeeknext.dao.StoreRepository;
import com.techgeeknext.entities.Product;
import com.techgeeknext.service.FileUploadUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path = "products")
public class ProductController {

    private byte[] bytes;
    private String fileNameInController;

    @Autowired
    private StoreRepository storeRespository;


    @Autowired
    private ProductRepository productRepository;
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/get")
    public List<Product> getProducts() {
        return productRepository.findAll();
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
        System.out.println("in add prodcts idstore :"+product.getId_store());
        System.out.println(product.getFileUrl());
        product.setArch(false);
        Product savedProduct = productRepository.save(product);
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/update/{id}")
    public Product updateProduct(@PathVariable("id") Long id,@RequestBody Product product)throws IOException  {
        System.out.println("Product name :"+product.getName());
        if (productRepository.findById(id).isPresent()){
            Product existingProduct = productRepository.findById(id).get();
            //Delete old image
            File file = new File("..\\FrontAdmin\\src\\assets\\product-photos\\"+existingProduct.getFileUrl());

            if(file.delete()){
                System.out.println(file.getName() + " is deleted!");
            }else{
                System.out.println("Delete operation is failed.");
            }

            existingProduct.setName(product.getName());
            existingProduct.setCategory(product.getCategory());
            existingProduct.setWeight(product.getWeight());
            existingProduct.setQuantity(product.getQuantity());
            existingProduct.setDescription(product.getDescription());
            existingProduct.setPrice(product.getPrice());
            existingProduct.setFileUrl(product.getFileUrl());
            System.out.println("existingProduct name :"+existingProduct.getName());
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
