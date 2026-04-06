package com.example.FoodAPI.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Items {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int itemId;

    private String itemName;
    private int price;
    private int quantity;
    private String description;

    private String imageName;
    private String imageType;
    @Lob
    private byte[] imageData;
}
