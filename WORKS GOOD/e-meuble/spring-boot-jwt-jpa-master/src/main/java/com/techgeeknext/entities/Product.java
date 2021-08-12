package com.techgeeknext.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import java.util.Collection;


@Entity
@Data
@JsonIgnoreProperties(value = {"hibernateLazyInitializer","handler"})
public class Product {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    //@ManyToOne(fetch = FetchType.LAZY)
    //@JoinColumn(name = "id_category",referencedColumnName = "id_category")
    @Column(name = "category")
    private String category;

    @Column(name = "price")
    private double price;

    @Column(name = "picByte", length = 1000000)
    private byte[] picByte;

    @Column(name = "weight")
    private double weight;

    @Column(nullable = true, length = 64)
    private String fileUrl;
    @Transient
    public String getfileUrlImagePath(){
        if(fileUrl == null || id == null) return null;
        return "/product-photos/" + fileUrl;
    }

    @Column(name = "quantity")
    private int quantity;

    @Column(name = "description")
    private String description;



    @Column (columnDefinition = "boolean default false ")
    private Boolean arch;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public byte[] getPicByte() {
        return picByte;
    }

    public void setPicByte(byte[] picByte) {
        this.picByte = picByte;
    }

    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
