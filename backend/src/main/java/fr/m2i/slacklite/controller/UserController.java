package fr.m2i.slacklite.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import fr.m2i.slacklite.entity.User;
import fr.m2i.slacklite.interfaces.UserProjection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.m2i.slacklite.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {

	@Autowired
	UserService userService;

	@GetMapping("")
	public ResponseEntity<List<UserProjection>> getAll() {
		return ResponseEntity.ok(userService.getAllUserProjection());
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> getById(@PathVariable("id") Long id) {
		Optional<UserProjection> optionalUser = userService.getByIdUserProjection(id);

		if (optionalUser.isPresent())
			return ResponseEntity.ok(optionalUser.get());

		return new ResponseEntity<>(Map.of("error", "No user found with the specified id"), HttpStatus.NOT_FOUND);
	}

	@PostMapping("/signup")
	public ResponseEntity<?> create(@RequestBody User user) {
		if (user.getId() != null)
			return ResponseEntity.badRequest().body(Map.of("error", "The user body must not contains an id"));

		Map<String, String> errorMap = new HashMap<>();

		if (user.getName() == null || user.getName().length() == 0)
			errorMap.put("Arg error name", "Name must not be null or empty");
		if (user.getEmail() == null || user.getEmail().length() == 0)
			errorMap.put("Arg error email", "Email must not be null or empty");
		if (user.getPassword() == null || user.getPassword().length() == 0)
			errorMap.put("Arg error password", "Password must not be null or empty");

		// returns an error map if issue on user object
		if (!errorMap.isEmpty())
			return ResponseEntity.badRequest().body(errorMap);

		// Check if the email has already been used
		if (userService.getEmailExist(user.getEmail()))
			return ResponseEntity.badRequest().body(Map.of("error", "The given email is already used"));

		// Create an hashed password
		PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		String hashedPassword = passwordEncoder.encode(user.getPassword());
		user.setPassword(hashedPassword);

		userService.save(user);

		return new ResponseEntity<>(Map.of("message", "User has been successfully created"), HttpStatus.CREATED);

	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody User user) {
		Map<String, String> errorMap = new HashMap<>();

		if (user.getEmail() == null || user.getEmail().length() == 0)
			errorMap.put("Arg error mail", "Invalid email");
		if (user.getPassword() == null || user.getPassword().length() == 0)
			errorMap.put("Arg error password", "Invalid password");

		if (!errorMap.isEmpty())
			return ResponseEntity.badRequest().body(errorMap);

		Optional<User> optionalUser = userService.getByEmail(user.getEmail());
		if (optionalUser.isEmpty())
			return new ResponseEntity<>(Map.of("error", "No user found with the specified email"),
					HttpStatus.NOT_FOUND);

		User fetchedUser = optionalUser.get();

		// Password check
		PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		boolean isPasswordValid = passwordEncoder.matches(user.getPassword(), fetchedUser.getPassword());

		if (isPasswordValid) {
			Long userId = fetchedUser.getId();
			String token = passwordEncoder.encode(userId.toString());
			Map<String, String> resMap = new HashMap<>();
			resMap.put("userId", userId.toString());
			resMap.put("token", token);
			return ResponseEntity.ok(resMap);
		}

		return new ResponseEntity<>(Map.of("error", "Incorrect password"), HttpStatus.UNAUTHORIZED);

	}

	@PutMapping("/{id}")
	public ResponseEntity<?> update(@PathVariable("id") Long id, @RequestBody User user) {
		if (id == null)
			return ResponseEntity.badRequest().body(Map.of("error", "The id parameter must not be null"));

		if (id != user.getId())
			return ResponseEntity.badRequest().body(Map.of("error", "The id parameter must match to the user id"));

		Map<String, String> errorMap = new HashMap<>();

		if (user.getId() == null)
			errorMap.put("Arg error id", "Id must not be null");
		if (user.getName() == null || user.getName().length() == 0)
			errorMap.put("Arg error name", "Name must not be null or empty");
		if (user.getEmail() == null || user.getEmail().length() == 0)
			errorMap.put("Arg error email", "Email must not be null or empty");
		if (user.getPassword() == null || user.getPassword().length() == 0)
			errorMap.put("Arg error password", "Password must not be null or empty");
		if (user.getAvatar() == null)
			errorMap.put("Arg error avatar", "Avatar must not be null");

		// returns an error map if issue on user object
		if (!errorMap.isEmpty())
			return ResponseEntity.badRequest().body(errorMap);

		Optional<User> optionalUser = userService.getById(id);

		if (optionalUser.isEmpty())
			return new ResponseEntity<>(Map.of("error", "No user found with the specified id"), HttpStatus.NOT_FOUND);

		// Check if the email has already been used
		if (userService.getEmailExist(user.getEmail()) && !user.getEmail().equals(optionalUser.get().getEmail()))
			return ResponseEntity.badRequest().body(Map.of("error", "The given email is already used"));

		// Create an hashed password
		PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		String hashedPassword = passwordEncoder.encode(user.getPassword());
		user.setPassword(hashedPassword);

		userService.save(user);

		return ResponseEntity.ok(Map.of("message", "User has been successfully updated"));
	}

	@PatchMapping("/{id}")
	public ResponseEntity<?> partialUpdate(@PathVariable("id") Long id, @RequestBody User user) {
		if (id == null)
			return ResponseEntity.badRequest().body(Map.of("error", "The id parameter must not be null"));

		if (user.getId() == null)
			return ResponseEntity.badRequest().body(Map.of("error", "The user id parameter must not be null"));

		if (id != user.getId())
			return ResponseEntity.badRequest().body(Map.of("error", "The id parameter must match to the user id"));

		Map<String, String> errorMap = new HashMap<>();

		if (user.getName() != null && user.getName().length() == 0)
			errorMap.put("Arg error name", "Name must not be null or empty");
		if (user.getEmail() != null && user.getEmail().length() == 0)
			errorMap.put("Arg error email", "Email must not be null or empty");
		if (user.getPassword() != null && user.getPassword().length() == 0)
			errorMap.put("Arg error password", "Password must not be null or empty");

		// returns an error map if issue on user object
		if (!errorMap.isEmpty())
			return ResponseEntity.badRequest().body(errorMap);

		Optional<User> optionalUser = userService.getById(id);

		if (optionalUser.isEmpty())
			return new ResponseEntity<>(Map.of("error", "No user found with the specified id"), HttpStatus.NOT_FOUND);

		User fetchedUser = optionalUser.get();

		if (user.getName() != null)
			fetchedUser.setName(user.getName());
		if (user.getEmail() != null && !user.getEmail().equals(fetchedUser.getEmail())) {
			// Check if the email has already been used
			if (userService.getEmailExist(user.getEmail()))
				return ResponseEntity.badRequest().body(Map.of("error", "The given email is already used"));

			fetchedUser.setEmail(user.getEmail());
		}
		if (user.getPassword() != null) {
			// Create an hashed password
			PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
			String hashedPassword = passwordEncoder.encode(user.getPassword());
			fetchedUser.setPassword(hashedPassword);
		}
		if (user.getAvatar() != null)
			fetchedUser.setAvatar(user.getAvatar());

		userService.save(fetchedUser);

		return ResponseEntity.ok(Map.of("message", "User has been successfully updated"));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> delete(@PathVariable("id") Long id) {
		if (id == null)
			return ResponseEntity.badRequest().body(Map.of("error", "The id parameter must not be null"));

		if (userService.getById(id).isEmpty())
			return new ResponseEntity<>(Map.of("error", "No user found with the specified id"), HttpStatus.NOT_FOUND);

		if (userService.delete(id))
			return ResponseEntity.ok(Map.of("message", "The user was successfully deleted"));

		return ResponseEntity.internalServerError()
				.body(Map.of("error", "An error occurred while attempting to delete the user"));

	}
}
