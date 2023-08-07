package fr.m2i.slacklite.service;

import java.util.List;
import java.util.Optional;

import fr.m2i.slacklite.entity.User;
import fr.m2i.slacklite.interfaces.UserProjection;
import fr.m2i.slacklite.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
	
	@Autowired
	UserRepository userRepository;
	
	public List<User> getAll() {
		return userRepository.findAll();
	}
	
	public Optional<User> getById(Long id) {
		return userRepository.findById(id);
	}
	
	public List<UserProjection> getAllUserProjection() {
		return userRepository.findAllBy();
	}
	
	public Optional<UserProjection> getByIdUserProjection(Long id) {
		return userRepository.findOneById(id);
	}
	
	public Optional<User> getByEmail(String email){
		return userRepository.findOneByEmail(email);
	}
	
	public Boolean getEmailExist(String email) {
		return userRepository.existsByEmail(email);
	}
	
	public User save(User user) {
		return userRepository.save(user);
	}
	
	public User update(User user) {
		return userRepository.save(user);
	}
	
	public User partialUpdate(User user) {
		return userRepository.save(user);
	}
	
	public Boolean delete(Long id) {
		try {
			userRepository.deleteById(id);
			return !userRepository.existsById(id);
		} catch (IllegalArgumentException e) {
			return false;
		}		
	}	
	
}
