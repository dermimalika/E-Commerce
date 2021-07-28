package com.techgeeknext.controllers;


import com.techgeeknext.entities.AuthRequest;
import com.techgeeknext.entities.AuthRequestLogin;
import com.techgeeknext.entities.AuthResponse;
import com.techgeeknext.entities.value_objects.UserVO;
import com.techgeeknext.proxy.ClientProxy;
import com.techgeeknext.services.AuthService;
import com.techgeeknext.services.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.swing.event.CaretListener;

@RestController
@RequestMapping(value = "/auth")
public class AuthController {
    private final AuthService authService;


    @Autowired
    public AuthController(final AuthService authService) {
        this.authService = authService;
    }

    @Autowired
    private ClientProxy clientProxy;

    @PostMapping(value = "/register")
    public ResponseEntity<AuthResponse> register(@RequestBody AuthRequest authRequest) {
        return ResponseEntity.ok(authService.register(authRequest));
    }


    @PostMapping(value = "/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequestLogin authRequest) throws Exception{
        return ResponseEntity.ok(authService.login(authRequest));
    }

}
