package fr.m2i.slacklite.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import fr.m2i.slacklite.entity.Post;
import fr.m2i.slacklite.interfaces.ChannelProjection;
import fr.m2i.slacklite.interfaces.PostProjection;
import fr.m2i.slacklite.service.ChannelService;
import fr.m2i.slacklite.service.PostService;
import fr.m2i.slacklite.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/posts")
public class PostController {

	@Autowired
	private PostService postService;

	@Autowired
	private UserService userService;

	@Autowired
	private ChannelService channelService;

	@GetMapping("{id}")
	public ResponseEntity<?> getById(@PathVariable Long id) {
		Optional<PostProjection> optionalPost = postService.getByIdPostProjection(id);

		if (optionalPost.isEmpty()) {
			return new ResponseEntity<>(Map.of("error", "No Post found with the specified id"), HttpStatus.NOT_FOUND);

		}
		return ResponseEntity.ok(optionalPost.get());

	}

	@GetMapping("")
	public ResponseEntity<List<PostProjection>> getAll() {
		return ResponseEntity.ok(postService.getAllPostProjection());
	}
	@GetMapping("channel/{id}")
	public ResponseEntity<?> getAllByChannelId(@PathVariable Long id) {

		Optional<ChannelProjection> optionalChannelProjection = channelService.getByIdChannelProjection(id);

		if (optionalChannelProjection.isEmpty()) {
			return new ResponseEntity<>(Map.of("error", "No channel found with the specified id"), HttpStatus.NOT_FOUND);
		}
		return ResponseEntity.ok(postService.getAllPostProjectionByChannelId(id));
	}

	@PostMapping("")
	public ResponseEntity<?> create(@RequestBody Post post) {

		if (post.getId() != null) {
			return ResponseEntity.badRequest().body(Map.of("error", "The post body must not contains an id)"));
		}

		// Post object tests

		Map<String, String> errorMap = new HashMap<>();

		// Post users
		if (post.getUser() == null) {
			errorMap.put("Arg error user", "User must not be null");
		} else if (post.getUser().getId() == null) {
			errorMap.put("Arg error user id", "User's id must not be null");
		} else if (userService.getById(post.getUser().getId()).isEmpty())
			errorMap.put("Arg error bad user", "Post user does not exists");

		// Post channels
		if (post.getChannel() == null) {
			errorMap.put("Arg error channel", "Channel must not be null");
		} else if (post.getChannel().getId() == null) {
			errorMap.put("Arg error channel id", "Channel's id must not be null");
		} else if (channelService.getById(post.getChannel().getId()).isEmpty())
			errorMap.put("Arg error bad channel", "Post channel does not exists");

		if (post.getText() == null || post.getText().length() == 0)
			errorMap.put("Arg error text", "Text must not be null or empty");

		// returns an error map if issue on post object
		if (!errorMap.isEmpty())
			return ResponseEntity.badRequest().body(errorMap);

		LocalDateTime createdDate = LocalDateTime.now();
		post.setCreatedDateTime(createdDate);
		post.setUpdatedDateTime(createdDate);

		postService.save(post);
		return new ResponseEntity<>(Map.of("message", "The Post has been successfully created"), HttpStatus.CREATED);
	}

