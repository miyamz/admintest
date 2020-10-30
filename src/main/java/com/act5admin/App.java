package com.act5admin;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@SpringBootApplication
public class App 
{
    private static final Logger log = LogManager.getLogger(App.class);

    // yml파일을 여러개 사용하기 위한 설정 (다른 yml에 같은 설정이 있을시 나중것으로 override됨)
    static {
        System.setProperty("spring.config.location", "classpath:config/datasource.yml, classpath:application.yml");
    }

    public static void main( String[] args )
    {
        SpringApplication.run(App.class, args);
    }
}
