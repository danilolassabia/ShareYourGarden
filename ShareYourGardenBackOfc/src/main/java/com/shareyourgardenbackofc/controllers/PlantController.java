package com.shareyourgardenbackofc.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.shareyourgardenbackofc.models.Gardener;
import com.shareyourgardenbackofc.models.Plant;
import com.shareyourgardenbackofc.services.PlantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/plant")
@CrossOrigin(origins = "*")
public class PlantController {

    @Autowired
    private PlantService plantService;
    @Autowired
    private ObjectMapper objectMapper;

    @GetMapping("/listAll")
    public ResponseEntity<List<Plant>> getPlants() {
        return ResponseEntity.status(HttpStatus.OK).body(plantService.getAllPlants());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Plant>> getPlantById(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(plantService.getPlantById(id));
    }

    @PostMapping("/newPlant")
    public ResponseEntity<Plant> newPlant(@RequestParam("plantData") String plantData,
                                          @RequestParam(value = "image", required = false) MultipartFile image) {
        try {

            Plant plant = objectMapper.readValue(plantData, Plant.class);


            if (image != null && !image.isEmpty()) {
                plant.setImage(image.getBytes());
            }
            Plant savedPlant = plantService.addPlant(plant);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedPlant);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @PutMapping("/update/{id}")
    public ResponseEntity<Plant> updatePlant(@PathVariable Long id,
                                             @RequestParam("plantData") String plantData,
                                             @RequestParam(value = "image", required = false) MultipartFile image) {
        try {

            Plant plant = objectMapper.readValue(plantData, Plant.class);


            if (image != null && !image.isEmpty()) {
                plant.setImage(image.getBytes());
            }


            Plant updatedPlant = plantService.updatePlant(id, plant);
            return ResponseEntity.status(HttpStatus.OK).body(updatedPlant);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deletePlant(@PathVariable Long id) {
        plantService.deletePlant(id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
