package com.esi.first_part;

import com.esi.first_part.dao.AdminRepository;
import com.esi.first_part.dao.StoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class FirstPartApplication implements CommandLineRunner {

    @Autowired
    AdminRepository adminRepository;

    @Autowired
    StoreRepository storeRepository;

    public static void main(String[] args) {
        SpringApplication.run(FirstPartApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        //adminRepository.findAdminByNom("abdou").forEach(System.out::println);

        storeRepository.findStoreByNom("Amel").forEach(System.out::println);
    }
}
