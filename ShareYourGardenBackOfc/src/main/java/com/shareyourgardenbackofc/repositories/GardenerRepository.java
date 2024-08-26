package com.shareyourgardenbackofc.repositories;

import com.shareyourgardenbackofc.models.Gardener;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GardenerRepository extends JpaRepository<Gardener, Long> {
}
