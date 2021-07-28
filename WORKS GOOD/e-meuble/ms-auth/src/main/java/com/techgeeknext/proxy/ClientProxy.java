package com.techgeeknext.proxy;


import com.techgeeknext.entities.value_objects.UserVO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(name = "ms-client", url="localhost:8081")
public interface ClientProxy {

    @GetMapping("/users/username")
    public ResponseEntity<List<UserVO>> getUserByUsername(@RequestParam String username);

}
