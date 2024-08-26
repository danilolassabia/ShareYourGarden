package com.shareyourgardenbackofc.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@Entity
public class Plant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String popularName;
    private String scientificName;
    private String enviromentLightType;
    private String enviromentClimateType;
    private String size;
    private Date plantingDate;
    private Date lastPruning;
    private Date lastFertilization;
    private String floweringSeason;
    private Float fertilizationFrequency;
    private Float wateringFrequency;
    private Long gardenerId;

    @Lob
    private byte[] image;


    public Plant(String popularName, String scientificName, String enviromentLightType, String enviromentClimateType, String size, Date plantingDate, Date lastPruning, Date lastFertilization, String floweringSeason, Float fertilizationFrequency, Float wateringFrequency, byte[] image) {
        this.popularName = popularName;
        this.scientificName = scientificName;
        this.enviromentLightType = enviromentLightType;
        this.enviromentClimateType = enviromentClimateType;
        this.size = size;
        this.plantingDate = plantingDate;
        this.lastPruning = lastPruning;
        this.lastFertilization = lastFertilization;
        this.floweringSeason = floweringSeason;
        this.fertilizationFrequency = fertilizationFrequency;
        this.wateringFrequency = wateringFrequency;
        this.image = image;
    }
}
