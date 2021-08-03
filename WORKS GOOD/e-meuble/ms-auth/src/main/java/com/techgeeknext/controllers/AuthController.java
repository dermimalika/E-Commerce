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
        System.out.println("Register auth request :");
        System.out.println(authRequest);
        return ResponseEntity.ok(authService.register(authRequest));
    }


    @PostMapping(value = "/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequestLogin authRequest) throws Exception{
        System.out.println("auth request :");
        System.out.println(authRequest);
        return ResponseEntity.ok(authService.login(authRequest));
    }

    //Forgot Psw Check if user Exist
    @PostMapping(value = "/forgotpsw")
    public ResponseEntity<Boolean> forgot(@RequestBody AuthRequestLogin authRequest) throws Exception{
        System.out.println("forgotpsw request :");
        System.out.println(authRequest);
        return ResponseEntity.ok(authService.forgot(authRequest));
    }
    @PostMapping(value = "/resetpsw")
    public ResponseEntity<AuthResponse> reset(@RequestBody AuthRequestLogin authRequest) throws Exception{
        System.out.println("resetpsw request :");
        System.out.println(authRequest);
        return ResponseEntity.ok(authService.reset(authRequest));
    }

}
