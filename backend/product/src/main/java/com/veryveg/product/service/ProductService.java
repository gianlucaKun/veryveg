package com.veryveg.product.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.veryveg.product.repository.ProductRepository;

@Service
public class ProductService {

	
	@Autowired
	private ProductRepository pRepo;
	
	
}
