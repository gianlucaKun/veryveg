package com.veryveg.product.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "ingredient")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Ingredient extends BaseEntity {
	
	 private String name;
	    private String description;
	    private boolean vegan;
	    private boolean vegetarian;

}
