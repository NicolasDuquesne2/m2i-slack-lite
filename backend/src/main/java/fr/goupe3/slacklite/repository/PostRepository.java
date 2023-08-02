package fr.goupe3.slacklite.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import fr.goupe3.slacklite.entity.Post;

public interface PostRepository extends JpaRepository<Post, Long> {
    
}
