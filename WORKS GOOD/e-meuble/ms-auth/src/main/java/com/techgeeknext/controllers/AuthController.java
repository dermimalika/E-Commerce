package com.techgeeknext.controllers;


import com.techgeeknext.entities.AuthRequest;
import com.techgeeknext.entities.AuthRequestLogin;
import com.techgeeknext.entities.AuthResponse;
import com.techgeeknext.services.AuthService;
import com.techgeeknext.services.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/auth")
public class AuthController {
    private final AuthService authService;


    @Autowired
    public AuthController(final AuthService authService) {
        this.authService = authService;
    }


    @PostMapping(value = "/register")
    public ResponseEntity<AuthResponse> register(@RequestBody AuthRequest authRequest) {
        return ResponseEntity.ok(authService.register(authRequest));
    }



}
