package com.proj.admin_auth.Dao;

import lombok.Data;

@Data
public class ProductDTO {
    private Long id;
    private String name;
    private int categoryId;
    private double currentPrice;
    private double weight;
    private String promotion;
    private String available;
    private int quantity;
    private String description;
    private String imageName;
}
