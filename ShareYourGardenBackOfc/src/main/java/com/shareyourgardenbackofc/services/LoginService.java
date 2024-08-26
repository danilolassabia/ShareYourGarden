package com.shareyourgardenbackofc.services;

import com.shareyourgardenbackofc.configs.JwtServiceGenerator;
import com.shareyourgardenbackofc.models.Gardener;
import com.shareyourgardenbackofc.models.Login;
import com.shareyourgardenbackofc.repositories.LoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;



@Service
public class LoginService {

    @Autowired
    private LoginRepository repository;
    @Autowired
    private JwtServiceGenerator jwtService;
    @Autowired
    private AuthenticationManager authenticationManager;


    public String login(Login login) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        login.getUsername(),
                        login.getPassword()
                )
        );
        Gardener gardener = repository.findByUsername(login.getUsername()).get();
        String jwtToken = jwtService.generateToken(gardener);

        return jwtToken;
    }

}
