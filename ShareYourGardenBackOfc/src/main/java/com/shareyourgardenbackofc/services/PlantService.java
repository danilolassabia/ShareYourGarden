package com.shareyourgardenbackofc.services;

import com.shareyourgardenbackofc.models.Gardener;
import com.shareyourgardenbackofc.models.Plant;
import com.shareyourgardenbackofc.repositories.PlantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlantService {

    @Autowired
    private PlantRepository plantRepository;

    public Plant addPlant(Plant plant) {
        return plantRepository.save(plant);
    }

    public Plant updatePlant(Long id, Plant updatedPlant) {
        updatedPlant.setId(id);
        return plantRepository.save(updatedPlant);
    }

    public List<Plant> getAllPlants() {
        return plantRepository.findAll();
    }

    public Optional<Plant> getPlantById(Long id) {
        return plantRepository.findById(id);
    }

    public void deletePlant(Long id) {
        plantRepository.deleteById(id);
    }
}
