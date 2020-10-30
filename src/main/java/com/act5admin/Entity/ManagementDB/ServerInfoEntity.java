package com.act5admin.Entity.ManagementDB;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name="tb_api_server_info")
public class ServerInfoEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "idx")
    private int idx;
    @Column(name = "server_name", length = 32)
    private String serverName;
    @Column(name = "server_host_url", length = 128)
    private String serverHostURL;

    public ServerInfoEntity() {}
}
