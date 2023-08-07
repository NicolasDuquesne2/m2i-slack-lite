package fr.m2i.slacklite.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import fr.m2i.slacklite.entity.Post;
import fr.m2i.slacklite.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/posts")
public class PostController {

    @Autowired
    private PostService postService;

    @GetMapping("{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        Optional<Post> optionalPost = postService.getById(id);

        if (optionalPost.isEmpty()) {
            return new ResponseEntity<>(Map.of("error", "No Post found with the specified id"), HttpStatus.NOT_FOUND);

        }
        return ResponseEntity.ok(optionalPost.get());

    }

    @GetMapping("")
    public ResponseEntity<List<Post>> getAll() {
        return ResponseEntity.ok(postService.getAll());
    }

    @PostMapping("")
    public ResponseEntity<?> create(@RequestBody Post post) {

        if (post.getId() != null) {
            return ResponseEntity.badRequest().body(Map.of("error", "The post body must not contains an id)"));

        }
        if (post.getChannel() == null ||
                post.getChannel().getId() == null ||
                post.getUser() == null ||
                post.getUser().getId() == null ||
                post.getText() == null) {
            Map<String, String> errorMap = new HashMap<>();
            if (post.getChannel() == null)
                errorMap.put("Arg error", "Channel must not be null");
            if (post.getUser() == null)
                errorMap.put("Arg error", "User must not be null");
            if (post.getText() == null)
                errorMap.put("Arg error", "Text must not be null");
            if (post.getChannel().getId() == null)
                errorMap.put("Arg error", "channel id must not be null");
            if (post.getUser().getId() == null)
                errorMap.put("Arg error", "user id must not be null");

            return ResponseEntity.badRequest().body(errorMap);
        }
        post.setCreatedDateTime(LocalDateTime.now());
        post.setUpdatedDateTime(LocalDateTime.now());
        return new ResponseEntity<>(postService.save(post), HttpStatus.CREATED);
    }

   
    @PatchMapping("{id}")
    public ResponseEntity<?> partialUpdate(@PathVariable Long id, @RequestBody Post post) {
        if (id == null || post.getId() == null || id != post.getId()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "The id parameter must not be null and must match the post's id"));
        }
        Optional<Post> optionalPost = postService.getById(id);
        if (optionalPost.isEmpty())
            return new ResponseEntity<>(Map.of("error", "No Post found with the specified id"), HttpStatus.NOT_FOUND);
        Post fetchedPost = optionalPost.get();

        fetchedPost.setUpdatedDateTime(LocalDateTime.now());

        if (post.getChannel() != null && post.getChannel().getId() != null)
            fetchedPost.setChannel(post.getChannel());
        if (post.getUser() != null && post.getUser().getId() != null)
            fetchedPost.setUser(post.getUser());
        if (post.getText() != null)
            fetchedPost.setText(post.getText());

        return new ResponseEntity<>(postService.save(fetchedPost), HttpStatus.CREATED);

    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        if (id == null)
            return ResponseEntity.badRequest().body(Map.of("error", " the id parameter must not be null"));
        if (postService.getById(id).isEmpty())
            return new ResponseEntity<>(Map.of("error", " no Post found with the specified id"), HttpStatus.NOT_FOUND);
        if (postService.delete(id))
            return ResponseEntity.ok(Map.of("message", " The Post has been successfully been deleted "));
        return ResponseEntity.internalServerError()
                .body(Map.of("error", " An error occurred while attempting to delete the post "));

    }
}
