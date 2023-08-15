package fr.m2i.slacklite.controller;


import fr.m2i.slacklite.entity.Channel;
import fr.m2i.slacklite.interfaces.ChannelProjection;
import fr.m2i.slacklite.service.ChannelService;
import fr.m2i.slacklite.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("channels")
public class ChannelController {

    @Autowired
    ChannelService channelService;

    @Autowired
    UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        Optional<ChannelProjection> optionalChannel = channelService.getByIdChannelProjection(id);

        if(optionalChannel.isEmpty()) {
            return new ResponseEntity<>(Map.of(
                    "error", "No Channel found with the specified id)"),
                    HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(optionalChannel.get());
    }

    @GetMapping("")
    public ResponseEntity<List<ChannelProjection>> getAll() {
        return ResponseEntity.ok(channelService.getAllChannelProjection());
    }


    @PostMapping("")
    public ResponseEntity<?> create(@RequestBody Channel channel) {

        if(channel.getId() != null) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("error", "The channel body must not contains an id"));
        }

        //Channel object tests

        Map<String, String> errorMap = new HashMap<>();

        //channel users
        if(channel.getUser() == null) {
            errorMap.put("Arg error user", "User must not be null");
        } else if(channel.getUser().getId() == null) {
            errorMap.put("Arg error user id", "User's id must not be null");
        } else if(userService.getById(channel.getUser().getId()).isEmpty())
            errorMap.put("Arg error bad user", "Channel user does not exists");

        //channel its self
        if(channel.getName() == null || channel.getName().length() == 0)
            errorMap.put("Arg error name", "Text must not be null or empty");
        if(channel.getDeletable() == null)
            errorMap.put("Arg error deletable", "Deletable option must not be null");
        if(channel.getColor() == null)
            errorMap.put("Arg error color", "Color option must not be null");

        //returns an error map if issue on channel object
        if(!errorMap.isEmpty()) return new ResponseEntity<>(errorMap, HttpStatus.BAD_REQUEST);

        //channelService.save(channel);
        return new ResponseEntity<>(Map.of("message", "The Channel has been successfully created"), HttpStatus.CREATED);
    }


    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Channel channel) {

        if(id  == null) return ResponseEntity
                .badRequest()
                .body(Map.of("error", "The path variable must no be null"));

        if(channel.getId() != id) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("error", "The path variable id must match with channel within body"));
        }

        Optional<Channel> optionalChannel = channelService.getById(id);

        if(optionalChannel.isEmpty()) {
            return new ResponseEntity<>(Map.of(
                    "error", "No Channel found with the specified id)"),
                    HttpStatus.NOT_FOUND);
        }

        //Channel object tests

        Map<String, String> errorMap = new HashMap<>();

        //channel users
        if(channel.getUser() == null) {
            errorMap.put("Arg error user", "User must not be null");
        } else if(channel.getUser().getId() == null) {
            errorMap.put("Arg error user id", "User's id must not be null");
        } else if(userService.getById(channel.getUser().getId()).isEmpty())
            errorMap.put("Arg error bad user", "Channel user does not exists");

        //channel its self
        if(channel.getName() == null || channel.getName().length() == 0)
            errorMap.put("Arg error name", "Text must not be null or empty");
        if(channel.getDeletable() == null)
            errorMap.put("Arg error deletable", "Deletable option must not be null");
        if(channel.getColor() == null)
            errorMap.put("Arg error color", "Color option must not be null");

        //returns an error map if issue on channel object
        if(!errorMap.isEmpty()) return new ResponseEntity<>(errorMap, HttpStatus.BAD_REQUEST);

        channelService.save(channel);

        return ResponseEntity.ok(Map.of("message", "The Channel has been successfully updated"));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> partialUpdate(@PathVariable Long id, @RequestBody Channel channel) {

        if(id  == null)
            return ResponseEntity
                .badRequest()
                .body(Map.of("error", "The path variable must no be null"));


        if(id != channel.getId()) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("error", "The path variable id must match with channel within body"));
        }


        Map<String, String> errorMap = new HashMap<>();

        //channel users
        if(channel.getUser() != null) {
            if(channel.getUser().getId() == null) {
                errorMap.put("Arg error user id", "User's id must not be null");
            } else if(userService.getById(channel.getUser().getId()).isEmpty()) {
                errorMap.put("error", "No user found with the specified id");
            }
        }

        //Channel itself

        if(channel.getName() != null && channel.getName().length() == 0)
            errorMap.put("Arg error name", "Text must not be null or empty");

        //returns an error map if issue on channel object
        if(!errorMap.isEmpty()) return new ResponseEntity<>(errorMap, HttpStatus.BAD_REQUEST);

        Optional<Channel> optionalChannel = channelService.getById(id);
        Channel fetchedChannel = optionalChannel.get();

        if(channel.getUser() != null) fetchedChannel.setUser(channel.getUser());
        if(channel.getDeletable() !=null) fetchedChannel.setDeletable(channel.getDeletable());
        if(channel.getColor() != null) fetchedChannel.setColor(channel.getColor());
        if(channel.getName() != null) fetchedChannel.setName(channel.getName());

        //channelService.save(fetchedChannel);

        return ResponseEntity.ok(Map.of("message", "The Channel has been successfully updated"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {

        if(id == null) return ResponseEntity.badRequest().body(Map.of("error", "The id parameter must not be null"));

        if(channelService.getById(id).isEmpty()) {
            return new ResponseEntity<>(Map.of(
                    "error", "No Channel found with the specified id"),
                    HttpStatus.NOT_FOUND);
        }

        Boolean isDeleted = channelService.delete(id);

        if(!isDeleted) {
            return new ResponseEntity<>(Map.of(
                    "Delete error", "Channel has not been found and is not deleted"),
                    HttpStatus.NOT_FOUND);
        }

        return ResponseEntity.ok(Map.of("message", "The Channel has been successfully been deleted"));
    }
}
