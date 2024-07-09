package com.veryveg.product.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.veryveg.product.entity.Product;
import com.veryveg.product.service.ProductService;

@RestController
@RequestMapping("/product")
public class ProductController {
	
	@Autowired
	private ProductService pService;
	
	@PostMapping("/add")
	public String addController (@RequestBody Product p) {
		System.out.println("prodotto da aggiungere: " + p);
		return pService.saveProduct(p);
	}
	
	
	@GetMapping
	public Product getByCode (@RequestParam("barcode") String barcode) {
		System.out.println("BARCODE : " + barcode);
		return pService.getByBarcode(barcode);
	}

	@GetMapping("/test")
	public String test () {
		System.out.println("TEST ");
		return "test";
	}
	
	@GetMapping("/getAllProduct")
	public  Iterable<Product> getAll () {
		return pService.getAllProducts();
	}

}
