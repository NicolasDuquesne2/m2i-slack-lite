package fr.goupe3.slacklite.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import fr.goupe3.slacklite.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
	
	public Optional<User> findOneByEmail(String email); 
}
