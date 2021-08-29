package com.techgeeknext.Service;

import com.techgeeknext.Exceptions.ProductNotExistException;
import com.techgeeknext.dao.ProductRepository;
import com.techgeeknext.entities.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service

public class ProductService {

    @Autowired
    private ProductRepository productRepository;


    public Product getProductById(Long productId) throws ProductNotExistException {
        Optional<Product> optionalProduct = productRepository.findById(productId);
        if (!optionalProduct.isPresent())
            throw new ProductNotExistException("Product id is invalid " + productId);
        return optionalProduct.get();
    }
}
