package fr.goupe3.slacklite.config;

import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

//@EnableWebSecurity
public class SecurityConfig {
	
	public SecurityConfig(WebSecurity web) throws Exception {
        web.ignoring().anyRequest();
    }
}
