package com.act5admin.Repository.ManagementDB;

import com.act5admin.Entity.ManagementDB.ManagerInfoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ManagerInfoRepository extends JpaRepository<ManagerInfoEntity, Long> {
    public ManagerInfoEntity findByIdx(Long idx);
}