package com.techgeeknext.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Delivery {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_delivery;

    private Long user_id;

    private Long order_id;

    private String adress;

    @Column
    private double prix = 700;




}
