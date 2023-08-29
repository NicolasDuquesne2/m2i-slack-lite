package fr.m2i.slacklite.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import fr.m2i.slacklite.entity.User;
import fr.m2i.slacklite.interfaces.UserProjection;

public interface UserRepository extends JpaRepository<User, Long> {
	
	public Optional<User> findOneByEmail(String email);
	
	public Boolean existsByEmail(String email);
	
	public List<UserProjection> findAllBy();
	
	public Optional<UserProjection> findOneById(Long id);

	public Optional<UserProjection> findOneByName(String name);
}
