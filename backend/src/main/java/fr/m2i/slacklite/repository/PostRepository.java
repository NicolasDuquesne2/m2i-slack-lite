package fr.m2i.slacklite.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import fr.m2i.slacklite.entity.Post;

public interface PostRepository extends JpaRepository<Post, Long> {
    
}
