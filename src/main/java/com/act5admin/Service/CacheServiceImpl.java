package com.act5admin.Service;

import java.util.List;

import com.act5admin.Entity.ManagementDB.ServerInfoEntity;
import com.act5admin.Repository.ManagementDB.ServerInfoRepository;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.stereotype.Service;

@EnableCaching
@Service("cacheService")
public class CacheServiceImpl implements CacheService {
    private static final Logger log = LogManager.getLogger(CacheServiceImpl.class);

    @Autowired
    private ServerInfoRepository serverInfoRepo;

    @Cacheable(value="serverData")
    public List<ServerInfoEntity> getServerList() {
        return serverInfoRepo.findAll();
    }
}
