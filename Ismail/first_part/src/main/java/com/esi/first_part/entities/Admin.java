package com.esi.first_part.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import net.minidev.json.annotate.JsonIgnore;

import javax.persistence.*;
import java.util.Collection;

@Entity
@Data@AllArgsConstructor@NoArgsConstructor
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idAdmin;

    private String nom;
    private String prenom;
    private String email;
    private String password;


    @OneToMany(mappedBy = "admin")
    private Collection<Store> stores;

}
