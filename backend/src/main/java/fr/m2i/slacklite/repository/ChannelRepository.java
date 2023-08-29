package fr.m2i.slacklite.repository;

import fr.m2i.slacklite.entity.Channel;
import fr.m2i.slacklite.interfaces.ChannelProjection;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ChannelRepository extends JpaRepository<Channel, Long> {

    public List<ChannelProjection> findAllBy();

    public Optional<ChannelProjection> findOneById(Long id);

    public Optional <ChannelProjection> findOneByDeletable(Boolean deletable);
}
