package com.act5admin.Service;

import java.util.List;

import com.act5admin.Entity.ManagementDB.ServerInfoEntity;

public interface CacheService {
    public List<ServerInfoEntity> getServerList();
}
