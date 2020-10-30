package com.act5admin.Enum;

import java.util.ArrayList;
import java.util.List;

public enum PermissionCheckURL {
	LOGIN_URL("login.do", "logout.do", "regist.do", "modifyPass.do", "login", "logout", "regist", "modifyPass"),
	REGIST_URL("regist.do", "modifyPass.do", "resetRequest.do", "apiServerCall.do"),
	ERROR_URL("server_error.do", "noresource_error.do"),
	VIEWPAGE_URL("index.do", "get_apiform_data.do", "get_code_list.do", "excel_down.do", "useexcel_apicall.do", "excel_down_inputformat.do", "changeServer.do"),
	ADMIN_URL("apimanager.do", "apiedit.do", "apigroup_edit.do", "siteMembers.do", "memberEdit.do", "codeGroupView.do", "codeEdit.do");
	
	List<String> urls;
	
	private PermissionCheckURL(String... urls) {
		List<String> ret = new ArrayList<String>();
		for (String url : urls) {
			ret.add(url);
		}
		this.urls = ret;
	}
	
	public List<String> GetCheckUrlList() {
		return urls;
	}
}
