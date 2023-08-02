package fr.goupe3.slacklite.service;

import fr.goupe3.slacklite.entity.Channel;
import fr.goupe3.slacklite.repository.ChannelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.OptimisticLockingFailureException;
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

    public List<Channel> getAll() {
        return channelRepository.findAll();
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
