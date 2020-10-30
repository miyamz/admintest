package com.act5admin.Common;

import java.util.List;

import javax.annotation.PostConstruct;

import com.act5admin.Entity.ManagementDB.ServerInfoEntity;
import com.act5admin.Service.CacheService;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CommonCraft {
    private static final Logger log = LogManager.getLogger(CommonCraft.class);
	private static CommonCraft instance = new CommonCraft();
	private static int globalServerId = 0;
	private static String serverHostUrl = "";
    private static String serverName = "";
    private static final String sessionKey = "managerLogin";
    private static List<ServerInfoEntity> allServerList = null;

    @Autowired
    private CacheService cacheService;
	
	public static CommonCraft getInstance() {
		return instance;
    }
	
	public static int getServerId() {
		return globalServerId;
	}
	
	private static void setServerId(int serverID) {
		globalServerId = serverID;
	}
	
	public static String getServerHostUrl() {
		return serverHostUrl;
	}
	
	private static void setServerHostUrl(String hostUrl) {
		serverHostUrl = hostUrl;
	}
	
	public static String getServerName() {
		return serverName;
	}
	
	private static void setServerName(String server) {
		serverName = server;
    }
    
    public String getLoginSessionKey() {
        return CommonCraft.sessionKey;
    } 
	
	public <T> T getSessionObj(String sessionValue, Class<T> getClass) {
		T sessionObj = null;
		try {
			ObjectMapper objMapper = new ObjectMapper();
			sessionObj = objMapper.readValue(sessionValue, getClass);
			
		} catch (Exception ex) {
			StringBuilder sb = new StringBuilder();
			sb.append(String.format("%s \n", ex.getMessage()));
			sb.append(String.format("%s \n", ex.getStackTrace().toString()));
			log.error(sb.toString());
		}

		return sessionObj;
	}
    
	// 순서대로 의존성 주입이 일어난 후에 수행될 메서드에 다는 어노테이션(각자 빈이 의존성 주입이 완료된상태에서 자동실행되는 생성자같은? order도 줄수있음)
	@PostConstruct
	private void setAllServerList() throws Exception {
		CommonCraft.allServerList = cacheService.getServerList();
	}
	
	public List<ServerInfoEntity> getAllServerList() throws Exception {
		return CommonCraft.allServerList;
	}
}
