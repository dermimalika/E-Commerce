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

    /*
    @PostMapping("/upload")
    public void uploadImage(@RequestParam("imageFile") MultipartFile file) throws IOException {
        this.bytes = file.getBytes();
    }*/


    @PostMapping("/add")
    public void createProduct(@ModelAttribute Product product,@RequestParam("file") MultipartFile multipartFile) throws IOException {
        //product.setPicByte(this.bytes);
        String fileName = StringUtils.cleanPath(multipartFile.getOriginalFilename());
        product.setFileUrl(fileName);
       Product savedProduct = productRepository.save(product);
        String uploadDir="product-photos/" + savedProduct.getId();
        FileUploadUtil.saveFile(uploadDir, fileName, multipartFile);
       // this.bytes = null;
    }
    /*
    @PutMapping("/update/{id}")
    public Product updateProduct(@ModelAttribute Product product,@PathVariable("id") Long id,@RequestParam("file") MultipartFile multipartFile)throws IOException  {

        if (productRepository.findById(id).isPresent()){
            Product existingProduct = productRepository.findById(product.getId()).get();
            String p = ;
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
    }*/



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
