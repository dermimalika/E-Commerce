package com.techgeeknext.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GatewayConfig {

    @Autowired
    AuthenticationFilter filter;

    @Bean
    public RouteLocator routes(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("user-service", r -> r.path("/users/**")
                        .filters(f -> f.filter(filter))
                        .uri("lb://ms-client"))

                .route("auth-service", r -> r.path("/auth/**")
                        .filters(f -> f.filter(filter))
                        .uri("lb://ms-auth"))

                .route("order-service", r -> r.path("/order/**")
                        .filters(f -> f.filter(filter))
                        .uri("lb://ms-order"))
                .route("panier-service", r -> r.path("/panier/**")
                        .filters(f -> f.filter(filter))
                        .uri("lb://ms-order"))
                .build();
    }
}
