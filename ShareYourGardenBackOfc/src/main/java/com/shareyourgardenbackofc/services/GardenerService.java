package com.shareyourgardenbackofc.services;

import com.shareyourgardenbackofc.models.Gardener;
import com.shareyourgardenbackofc.repositories.GardenerRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GardenerService {

    @Autowired
    GardenerRepository gardenerRepository;
    @Autowired
    PasswordEncoder passwordEncoder;

    public Gardener addGardener(Gardener gardener){
        gardener.setPassword(passwordEncoder.encode((gardener.getPassword())));
        return gardenerRepository.save(gardener);
    }

    public List<Gardener> getAllGardeners(){
        return gardenerRepository.findAll();
    }

    public Optional<Gardener> getGardenerById(Long id){
        return gardenerRepository.findById(id);
    }

    public Gardener updateGardener(Long id, Gardener updatedGardener) {
        updatedGardener.setId(id);
        return gardenerRepository.save(updatedGardener);
    }
}
