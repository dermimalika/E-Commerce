package com.techgeeknext.controller;


import com.techgeeknext.dao.CategoryRepository;
import com.techgeeknext.entities.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path = "categorys")
public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping("/get")
    public List<Category> getProducts() {
        return categoryRepository.findAll();
    }

    @PostMapping("/add")
    public void createProduct(@RequestBody Category category) throws IOException {
        categoryRepository.save(category);
    }

    @PutMapping("/update")
    public void updateProduct(@RequestBody Category category) {
        categoryRepository.save(category);;
    }


    @CrossOrigin(origins = "http://localhost:4200")
    @DeleteMapping(path = {"/delCategory/{id}"})
    public Category deleteCategory(@PathVariable("id") long id) {
        Category category = categoryRepository.getOne(id);
        categoryRepository.deleteById(id);
        return category;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/archCategory/{id}")
    public List<Category> archProduct(@PathVariable("id") Long id){
        categoryRepository.archCategory(id);
        return categoryRepository.findAll(); }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/restoreCategory/{id}")
    public List<Category> restoreProduct(@PathVariable("id") Long id){
        categoryRepository.restoreCategory(id);
        return categoryRepository.findAll(); }

}
