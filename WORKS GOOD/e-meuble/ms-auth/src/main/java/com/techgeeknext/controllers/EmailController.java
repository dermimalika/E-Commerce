package com.techgeeknext.controllers;

import com.techgeeknext.config.MyConstants;
import com.techgeeknext.entities.AuthRequest;
import com.techgeeknext.entities.AuthRequestLogin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RestController
@RequestMapping("auth")
public class EmailController {

    @Autowired
    public JavaMailSender emailSender;

    //Send Mails to Clients

    @PostMapping("/sendMailClient")
    public String sendSimpleEmail(@RequestBody AuthRequestLogin authRequestLogin) {

        // Create a Simple MailMessage.
        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(authRequestLogin.getEmail());
        message.setSubject("E-Meuble");
        String s=authRequestLogin.getPassword();
        System.out.println("mode in send mail :");
        System.out.println(authRequestLogin.getPassword());
        if (s.equals("register")){message.setText(MyConstants.Client_EMAIL);}
        else if (s.equals("reset")){message.setText(MyConstants.Client_ResetPSW_EMAIL);}


        // Send Message!
        this.emailSender.send(message);

        return "Email Sent!";
    }

}
