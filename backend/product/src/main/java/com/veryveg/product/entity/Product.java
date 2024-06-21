package com.veryveg.product.entity;

import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "example_entity")
@Getter
@Setter
public class Product extends BaseEntity {

    private String name;
    private String description;

}
