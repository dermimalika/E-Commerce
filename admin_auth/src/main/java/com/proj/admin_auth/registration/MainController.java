package com.proj.admin_auth.registration;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {

    @GetMapping("/")
    public String home() {
        return "wlcm";

    }


    @GetMapping("/sadmin")
    public String sadmin() {
        return "index";

    }

    @GetMapping("/admin")
    public String admin() {
        return "index2";

    }
}