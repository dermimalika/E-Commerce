package com.techgeeknext.proxy;


import com.techgeeknext.model.Order;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@FeignClient(name="ms-order")


public interface OrderProxy {
    @GetMapping("/order/all")
    public List<Order> getAllOrders();
}
