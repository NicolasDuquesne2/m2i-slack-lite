package fr.m2i.slacklite.interfaces;
import fr.m2i.slacklite.enums.ColorEnum;

public interface ChannelProjection {
    Long getId();
    String getName();
    Boolean getDeletable();
    public ColorEnum getColor();
    public UserProjection getUser();
}
