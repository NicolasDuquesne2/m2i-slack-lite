package fr.goupe3.slacklite.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.goupe3.slacklite.entity.User;
import fr.goupe3.slacklite.repository.UserRepository;

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
	
	public Optional<User> getByEmail(String email){
		return userRepository.findOneByEmail(email);
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
