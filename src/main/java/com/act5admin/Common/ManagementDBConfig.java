package com.act5admin.Common;

import javax.sql.DataSource;

import com.zaxxer.hikari.HikariConfig;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(
    basePackages= {"com.act5admin.Repository.ManagementDB"},
    entityManagerFactoryRef= "managementDBFactoryBean",
    transactionManagerRef= "managementDBTransactionManager"
)
public class ManagementDBConfig extends HikariConfig {
    @Primary
    @Bean(name="managementDBDataSource")
    @ConfigurationProperties(prefix="spring.managementdb")
    public DataSource getDataSource()
    {
        return DataSourceBuilder.create().build();
    }

    @Primary
    @Bean(name="managementDBFactoryBean")
    public LocalContainerEntityManagerFactoryBean getFactoryBean(EntityManagerFactoryBuilder builder) {
        return builder.dataSource(getDataSource()).packages("com.act5admin.Entity.ManagementDB").build();
    }

    @Primary
    @Bean(name = "managementDBTransactionManager")
	PlatformTransactionManager getTransactionManager(EntityManagerFactoryBuilder builder)
	{
		return new JpaTransactionManager(getFactoryBean(builder).getObject());
	}
}
