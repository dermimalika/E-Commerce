package com.techgeeknext.model;


import lombok.Data;

@Data
public class productDTO {
    private Long id;
    private String name;
    private int categoryId;
    private double Price;
    private double weight;
    private int quantity;
    private String description;
    private byte[] picByte;
}
