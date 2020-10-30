package com.act5admin.Service;

import java.util.List;

import com.act5admin.Entity.ManagementDB.ManagerInfoEntity;
import com.act5admin.Entity.UserDB.AccountInfoEntity;

public interface IndexPageService {
    public ManagerInfoEntity findByIdx(Long idx);
    public AccountInfoEntity findByacKey(Long accountKey);
    public List<ManagerInfoEntity> getServerList();
}