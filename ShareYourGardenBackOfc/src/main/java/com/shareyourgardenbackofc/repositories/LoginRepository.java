package com.shareyourgardenbackofc.repositories;

import com.shareyourgardenbackofc.models.Gardener;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface LoginRepository extends JpaRepository<Gardener, Long>{

    public Optional<Gardener> findByUsername(String login);

}
