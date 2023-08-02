package fr.goupe3.slacklite.controller;


import fr.goupe3.slacklite.entity.Channel;
import fr.goupe3.slacklite.service.ChannelService;
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

    //add user service

    @GetMapping("{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        Optional<Channel> optionalChannel = channelService.getById(id);

        if(optionalChannel.isEmpty()) {
            return new ResponseEntity<>(Map.of(
                    "error", "No Channel found with the specified id)"),
                    HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(optionalChannel.get());
    }

    @GetMapping("")
    public ResponseEntity<List<Channel>> getAll() {
        return ResponseEntity.ok(channelService.getAll());
    }


    @PostMapping("")
    public ResponseEntity<?> create(@RequestBody Channel channel) {

        if(channel.getId() != null) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("error", "The channel body must not contains an id"));
        }


        if(channel.getName() == null ||
                channel.getUser() == null ||
                channel.getUser().getId() == null ||
                channel.getDeletable() == null ||
                channel.getColor() == null) {

            Map<String, String> errorMap = new HashMap<>();
            if(channel.getName() == null) errorMap.put("Arg error", "Name must not be null");
            if(channel.getUser() == null) errorMap.put("Arg error", "User must not be null");
            if(channel.getUser().getId() == null) errorMap.put("Arg error", "User's id must not be null");
            if(channel.getDeletable() == null) errorMap.put("Arr error", "Deletable option must not be null");
            if(channel.getColor() == null) errorMap.put("Arr error", "Color option must not be null");
            //add user check here

            return new ResponseEntity<>(errorMap, HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(channelService.save(channel), HttpStatus.CREATED);
    }


    @PutMapping("{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Channel channel) {

        if(channel.getId() != id) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("error", "The path variable id must match with channel within body"));
        }

        if(channel.getId() == null ||
                channel.getName() == null ||
                channel.getUser() == null ||
                channel.getUser().getId() == null ||
                channel.getDeletable() == null ||
                channel.getColor() == null) {

            Map<String, String> errorMap = new HashMap<>();
            if(channel.getId() == null) errorMap.put("Arg error", "Channel post id must not be null");
            if(channel.getName() == null) errorMap.put("Arg error", "Name must not be null");
            if(channel.getUser() == null) errorMap.put("Arg error", "User must not be null");
            if(channel.getUser().getId() == null) errorMap.put("Arg error", "User's id must not be null");
            if(channel.getDeletable() == null) errorMap.put("Arr error", "Deletable option must not be null");
            if(channel.getColor() == null) errorMap.put("Arr error", "Color option must not be null");
            //add user check here

            return new ResponseEntity<>(errorMap, HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(channelService.save(channel), HttpStatus.OK);
    }

    @PatchMapping("{id}")
    public ResponseEntity<?> partialUpdate(@PathVariable Long id, @RequestBody Channel channel) {

        if(id != channel.getId()) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("error", "The path variable id must match with channel within body"));
        }

        if(channel.getId() == null ||
            channel.getUser().getId() == null) {

            Map<String, String> errorMap = new HashMap<>();
            if(channel.getUser() == null) errorMap.put("Arg error", "User must not be null");
            if(channel.getUser().getId() == null) errorMap.put("Arg error", "User's id must not be null");

            return ResponseEntity.badRequest().body(errorMap);
        }

        Optional<Channel> optionalChannel = channelService.getById(id);

        if(optionalChannel.isEmpty()) {
            return new ResponseEntity<>(Map.of(
                    "error", "No Channel found with the specified id)"),
                    HttpStatus.NOT_FOUND);
        }

        Channel fetchedChannel = optionalChannel.get();

        if(channel.getUser() != null) fetchedChannel.setUser(channel.getUser());
        if(channel.getDeletable() !=null) fetchedChannel.setDeletable(channel.getDeletable());
        if(channel.getColor() != null) fetchedChannel.setColor(channel.getColor());
        if(channel.getName() != null) fetchedChannel.setName(channel.getName());

        return new ResponseEntity<>(channelService.save(fetchedChannel), HttpStatus.CREATED);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {

        if(id == null) return ResponseEntity.badRequest().body(Map.of("error", "The id parameter must not be null"));

        if(channelService.getById(id).isEmpty()) {
            return new ResponseEntity<>(Map.of(
                    "error", "No Channel found with the specified id)"),
                    HttpStatus.NOT_FOUND);
        }

        Boolean isDeleted = channelService.delete(id);

        if(!isDeleted) {
            return new ResponseEntity<>(Map.of(
                    "Delete error", "Channel has not been found and is not deleted"),
                    HttpStatus.NOT_FOUND);
        }

        return ResponseEntity.ok(Map.of("Delete success", "The Channel has been successfully been deleted"));
    }
}
