package com.act5admin.Common;

import javax.sql.DataSource;

import com.zaxxer.hikari.HikariConfig;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(
    basePackages= "com.act5admin.Repository.UserDB",
    entityManagerFactoryRef= "userDBFactoryBean",
    transactionManagerRef= "userDBTransactionManager"
)
public class UserDBConfig extends HikariConfig {
    @Bean(name="userDBDataSource")
    @ConfigurationProperties(prefix="spring.userdb")
    public DataSource getDataSource()
    {
        return DataSourceBuilder.create().build();
    }

    @Bean(name="userDBFactoryBean")
    public LocalContainerEntityManagerFactoryBean getFactoryBean(EntityManagerFactoryBuilder builder) {
        return builder.dataSource(getDataSource()).packages("com.act5admin.Entity.UserDB").build();
    }

    @Bean(name = "userDBTransactionManager")
	PlatformTransactionManager getTransactionManager(EntityManagerFactoryBuilder builder)
	{
		return new JpaTransactionManager(getFactoryBean(builder).getObject());
	}
}
