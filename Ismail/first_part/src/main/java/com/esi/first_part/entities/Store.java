package com.esi.first_part.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import net.minidev.json.annotate.JsonIgnore;

import javax.persistence.*;

@Entity
@Data @AllArgsConstructor@NoArgsConstructor
public class Store {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idStore;

    private String nom;

    @ToString.Exclude
    @JsonIgnore
    @OneToOne(mappedBy = "store", fetch= FetchType.LAZY)
    private Address address;

    @ToString.Exclude
    @ManyToOne
    @JoinColumn(name = "idAdmin" )
    @JsonBackReference
    private Admin admin;

}
