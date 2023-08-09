package fr.m2i.slacklite.interfaces;

import java.time.LocalDateTime;

public interface PostProjection {
    Long getId();
    String getText();
    LocalDateTime getCreatedDateTime();
    LocalDateTime getUpdatedDateTime();
    public UserProjection getUser();
    public ChannelProjection getChannel();
}
