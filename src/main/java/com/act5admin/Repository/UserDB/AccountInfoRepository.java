package com.act5admin.Repository.UserDB;

import java.util.List;

import com.act5admin.Entity.UserDB.AccountInfoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountInfoRepository extends JpaRepository<AccountInfoEntity, Long>  {
    @Query("SELECT ac FROM AccountInfoEntity as ac WHERE ac.accountKey=:accountKey")
    public List<AccountInfoEntity> findByAccountKey(@Param("accountKey") Long accountKey);
}