package com.shareyourgardenbackofc.controllers;

import com.shareyourgardenbackofc.models.Gardener;
import com.shareyourgardenbackofc.models.Plant;
import com.shareyourgardenbackofc.services.GardenerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/gardener")
@CrossOrigin(origins = "*")
public class GardenerController {

    @Autowired
    GardenerService gardenerService;

    @GetMapping("/listAll")
    public ResponseEntity<List<Gardener>> getGardeners() {
        return ResponseEntity.status(HttpStatus.OK).body(gardenerService.getAllGardeners());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Gardener>> getGardenerById(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(gardenerService.getGardenerById(id));
    }

    @PostMapping("/newGardener")
    public ResponseEntity<Gardener> newGardener(@RequestBody Gardener gardener) {
        return ResponseEntity.status(HttpStatus.CREATED).body(gardenerService.addGardener(gardener));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Gardener> updateGardener(@PathVariable Long id, @RequestBody Gardener gardener){
        return ResponseEntity.status(HttpStatus.OK).body(gardenerService.updateGardener(id, gardener));
    }
}
