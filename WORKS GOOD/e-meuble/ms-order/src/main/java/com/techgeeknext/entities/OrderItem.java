package com.techgeeknext.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Table(name = "orderitems")
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;


    @Column(name = "quantity")
    private @NotNull int quantity;

    @Column(name = "price")
    private @NotNull double price;

    @Column(name = "created_date")
    private Date createdDate;

    @ManyToOne
    @JoinColumn(name = "order_id", referencedColumnName = "id")
    private Order order;

    @OneToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    private Product product;


    public OrderItem(Order order, @NotNull Product product, @NotNull int quantity, @NotNull double price) {
        this.product = product;
        this.quantity = quantity;
        this.price = price;
        this.order= order;
        this.createdDate = new Date();
    }
}
