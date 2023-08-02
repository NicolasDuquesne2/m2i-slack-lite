package fr.goupe3.slacklite.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
	public void create(@RequestBody User user) {
		
	}
	
	@PostMapping("/login")
	public void login(@RequestBody User user) {
		
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
