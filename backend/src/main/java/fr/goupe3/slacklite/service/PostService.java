package fr.goupe3.slacklite.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import fr.goupe3.slacklite.entity.Post;
import fr.goupe3.slacklite.repository.PostRepository;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    public Optional<Post> getById(Long id) {
        return postRepository.findById(id);
    }

    public List<Post> getAll() {
        return postRepository.findAll();
    }

    public Post save(Post post) {
        return postRepository.save(post);
    }

    public boolean delete(Long id) {

        try {

            postRepository.deleteById(id);

            return !postRepository.existsById(id);

        } catch (IllegalArgumentException e) {

            return false;

        }

    }


}
