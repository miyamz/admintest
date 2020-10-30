package com.act5admin.Common;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMVCConfig implements WebMvcConfigurer {

    @Autowired
    protected CustomConfigRead custonConfig;
	
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
        List<String> URL_PATTERNS = Arrays.asList("/**");
		registry.addInterceptor(new HttpInterceptor())
			.addPathPatterns(URL_PATTERNS);
			//.excludePathPatterns("/제외패턴")
	}
	
	@Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler(
                "/images/**",
                "/css/**",
                "/fonts/**",
                "/js/**")
                .addResourceLocations(
                        "classpath:WEB_INF/common/images/",
                        "classpath:WEB_INF/common/css/",
                        "classpath:WEB_INF/common/fonts/",
                        "classpath:WEB_INF/common/js/");
    }

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addRedirectViewController("/", custonConfig.getIntroPage());
    }
}