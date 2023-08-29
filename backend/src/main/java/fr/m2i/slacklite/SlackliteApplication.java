package fr.m2i.slacklite;

import fr.m2i.slacklite.entity.Channel;
import fr.m2i.slacklite.entity.User;
import fr.m2i.slacklite.enums.ColorEnum;
import fr.m2i.slacklite.interfaces.ChannelProjection;
import fr.m2i.slacklite.interfaces.UserProjection;
import fr.m2i.slacklite.service.ChannelService;
import fr.m2i.slacklite.service.UserService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

@SpringBootApplication
public class SlackliteApplication {

	@Autowired
	UserService userService;

	@Autowired
	ChannelService channelService;

	public static void main(String[] args) {
		SpringApplication.run(SlackliteApplication.class, args);
	}


	@PostConstruct
	void init_accounts() {
		System.out.println("Data base auto loader : open");
		Optional<UserProjection> optionalUser =  userService.getByNameUserProjection("admin");

		if (optionalUser.isEmpty()) {
			User newUser = new User();
			newUser.setName("admin");
			PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
			String hashedPassword = passwordEncoder.encode("admin");
			newUser.setPassword(hashedPassword);
			newUser.setEmail("admin@domain.com");
			userService.save(newUser);
			System.out.println("New user added to Data base");
		}

		Optional<ChannelProjection> optionalChannel = channelService.getByDeletableChannelProjection(false);

		if(optionalChannel.isEmpty()) {
			Channel newChannel = new Channel();
			newChannel.setName("Général");
			newChannel.setColor(ColorEnum.WHITE);
			newChannel.setDeletable(false);
			newChannel.setUser(userService.getByEmail("admin@domain.com").get());
			channelService.save(newChannel);
			System.out.println("New channel added to data base");
		}

		System.out.println("Data base auto loader : close");
	}

}
