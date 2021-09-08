package com.techgeeknext.controller;


import com.techgeeknext.dao.DeliveryRepository;
import com.techgeeknext.dto.ApiResponse;
import com.techgeeknext.entities.Delivery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/order")
public class DeliveryCotroller {

    @Autowired
    DeliveryRepository deliveryRepository;

    @PostMapping ("/addDelivery")
    public Delivery addDelivery(@RequestBody Delivery delivery)
    {
        return deliveryRepository.save(delivery);
    }


}
