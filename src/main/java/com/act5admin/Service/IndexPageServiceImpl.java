package com.act5admin.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import com.act5admin.Entity.ManagementDB.ManagerInfoEntity;
import com.act5admin.Entity.UserDB.AccountInfoEntity;
import com.act5admin.Repository.ManagementDB.ManagerInfoRepository;
import com.act5admin.Repository.UserDB.AccountInfoRepository;

@Service("indexPageService")
public class IndexPageServiceImpl implements IndexPageService {

    @Autowired
    private ManagerInfoRepository managerInfoRepo;

    @Autowired
    private AccountInfoRepository accountInfoRepo;

    public ManagerInfoEntity findByIdx(Long idx) {
        ManagerInfoEntity ret = managerInfoRepo.findByIdx(idx);

        return ret;
    }

    public AccountInfoEntity findByacKey(Long accountKey) {
        List<AccountInfoEntity> ret = accountInfoRepo.findByAccountKey(accountKey);

        return ret.get(0);
    }

    public List<ManagerInfoEntity> getServerList() {
        return managerInfoRepo.findAll();
    }
}