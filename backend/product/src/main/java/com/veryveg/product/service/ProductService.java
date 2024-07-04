package com.veryveg.product.service;

import java.util.HashSet;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.veryveg.product.entity.Ingredient;
import com.veryveg.product.entity.Product;
import com.veryveg.product.repository.ProductRepository;

import jakarta.transaction.Transactional;

@Service
public class ProductService {

	
	@Autowired
	private ProductRepository pRepo;
	
	   public Iterable<Product> getAllProducts() {
	        return pRepo.findAll();
	    }

	    public Product getProductById(Long id) {
	        return pRepo.findById(id).orElse(null);
	    }


	    @Transactional
	    public String saveProduct(Product product) {
	        // Verifica se il set di ingredienti è nullo e inizializzalo se necessario
	        if (product.getIngredients() == null) {
	            product.setIngredients(new HashSet<>());
	        }

	        // Calcola se il prodotto è vegan o vegetariano in base agli ingredienti
	        boolean vegan = true;
	        boolean vegetarian = true;

	        // Se ci sono ingredienti, calcola vegan e vegetarian
	        if (!product.getIngredients().isEmpty()) {
	            for (Ingredient ingredient : product.getIngredients()) {
	                if (!ingredient.isVegan()) {
	                    vegan = false;
	                }
	                if (!ingredient.isVegetarian()) {
	                    vegetarian = false;
	                }
	            }
	        }

	        product.setVegan(vegan);
	        product.setVegetarian(vegetarian);

	        pRepo.save(product);
	        return product.getName();
	    }

	    
	    

	    public void deleteProductById(Long id) {
	    	pRepo.deleteById(id);
	    }

	    
		public String getByBarcode(String barcode) {
			Product finded = pRepo.findByBarcode(barcode);
			
			return finded.getName();
		}

}
