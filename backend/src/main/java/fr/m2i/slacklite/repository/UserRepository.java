package fr.m2i.slacklite.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import fr.m2i.slacklite.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
	
	public Optional<User> findOneByEmail(String email);
	
	public Boolean existsByEmail(String email);
}
