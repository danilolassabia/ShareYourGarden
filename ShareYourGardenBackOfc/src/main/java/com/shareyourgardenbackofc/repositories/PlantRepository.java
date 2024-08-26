package com.shareyourgardenbackofc.repositories;

import com.shareyourgardenbackofc.models.Gardener;
import com.shareyourgardenbackofc.models.Plant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlantRepository extends JpaRepository<Plant, Long> {
}
