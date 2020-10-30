package com.act5admin.Entity.ManagementDB;

import javax.persistence.*;

import lombok.Data;

@Data
@Entity
@Table(name="tb_manager_info")
public class ManagerInfoEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="idx")
    private Long idx;
    @Column(name="email", length=64)
    private String email;
    @Column(name="passwd", length=256)
    private String passwd;
    @Column(name="tel_number", length=32)
    private String telNumber;
    @Column(name="name", length=32)
    private String name;
    @Column(name="team", length=32, nullable=false)
    private String team;
    @Column(name="grade")
    private int grade;
    @Column(name="pw_findkey", length=20, nullable=false)
    private String pwFindKey;

    public ManagerInfoEntity() {}
}