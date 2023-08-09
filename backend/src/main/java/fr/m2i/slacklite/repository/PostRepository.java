package fr.m2i.slacklite.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import fr.m2i.slacklite.entity.Post;
import fr.m2i.slacklite.interfaces.PostProjection;

public interface PostRepository extends JpaRepository<Post, Long> {
    public List<PostProjection> findAllBy();

    public Optional<PostProjection> findOneById(Long id);
}
