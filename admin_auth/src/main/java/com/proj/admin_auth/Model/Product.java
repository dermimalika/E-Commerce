package com.proj.admin_auth.Model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id",referencedColumnName = "category_id")
    private Category category;
    private double currentPrice;
    private double weight;

    private String promotion;
    private String available;
    private int quantity;
    private String description;
    private String imageName;


}
