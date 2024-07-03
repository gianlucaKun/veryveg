package com.veryveg.product.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "product")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product extends BaseEntity {

    private String name;
    private String description;
    
    private String barcode;
    private boolean vegan;
    private boolean vegetarian;

    
    @ManyToMany
    private Set<Ingredient> ingredients;
}
