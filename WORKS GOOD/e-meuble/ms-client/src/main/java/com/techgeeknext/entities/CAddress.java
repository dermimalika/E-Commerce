package com.techgeeknext.entities;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data @AllArgsConstructor @NoArgsConstructor
public class CAddress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idAddress;

    private int codePostal;
    private String rue;
    private String ville;
    private String wilaya;

    @OneToOne
    private User user;

}