	@PutMapping("/{id}")
	public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Post post) {
		if (id == null)
			return ResponseEntity.badRequest().body(Map.of("error", "The path variable must not be null"));
		if (post.getId() != id) {
			return ResponseEntity.badRequest().body(Map.of("error", "The post body must contains an id"));
		}

		// Post object tests

		Map<String, String> errorMap = new HashMap<>();

		// Post users
		if (post.getUser() == null) {
			errorMap.put("Arg error user", "User must not be null");
		} else if (post.getUser().getId() == null) {
			errorMap.put("Arg error user id", "User's id must not be null");
		} else if (userService.getById(post.getUser().getId()).isEmpty())
			errorMap.put("Arg error bad user", "Post user does not exists");

		// Post channels
		if (post.getChannel() == null) {
			errorMap.put("Arg error channel", "Channel must not be null");
		} else if (post.getChannel().getId() == null) {
			errorMap.put("Arg error channel id", "Channel's id must not be null");
		} else if (channelService.getById(post.getChannel().getId()).isEmpty())
			errorMap.put("Arg error bad channel", "Post channel does not exists");

		if (post.getText() == null || post.getText().length() == 0)
			errorMap.put("Arg error text", "Text must not be null or empty");

		// returns an error map if issue on post object
		if (!errorMap.isEmpty())
			return ResponseEntity.badRequest().body(errorMap);

		Optional<Post> optionalPost = postService.getById(id);
		if (optionalPost.isEmpty())
			return new ResponseEntity<>(Map.of("error", "No Post found with the specified id"), HttpStatus.NOT_FOUND);

		Post fetchedPost = optionalPost.get();
		post.setCreatedDateTime(fetchedPost.getCreatedDateTime());
		post.setUpdatedDateTime(LocalDateTime.now());
		postService.save(post);
		return new ResponseEntity<>(Map.of("message", "The Post has been successfully created"), HttpStatus.CREATED);
	}

	@PatchMapping("{id}")
	public ResponseEntity<?> partialUpdate(@PathVariable Long id, @RequestBody Post post) {
		if (id == null || post.getId() == null || id != post.getId()) {
			return ResponseEntity.badRequest()
					.body(Map.of("error", "The id parameter must not be null and must match the post's id"));
		}

		Map<String, String> errorMap = new HashMap<>();

		// Post users
		if (post.getUser() != null) {
			if (post.getUser().getId() == null) {
				errorMap.put("Arg error user id", "User's id must not be null");
			} else if (userService.getById(post.getUser().getId()).isEmpty()) {
				errorMap.put("Arg error bad user", "Post user does not exists");
			}				
		}

		// post channels
		if (post.getChannel() != null) {
			if (post.getChannel().getId() == null) {
				errorMap.put("Arg error channel id", "Channel's id must not be null");
			} else if (channelService.getById(post.getChannel().getId()).isEmpty()) {
				errorMap.put("Arg error bad channel", "Post channel does not exists");
			}
		}

		if (post.getText() != null && post.getText().length() == 0)
			errorMap.put("Arg error text", "Text must not be null or empty");

		// returns an error map if issue on post object
		if (!errorMap.isEmpty())
			return ResponseEntity.badRequest().body(errorMap);

		Optional<Post> optionalPost = postService.getById(id);
		if (optionalPost.isEmpty())
			return new ResponseEntity<>(Map.of("error", "No Post found with the specified id"), HttpStatus.NOT_FOUND);
		Post fetchedPost = optionalPost.get();

		fetchedPost.setUpdatedDateTime(LocalDateTime.now());

		if (post.getChannel() != null)
			fetchedPost.setChannel(post.getChannel());
		if (post.getUser() != null)
			fetchedPost.setUser(post.getUser());
		if (post.getText() != null)
			fetchedPost.setText(post.getText());

		postService.save(fetchedPost);

		return ResponseEntity.ok(Map.of("message", "The post has been successfully updated"));

	}

	@DeleteMapping("{id}")
	public ResponseEntity<?> delete(@PathVariable Long id) {
		if (id == null)
			return ResponseEntity.badRequest().body(Map.of("error", "The id parameter must not be null"));
		if (postService.getById(id).isEmpty())
			return new ResponseEntity<>(Map.of("error", "No post found with the specified id"), HttpStatus.NOT_FOUND);
		if (postService.delete(id))
			return ResponseEntity.ok(Map.of("message", "The post has been successfully been deleted"));
		return ResponseEntity.internalServerError()
				.body(Map.of("error", "An error occurred while attempting to delete the post"));

	}
}
