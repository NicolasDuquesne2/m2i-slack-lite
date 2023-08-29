package fr.m2i.slacklite.service;

import fr.m2i.slacklite.entity.Channel;
import fr.m2i.slacklite.interfaces.ChannelProjection;
import fr.m2i.slacklite.repository.ChannelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ChannelService {

    @Autowired
    ChannelRepository channelRepository;

    public Optional<Channel> getById(Long id) {
        return channelRepository.findById(id);
    }

    public Optional<ChannelProjection> getByDeletableChannelProjection(Boolean deletable) {
        return  channelRepository.findOneByDeletable(deletable);
    }

    public Optional<ChannelProjection> getByIdChannelProjection(Long id) {
        return channelRepository.findOneById(id);
    }

    public List<Channel> getAll() {
        return channelRepository.findAll();
    }

    public List<ChannelProjection> getAllChannelProjection() {
        return channelRepository.findAllBy();
    }

    public Channel save(Channel channel) {
        return channelRepository.save(channel);
    }

    public Boolean delete(Long id) {
        try {
            channelRepository.deleteById(id);
            return !channelRepository.existsById(id);
        } catch ( IllegalArgumentException e) {
            return false;
        }
    }
}
