package com.act5admin.Entity.UserDB;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.*;

import lombok.Data;

@Data
@Entity
@Table(name="account_info")
public class AccountInfoEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "account_key")
    private Long accountKey;
    @Column(name = "account_id", length = 55)
    private String accountId;
    @Column(name = "nick_name", length = 32)
    private String nickName;
    @Column(name = "guild_key")
    private Long guildKey;
    @Column(name = "market")
    private int market;
    @Column(name = "countrycd", length = 10)
    private String countrycd;
    @Column(name = "pub_store", length = 256)
    private String pubStore;
    @Column(name = "create_time")
    private Date createTime;
    @Column(name = "cents_add")
    private Long centsAdd;
    @Column(name = "cash_add")
    private Long cashAdd;
    @Column(name = "state")
    private int state;
    @Column(name = "state_update_time")
    private Date stateUpdateTime;

    public AccountInfoEntity() {}
    
    public String getCreateTimeStrFormat() {
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return df.format(this.createTime);
    }
}
