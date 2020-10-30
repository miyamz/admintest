package com.act5admin.Controller;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.act5admin.Service.IndexPageService;
import org.springframework.web.bind.annotation.RequestParam;


@Controller
@EnableAutoConfiguration
public class IndexPageController extends BasedController {
    @Autowired
    private IndexPageService indexService;

    @RequestMapping(value = "/index.do", method = RequestMethod.GET)
    public ModelAndView GetIndexPage(/*HttpServletRequest request, HttpServletResponse response*/) throws Exception {
        ModelAndView mv = new ModelAndView("index");
        this.AddCommonObject(mv);

        return mv;
    }

    @RequestMapping(value="/login.do", method=RequestMethod.GET)
    public ModelAndView requestMethodName(/*HttpServletRequest request, HttpServletResponse response*/) throws Exception {
        ModelAndView mv = new ModelAndView("user/login");
        this.AddCommonObject(mv);

        return mv;
    }
    
}