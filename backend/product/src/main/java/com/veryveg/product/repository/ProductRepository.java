package com.veryveg.product.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.veryveg.product.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long>{

	Product findByBarcode(String barcode);

	
}
