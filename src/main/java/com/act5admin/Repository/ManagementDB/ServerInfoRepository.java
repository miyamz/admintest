package com.act5admin.Repository.ManagementDB;

import java.util.List;

import com.act5admin.Entity.ManagementDB.ServerInfoEntity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

@Repository
public interface ServerInfoRepository extends JpaRepository<ServerInfoEntity, Integer> {
    public List<ServerInfoEntity> findAll();
}
