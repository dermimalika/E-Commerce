package com.techgeeknext.controller;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StripeController {

    @Value("${stripe.apikey}")
    String stripeKey;
}
