package com.techgeeknext.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
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

    @Column
    private Long id_store;


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

    public String getFileUrl() {
        return fileUrl;
    }

    public void setFileUrl(String fileUrl) {
        this.fileUrl = fileUrl;
    }

    public Boolean getArch() {
        return arch;
    }

    public void setArch(Boolean arch) {
        this.arch = arch;
    }

    public Long getId_store() {
        return id_store;
    }

    public void setId_store(Long id_store) {
        this.id_store = id_store;
    }
}
