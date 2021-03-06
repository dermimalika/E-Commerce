package com.techgeeknext.Service;

import com.techgeeknext.dao.OrderItemRepository;
import com.techgeeknext.dao.ProductRepository;
import com.techgeeknext.entities.OrderItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class OrderItemsService {
    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private ProductRepository productRepository;

    public void addOrderedProducts(OrderItem orderItem){



        orderItemRepository.save(orderItem);
    }
}
