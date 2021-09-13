package com.techgeeknext.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@Data
@NoArgsConstructor

public class Order {

    private Integer id;
    private Date createdDate;
    private Double totalPrice;
    private DeliveryEtat deliveryEtat;

}

