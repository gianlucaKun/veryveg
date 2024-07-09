package com.veryveg.product.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

	@Bean
	WebMvcConfigurer corsConfigurer() {

		return new WebMvcConfigurer() {

			@Override
			public void addCorsMappings(CorsRegistry registry) { // httplocalhost funzionante se apri FE dal pc, le
																	// altre due test ma non funzionano
																	// http://localhost:8081",
																	// "http://192.168.1.9:8081",
																	// "exp://192.168.1.9:8081
				registry.addMapping("/**").allowedOrigins("*").allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
						.allowedHeaders("*").allowCredentials(false);
			}
		};
	}

}
