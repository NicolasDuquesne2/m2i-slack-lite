package fr.goupe3.slacklite.repository;

import fr.goupe3.slacklite.entity.Channel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChannelRepository extends JpaRepository<Channel, Long> {
}
