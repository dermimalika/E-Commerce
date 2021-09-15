package com.techgeeknext.controller;


import com.techgeeknext.Service.OrderService;
import com.techgeeknext.dao.OrderRepository;
import com.techgeeknext.entities.DeliveryEtat;
import com.techgeeknext.entities.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/order")
public class DeliveryCotroller {


    @Autowired
    OrderRepository orderRepository;

    @Autowired
    OrderService orderService;

    /*@PostMapping ("/addDelivery")
    public Delivery addDelivery(@RequestBody Delivery delivery)
    {
        return deliveryRepository.save(delivery);
    }*/


    @PostMapping("/addDelivery")
    public Order addDelivery(@RequestParam  Integer order_id){

        Order order = orderService.getOrder(order_id);
        order.setTotalPrice(order.getTotalPrice()+700);
        order.setDeliveryEtat(DeliveryEtat.deliveryInWay);
        orderRepository.save(order);
        return order;
    }

    @PostMapping("/noDelivery")
    public void noDelivery(@RequestParam Integer order_id){

        Order order = orderService.getOrder(order_id);
        order.setDeliveryEtat(DeliveryEtat.bySelf);
        orderRepository.save(order);
    }

    @PostMapping("/delivered")
    public void delivered(@RequestParam  Integer order_id){
        Order order = orderService.getOrder(order_id);
        order.setDeliveryEtat(DeliveryEtat.delivered);
        orderRepository.save(order);

    }



}

