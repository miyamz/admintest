package com.act5admin.Common;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.act5admin.Entity.ManagementDB.ManagerInfoEntity;
import com.act5admin.Enum.PermissionCheckURL;
import com.act5admin.Enum.SiteAuthority;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
import org.springframework.web.util.WebUtils;

public class HttpInterceptor extends HandlerInterceptorAdapter {
    private static final Logger log = LogManager.getLogger(HttpInterceptor.class);

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		String url = request.getRequestURI();
		if(log.isInfoEnabled() == true) {
			log.info("====================================== Page Load Start ======================================");
			log.info("Request URI \t: " + url);
        }
        
		try {
			if (exceptCheckURL(url, SiteAuthority.ALL) == true) {
				return true;
			}
			
			CommonCraft craft = CommonCraft.getInstance();
			String sessionValue = (String)WebUtils.getSessionAttribute(request, craft.getLoginSessionKey());
			ManagerInfoEntity loginEntity = craft.getSessionObj(sessionValue, ManagerInfoEntity.class);
			
			if (loginEntity == null || loginEntity.getEmail() == null) {
				log.error("empty user session!! go to login page..");
				String redirectUrl = request.getContextPath() + "/login.do";
				response.sendRedirect(redirectUrl);
				return false;
			}
			else {
				if (exceptCheckURL(url, SiteAuthority.valueOf(loginEntity.getGrade())) == false) {
					// 권한 없음 페이지로 이동
					log.error("Unregistered url. Permission denied");
					String redirectUrl = request.getContextPath() + "/auth_error.do";
					response.sendRedirect(redirectUrl);
					return false;
				}
			}
				
			return super.preHandle(request, response, handler);
		} catch (Exception ex) {
			StringBuilder sb = new StringBuilder();
			sb.append(String.format("%s \n", ex.getMessage()));
			sb.append(String.format("%s \n", ex.getStackTrace().toString()));
			log.error(sb.toString());
			
			String redirectUrl = request.getContextPath() + "/server_error.do";
			response.sendRedirect(redirectUrl);
			return false;
		}

        // return true;
    }
	
	private boolean exceptCheckURL(String url, SiteAuthority auth) throws Exception {
		switch(auth) {
		case MANAGER:
			if (urlChecker(url, PermissionCheckURL.ADMIN_URL) == true)
				return true;
		case GAME_MASTER:
		case VIEWER:
		case GUEST:
			if (urlChecker(url, PermissionCheckURL.VIEWPAGE_URL) == true)
				return true;
		default:
			// auth가 없는 경우(로그인 안된 경우.. 세션이 날라간 경우...) 로그인 페이지와 가입페이지, 비밀번호 찾는페이지, 에러페이지는 보인다.
			if(urlChecker(url, PermissionCheckURL.LOGIN_URL) == true)
				return true;
			
			if(urlChecker(url, PermissionCheckURL.REGIST_URL) == true)
				return true;
			
			if(urlChecker(url, PermissionCheckURL.ERROR_URL) == true)
				return true;
		}
		return false;
	}
	
	private boolean urlChecker(String url, PermissionCheckURL urls) throws Exception {
		for (String checkUrl : urls.GetCheckUrlList()) {
			if (url.indexOf(checkUrl) > -1) {
				return true;
			}
		}
		
		return false;
	}

    @Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        if (log.isInfoEnabled() == true) {
            log.info("====================================== Page Load Complete ======================================");
        }
    }
}