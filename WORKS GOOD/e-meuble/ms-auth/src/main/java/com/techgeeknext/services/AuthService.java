package com.techgeeknext.services;


import com.techgeeknext.entities.AuthRequest;
import com.techgeeknext.entities.AuthRequestLogin;
import com.techgeeknext.entities.AuthResponse;
import com.techgeeknext.entities.value_objects.UserVO;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import org.springframework.web.client.RestTemplate;

@Service
public class AuthService {


    private final RestTemplate restTemplate;
    private final JwtUtil jwt;

    @Autowired
    public AuthService(RestTemplate restTemplate,
                       final JwtUtil jwt) {
        this.restTemplate = restTemplate;
        this.jwt = jwt;
    }

    public AuthResponse register(AuthRequest authRequest) {
        //do validation if user already exists
       authRequest.setPassword(BCrypt.hashpw(authRequest.getPassword(), BCrypt.gensalt()));

        UserVO userVO = restTemplate.postForObject("http://ms-client/users/register", authRequest, UserVO.class);
        Assert.notNull(userVO, "Failed to register user. Please try again later");

        String accessToken = jwt.generate(userVO, "ACCESS");
        String refreshToken = jwt.generate(userVO, "REFRESH");

        return new AuthResponse(accessToken, refreshToken);

    }

    public AuthResponse login(AuthRequestLogin authRequest){
        UserVO userVO  = restTemplate.postForObject("http://ms-client/users/login",authRequest,UserVO.class);
        //String username = authRequest.getUsername();
       // UserVO userVO= restTemplate.getForObject("http://ms-client/users/login",UserVO.class);
        Assert.notNull(userVO,"FAILED TO LOGIN");
        String accessToken = jwt.generate(userVO,"ACCESS");
        String refreshToken = jwt.generate(userVO, "REFRESH");

        return new AuthResponse(accessToken, refreshToken);
    }

    public Boolean forgot(AuthRequestLogin authRequest){
        UserVO userVO  = restTemplate.postForObject("http://ms-client/users/forgotpsw",authRequest,UserVO.class);

        Assert.notNull(userVO,"FAILED TO LOGIN");

        return true;
    }

    public AuthResponse reset(AuthRequestLogin authRequest){
        //do validation if user already exists
        authRequest.setPassword(BCrypt.hashpw(authRequest.getPassword(), BCrypt.gensalt()));

        UserVO userVO = restTemplate.postForObject("http://ms-client/users/resetpsw", authRequest, UserVO.class);
        Assert.notNull(userVO, "Failed to reset Password user. Please try again later");

        String accessToken = jwt.generate(userVO, "ACCESS");
        String refreshToken = jwt.generate(userVO, "REFRESH");

        return new AuthResponse(accessToken, refreshToken);



    }


}
