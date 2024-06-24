package com.veryveg.product.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.veryveg.product.entity.Ingredient;
import com.veryveg.product.entity.Product;
import com.veryveg.product.repository.ProductRepository;

@Service
public class ProductService {

	
	@Autowired
	private ProductRepository pRepo;
	
	   public Iterable<Product> getAllProducts() {
	        return pRepo.findAll();
	    }

	    public Optional<Product> getProductById(Long id) {
	        return pRepo.findById(id);
	    }


	    public Product saveProduct(Product product) {
	        // Calcolo se il prodotto è vegan o vegetariano in base agli ingredienti
	        boolean vegan = true;
	        boolean vegetarian = true;

	        for (Ingredient ingredient : product.getIngredients()) {
	            if (!ingredient.isVegan()) {
	                vegan = false;
	            }
	            if (!ingredient.isVegetarian()) {
	                vegetarian = false;
	            }
	        }

	        product.setVegan(vegan);
	        product.setVegetarian(vegetarian);

	        return pRepo.save(product);
	    }

	    public void deleteProductById(Long id) {
	    	pRepo.deleteById(id);
	    }
}
