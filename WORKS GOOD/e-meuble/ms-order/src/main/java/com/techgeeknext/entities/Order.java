package com.techgeeknext.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.techgeeknext.dto.Order.PlaceOrderDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Collection;
import java.util.Date;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
@Entity
@Table(name="orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "created_date")
    private Date createdDate;

    @Column(name = "total_price")
    private Double totalPrice;

    @Enumerated(value = EnumType.STRING)
    @Column(name = "deliveryEtat")
    private DeliveryEtat deliveryEtat = DeliveryEtat.nothing;


    @ManyToOne()
    @JsonIgnore
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @OneToMany(mappedBy = "order", fetch = FetchType.LAZY)
    private List<OrderItem> orderItems;

    public Order(PlaceOrderDto orderDto, User user){
        this.user = user;
        this.createdDate = new Date();
        this.totalPrice = orderDto.getTotalPrice();
    }

    public List<OrderItem> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(List<OrderItem> orderItems) {
        this.orderItems = orderItems;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }


    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public DeliveryEtat getDeliveryEtat() {
        return deliveryEtat;
    }

    public void setDeliveryEtat(DeliveryEtat deliveryEtat) {
        this.deliveryEtat = deliveryEtat;
    }
}

