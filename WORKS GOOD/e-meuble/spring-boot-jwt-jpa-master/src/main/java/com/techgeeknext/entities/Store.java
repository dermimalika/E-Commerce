package com.techgeeknext.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import net.minidev.json.annotate.JsonIgnore;

import javax.persistence.*;

@Entity
@Data @AllArgsConstructor@NoArgsConstructor
@Table(uniqueConstraints= @UniqueConstraint(columnNames={"nom"}))
public class Store {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idStore;

    private String nom;

    @Column (columnDefinition = "boolean default false ")
    private Boolean arch;

    private String description;

    @ToString.Exclude
    @JsonIgnore
    @OneToOne(mappedBy = "store", fetch= FetchType.LAZY)
    private Address address;

    @ToString.Exclude
    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "id")
    @JsonBackReference
    private Admin admin;

}
