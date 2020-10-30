package com.act5admin.Common;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

import lombok.Getter;
import lombok.Setter;

@Configuration
@PropertySource(value = "classpath:config/customset.yml", factory = YamlPropertySourceFactory.class)
@ConfigurationProperties(prefix = "customconfig")
@Getter
@Setter
public class CustomConfigRead {
    private String pageTitle;
    private String introPage;
}