package fr.m2i.slacklite.repository;

import fr.m2i.slacklite.entity.Channel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChannelRepository extends JpaRepository<Channel, Long> {
}
