package fr.goupe3.slacklite.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import fr.goupe3.slacklite.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

}
