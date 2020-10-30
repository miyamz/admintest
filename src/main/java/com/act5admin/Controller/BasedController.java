package com.act5admin.Controller;

import com.act5admin.Common.CommonCraft;
import com.act5admin.Common.CustomConfigRead;
import com.fasterxml.jackson.annotation.JsonCreator.Mode;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;

@Controller
@EnableAutoConfiguration
public abstract class BasedController {
    /***
     * 컨트롤러에서 url routing시 규칙을 정한다. view와 연결된 컨트롤러(ModelAndView를 리턴)는 끝에 .do형태로 끝나고
     * API형태 컨트롤러(Ajax호출이나 View를 연결하지않은 형태)는 끝에 아무런 확장자를 안붙인다.
     * root형태 routing url('/')은 쓰지말자.. (index.do와 연결할거다.)
     * 특별한 경우가 아니라면 request method별로 각각 구현한다.
     */
    protected static final Logger log = LogManager.getLogger(IndexPageController.class);

    @Autowired
    protected CustomConfigRead custonConfig;

    protected void AddCommonObject(ModelAndView mv) throws Exception {
        // 네비게이션바나 공통구역에 들어가는 오브젝트들 추가하는 함수 
        CommonCraft craft = CommonCraft.getInstance();

        mv.addObject("pageTitle", custonConfig.getPageTitle());
        mv.addObject("serverList", craft.getAllServerList());
    }
}
