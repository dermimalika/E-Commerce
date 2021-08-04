package com.techgeeknext.controller;

import com.techgeeknext.config.MyConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@CrossOrigin
@RestController
@RequestMapping("")
public class EmailController {

    @Autowired
    public JavaMailSender emailSender;

    //Afficher All Admins
    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/sendMailAdmin")
    public String sendSimpleEmail(@RequestBody String mail) {

        // Create a Simple MailMessage.
        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(mail);
        message.setSubject("Web App Project");
        message.setText(MyConstants.Admin_EMAIL);

        // Send Message!
        this.emailSender.send(message);

        return "Email Sent!";
    }

}
