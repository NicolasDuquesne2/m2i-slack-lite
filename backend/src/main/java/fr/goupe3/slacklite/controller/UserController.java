package fr.goupe3.slacklite.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;

import fr.goupe3.slacklite.entity.User;
import fr.goupe3.slacklite.service.UserService;

@Controller
@RequestMapping("/users")
public class UserController {

	@Autowired
	UserService userService;
	
	@GetMapping("")
	public ResponseEntity<List<User>> getAll(){
		return ResponseEntity.ok(userService.getAll());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> getById(@PathVariable("id") Long id){
		Optional<User> optionalUser = userService.getById(id);
		
		if(optionalUser.isPresent()) {
			return ResponseEntity.ok(optionalUser.get());
		}
		
		return new ResponseEntity<>(Map.of("error", "No user found with the specified id"), HttpStatus.NOT_FOUND);
	}
	
	@PostMapping("/signup")
	public ResponseEntity<?> create(@RequestBody User user) {
		if(user.getId() != null) return ResponseEntity.badRequest().body(Map.of("error", "The user body must not contains an id"));
		
		if(user.getName() == null || user.getEmail() == null || user.getPassword() == null) {
			Map<String, String> errorMap = new HashMap<>();
			if (user.getName() == null) errorMap.put("Arg error", "Name must not be null");
			if (user.getEmail() == null) errorMap.put("Arg error", "Email must not be null");
			if (user.getPassword() == null) errorMap.put("Arg error", "Password must not be null");
			
			return ResponseEntity.badRequest().body(errorMap);
		}
		
		Optional<User> optionalUser = userService.getByEmail(user.getEmail());
		if(optionalUser.isPresent()) return ResponseEntity.badRequest().body(Map.of("error", "The given email is already used"));
		
		// create an Hashed password
		PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		String hashedPassword = passwordEncoder.encode(user.getPassword());
		user.setPassword(hashedPassword);
		
		userService.save(user);
		
		return new ResponseEntity<>(Map.of("message", "User has been successfully created"), HttpStatus.CREATED);
			
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody User user) {
		if(user.getEmail() == null || user.getPassword() == null) {
			Map<String, String> errorMap = new HashMap<>();
			if (user.getEmail() == null) errorMap.put("Arg error", "Invalid email");
			if (user.getPassword() == null) errorMap.put("Arg error", "Invalid password");
			
			return ResponseEntity.badRequest().body(errorMap);
		}
		
		Optional<User> optionalUser = userService.getByEmail(user.getEmail());
		if(optionalUser.isEmpty()) return new ResponseEntity<>(Map.of("error", "No user found with the specified email"), HttpStatus.NOT_FOUND);
		
		// Password check
		PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		boolean isPasswordValid = passwordEncoder.matches(user.getPassword(), optionalUser.get().getPassword());
		
		if(isPasswordValid) {
			Long userId = user.getId();
			String token = passwordEncoder.encode(userId.toString());
			Map<String, String> resMap = new HashMap<>();
			resMap.put("userId", userId.toString());
			resMap.put("token", token);
			return ResponseEntity.ok(resMap);
		}		
		
		return new ResponseEntity<>(Map.of("error", "Incorrect password"), HttpStatus.UNAUTHORIZED);
		
	}
	
	@PutMapping("/{id}")
	public void update(@PathVariable("id") Long id, @RequestBody User user) {
		
		
	}
	
	@PatchMapping("/{id}")
	public void partialUpdate(@PathVariable("id") Long id, @RequestBody User user) {
		
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> delete(@PathVariable("id") Long id) {
		if(id == null) return ResponseEntity.badRequest().body(Map.of("error", "The id parameter must not be null"));
		
		if(userService.getById(id).isEmpty()) return new ResponseEntity<>(Map.of("error", "No user found with the specified id"), HttpStatus.NOT_FOUND);
		
		if(userService.delete(id)) return ResponseEntity.ok(Map.of("message", "The user was successfully deleted"));
		
		return ResponseEntity.internalServerError().body(Map.of("error", "An error occurred while attempting to delete the user"));
		
	}
}