package com.veryveg.product.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "product")
@Getter
@Setter
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
