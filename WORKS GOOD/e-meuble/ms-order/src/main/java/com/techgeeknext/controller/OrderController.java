package com.techgeeknext.controller;


import com.techgeeknext.Exceptions.OrderNotFoundException;
import com.techgeeknext.Exceptions.ProductNotExistException;
import com.techgeeknext.Service.OrderService;
import com.techgeeknext.dao.UserRepository;
import com.techgeeknext.dto.ApiResponse;
import com.techgeeknext.entities.Order;
import com.techgeeknext.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.ws.rs.Path;
import java.util.List;

@RestController
@RequestMapping("/order")
public class OrderController {
    @Autowired
    private OrderService orderService;
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/add")
    public ResponseEntity<ApiResponse> placeOrder(@RequestParam("user_id") Long user_id) throws ProductNotExistException {
        User user = userRepository.getById(user_id);
        orderService.placeOrder(user);
        return new ResponseEntity<ApiResponse>(new ApiResponse(true,"Order has been placed"), HttpStatus.CREATED);
    }

    @GetMapping("/getOrders")
    public ResponseEntity<List<Order>> getAllOrders(@RequestParam("user_id") Long user_id){
        User user = userRepository.getById(user_id);
        List<Order> orderDtoList = orderService.listOrders(user);
        return new ResponseEntity<List<Order>>(orderDtoList,HttpStatus.OK);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Object> getOrder(@PathVariable("id") Integer id,@RequestParam("user_id") Long user_id){
        User user = userRepository.getById(user_id);

        try {
            Order order = orderService.getOrder(id);
            return new ResponseEntity<>(order,HttpStatus.OK);
        }
        catch (OrderNotFoundException e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
        }
    }
}

