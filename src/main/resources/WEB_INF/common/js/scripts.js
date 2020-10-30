formatString = function() {
	// The string containing the format items (e.g. "{0}")
	// will and always has to be the first argument.
	var theString = arguments[0];
	
	// start with the second argument (i = 1)
	for (var i = 1; i < arguments.length; i++) {
		// "gm" = RegEx options for Global search (more than one instance)
		// and for Multiline search
		var regEx = new RegExp("\\{" + (i - 1) + "\\}", "gm");
		theString = theString.replace(regEx, arguments[i]);
	}
	
	return theString;
}

orderSort = function(a, b) {
	if (typeof a.order == "string")
		a.order = Number(a.order)
	if (typeof b.order == "string")
		b.order = Number(b.order)
		
	if (a.order == b.order) {
		return 0;
	}
	return a.order > b.order ? 1 : -1;
}

getBaseURL = function() {
	return $("#baseURL").val()
}

function setCookie(c_name, value, exdays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
	document.cookie = c_name + "=" + c_value;
}

function getCookie(c_name)
{
	var i, x, y, ARRcookies = document.cookie.split(";");
	for (i = 0; i < ARRcookies.length; i++)
	{
		x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
		y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
		x = x.replace(/^\s+|\s+$/g, "");
		if (x == c_name)
		{
			return unescape(y);
		}
	}
}

function deleteCookie(c_name) {
	document.cookie = c_name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
}
/*!
 * Start Bootstrap - SB Admin v6.0.0 (https://startbootstrap.com/templates/sb-admin)
 * Copyright 2013-2020 Start Bootstrap
 * Licensed under MIT (https://github.com/BlackrockDigital/startbootstrap-sb-admin/blob/master/LICENSE)
 */

// 값이 숫자일때 3자리마다 ','찍을수있는 함수
function number(value) {
	return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

$(function() {
	// Add active state to sidbar nav links
	var path = window.location.href; // because the 'href' property of the DOM element is the absolute path
	$("#layoutSidenav_nav .sb-sidenav a.nav-link").each(function() {
		if (this.href === path) {
			$(this).addClass("active");
		}
	});

	// Toggle the side navigation
	$("#sidebarToggle").click(function(e) {
		e.preventDefault();
		$("body").toggleClass("sb-sidenav-toggled");
	});
});

var distColmnAreaCnt = 3;

function formRender(formId) {
	if ($("#menu_" + formId).is(":checked") == true) {
		var jsonData = {
				"id": formId
			}
			
		$.ajax({
			type: "POST",
			url: getBaseURL() + "get_apiform_data.do",
			data: JSON.stringify(jsonData),
			dataType: "json",
			contentType: "application/json; charset=UTF-8",
			success: function(data, status, xhr) {
				data.apiFormatJson = {}
				data.apiFormatJson.inputFormat = JSON.parse(data.apiIFormat).iFormat;
				data.apiFormatJson.outputFormat = JSON.parse(data.apiOFormat).oFormat;
				// 각 데이터 순번대로 나오도록 order로 정렬
				data.apiFormatJson.inputFormat.sort(orderSort);
				data.apiFormatJson.outputFormat.sort(orderSort);
				if (data.apiType == 0) {
					$("#api_contents").append(getListTypeFormTag(data));
					$('#dataTable_' + data.apiIdx).DataTable();
				}
				else if (data.apiType == 1 || data.apiType == 2 || data.apiType == 3) {
					$("#api_contents").append(getSingleTypeFormTag(data));
				} else {
					alert("타입에 맞는 폼이 없어서 그릴수 없습니다.")
					$("#menu_" + formId).prop("checked", false)
				}
				
				// datetime format 적용
				for (var i = 0; i < $("#inputdata_" + formId + " .dateCol").length; i++) {
					applyDateTimeFormatInputEvent($("#inputdata_" + formId + " .dateCol:eq(" + i + ")"))
					$("#inputdata_" + formId + " .dateCol:eq(" + i + ")").datetimepicker({
				        language: 'ko',
				        weekStart: 0,
				        todayBtn:  1,
						autoclose: 1,
						todayHighlight: 1,
						format: "yyyy-mm-dd hh:ii:ss"
					})
				}
			},
			error: function(request, status, error) {
				alert("비동기처리error: " + request.responseText);
			}
		})
	} else {
		if ($("#apiForm_" + formId).length > 0) {
			$("#apiForm_" + formId).remove()
		}
	}
}

function getCodeListData(formatData) {
	var jsonData = {"group_idx" : formatData.selboxCode}
	var selArea = $("<div></div>").attr("class", "selbox")
				.attr("name", formatData.colName)
	var selVal = $("<input></input>").attr("type", "text").attr("class", "custom-select custom-select-sm form-control form-control-sm inputCol").attr("onchange", "changeValueCommit(this)")
					.attr("onclick", "toggleSelbox(this)").attr("onkeyup", "hideList(this, event)").attr("name", "hijoSelBox").attr("placeholder", "원하는값을 입력후 'enter'키 누름 혹은 메뉴에서 선택하여 주세요.")
	var selToggle = $("<ul></ul>").attr("onmouseleave", "selboxRemove(this)")
	
	$.ajax({
		type: "POST",
		url: getBaseURL() + "get_code_list.do",
		data: JSON.stringify(jsonData),
		dataType: "json",
		contentType: "application/json; charset=UTF-8",
		async: false,
		success: function(data, status, xhr) {
			if (data.length > 0) {
				for (var i in data) {
					var option = $("<li></li>").attr("onclick", "selectOption(this)")
					option.attr("name", data[i].code_value)
					option.text(data[i].code_value + " - " + data[i].code_display_name)
					selToggle.append(option)
				}
				selArea.append(selVal).append(selToggle)
			}
		}
	})
	return selArea
}

function getSingleTypeFormTag(dataJson) {
	var formatData = {}
	formatData.iFormat = dataJson.apiFormatJson.inputFormat
	formatData.oFormat = dataJson.apiFormatJson.outputFormat
	
	var rootTag = $("<div></div>").attr("class", "card mb-4").attr("id", "apiForm_" + dataJson.apiIdx)
	var header = $("<div></div>").attr("class", "card-header")
	var body = $("<div></div>").attr("class", "card-body")
	
	// 헤더안에 들어가는 태그
	var icon1 = $("<i></i>").attr("class", "fa fa-columns mr-1")
	var icon2 = $("<i></i>").attr("class", "fa fa-times-circle close-btn")
	var link1 = $("<a></a>").attr("href", "javascript:checkedChange('" + dataJson.apiIdx + "')")
	var link2 = $("<a></a>").attr("class", "btn btn-formabotton").attr("href", "javascript:apiCall('" + dataJson.apiUrl + "' ,'" + dataJson.apiIdx + "' ,'" + dataJson.apiType + "')")
	if (dataJson.apiType == 0 || dataJson.apiType == 1)
	{
		link2 = link2.append("조회")
	} else if (dataJson.apiType == 2) {
		link2 = link2.append("입력")
	} else {
		link2 = link2.append("수정")
	}
	//var link3 = $("<a></a>").attr("class", "btn btn-formabotton btn_glist").attr("href", "javascript:alert('개발예정인 기능입니다.')")
	//link3 = link3.append("Excel")
	link1 = link1.append(icon2)
	
	// 바디 안에 들어가는 태그
	var inputTable = $("<table></table>").attr("class", "input-area").attr("id", "inputdata_" + dataJson.apiIdx)
	var inputHArea = $("<div></div>").attr("style", "display:none;").attr("id", "inputarea_" + dataJson.apiIdx)
	var outputTable = $("<table></table>").attr("class", "output-area").attr("id", "outputdata_" + dataJson.apiIdx)
	var resultLabel = $("<div></div>").attr("class", "result-label")
	var labelContent = $("<i></i>").attr("class", "fas fa-list-alt title-icon")
	
	//바디 태그부터 정리
	resultLabel = resultLabel.append(labelContent).append("결과 데이터")
	
	rowTag = $("<tr></tr>");
	viewCount = 0;
	for (var i = 0; i < formatData.iFormat.length; i++) {
		if (viewCount % distColmnAreaCnt == 0) {
			rowTag = $("<tr></tr>")
			rowTag.appendTo(inputTable)
		}
		
		if (formatData.iFormat[i].isView == 1) {
			var td = $("<td></td>")
			var inputForm = $("<input></input>").attr("class", "form-control form-control-sm form-control-inline inputCol")
							.attr("name", formatData.iFormat[i].colName)
			if (formatData.iFormat[i].colType == "int")
				inputForm = inputForm.attr("type", "number")
			else if (formatData.iFormat[i].colType == "datetime") {
				inputForm = inputForm.attr("type", "text").attr("maxlength", "19")
				if (inputForm.hasClass("dateCol") == false)
					inputForm.addClass("dateCol")
			}
			else if (formatData.iFormat[i].selboxCode != 0) {
				inputForm = getCodeListData(formatData.iFormat[i])
			}
			else
				inputForm = inputForm.attr("type", "text")
				
			if (formatData.iFormat[i].defaultValue.length > 0)
				inputForm = inputForm.attr("value", formatData.iFormat[i].defaultValue)
				
			if (formatData.iFormat[i].hasOwnProperty('desc') == true) {
				if (formatData.iFormat[i].desc.length > 0)
					inputForm.attr("placeholder", formatData.iFormat[i].desc)
			}
				
			var label = $("<label></label>").append(formatData.iFormat[i].displayName + " : ").append(inputForm)
			rowTag.append(td.append(label))
		} else {
			// 따로 히든 저장공간에 때려넣자..
			var inputH = $("<input></input>").attr("class", "inputCol").attr("name", formatData.iFormat[i].colName)
			inputH = inputH.attr("type", "hidden")
				
			if (formatData.iFormat[i].defaultValue.length > 0)
				inputH = inputH.attr("value", formatData.iFormat[i].defaultValue)
			inputHArea = inputHArea.append(inputH)
		}

		// 안보이는 컬럼때매 따로 카운팅
		if (formatData.iFormat[i].isView == 1)
			viewCount++;
	}
	
	rowTag = $("<tr></tr>");
	viewCount = 0;
	for (var i = 0; i < formatData.oFormat.length; i++) {
		if (viewCount % distColmnAreaCnt == 0) {
			rowTag = $("<tr></tr>")
			rowTag.appendTo(outputTable)
		}
		
		if (formatData.oFormat[i].isView == 1) {
			var td = $("<td></td>")
			var outputForm = $("<input></input>").attr("class", "form-control form-control-sm form-control-inline").attr("disabled", true)
							.attr("name", formatData.oFormat[i].colName).attr("type", "text")
			var label = $("<label></label>").append(formatData.oFormat[i].displayName + " : ").append(outputForm)
			rowTag.append(td.append(label))
		}

		// 안보이는 컬럼때매 따로 카운팅
		if (formatData.oFormat[i].isView == 1)
			viewCount++;
	}
	
	var line = $("<hr/>")
	var split_line = $("<hr/>").attr("style", "border-top:groove;")
	
	body = body.append(inputTable).append(inputHArea).append(split_line).append(resultLabel).append(line).append(outputTable)
	header = header.append(icon1).append(dataJson.apiTitle).append(link2)/*.append(link3)*/.append(link1)
	
	if (dataJson.apiType == 2) {
		// 입력창일때 파일 입력 버튼 추가
		var formImport = $("<form></form>").attr("id", "formTag_" + dataJson.apiIdx).attr("enctype", "multipart/form-data")
						.attr("style", "display:inline-block; margin-left:25px;").attr("method", "post")
		var upbtn = $("<a></a>").attr("class", "btn btn-formabotton").attr("href", "javascript:fileImportCallApi('formTag_" + dataJson.apiIdx + "', '" + dataJson.apiUrl + "')")
		upbtn.append("File입력")
		var formatDownBtn = $("<a></a>").attr("class", "btn btn-formabotton").attr("href", "javascript:excelDownLoadFormat('" + dataJson.apiUrl + "', 'apiForm_" + dataJson.apiIdx + "')")
		formatDownBtn.append("입력포맷받기")
		var fileTag = $("<input></input>").attr("type", "file").attr("name", "importfile")
		var urlTag = $("<input></input>").attr("type", "hidden").attr("name", "api").val(dataJson.apiUrl.replace("/", ""))
		formImport.append(fileTag).append(upbtn).append(formatDownBtn).append(urlTag)
		header = header.append(formImport)
	}
	
	rootTag.append(header).append(body)
	
	return rootTag
}

function fileImportCallApi(formId) {
	$("body").loading();
	if (confirm("엑셀에 있는 데이터가 모두 들어갑니다.\n실패가 있는 경우 어떤게 실패했는지 알려줍니다.\n확인 후 동작을 권장합니다. 지금 동작하시겠습니까?") == true) {
		var f = new FormData(document.getElementById(formId));
	    $.ajax({
	        url: getBaseURL() + "useexcel_apicall.do",
	        data: f,
	        processData: false,
	        contentType: false,
	        type: "POST",
	        async: false,
	        success: function(data){
	        	if (data.iscall == 0 || data.iscall == "0") {
	        		alert("api 호출 불가. 호출할수 없는 api이거나 파일이 잘못되었습니다.");
	        		$("body").loading("stop");
	        		return
	        	} 
	        	
	        	alert("총 수행: " + data.total + "건\n성공: " + data.success + "건\n실패: " + data.fail + "건\n실패 입력 정보:" + JSON.stringify(data.failParam))
	        	$("body").loading("stop");
	        },
	        error: function() {
				alert("업로드 처리 에러.. 담당자에게 문의해주세요.");
				$("body").loading("stop")
			}
	    })
	} else {
		$("body").loading("stop")
		return false;
	}
}

function getListTypeFormTag(dataJson) {
	var formatData = {}
	formatData.iFormat = dataJson.apiFormatJson.inputFormat
	formatData.oFormat = dataJson.apiFormatJson.outputFormat
	
	var rootTag = $("<div></div>").attr("class", "card mb-4").attr("id", "apiForm_" + dataJson.apiIdx)
	var header = $("<div></div>").attr("class", "card-header")
	var body = $("<div></div>").attr("class", "card-body")
	
	// 헤더안에 들어가는 태그
	var icon1 = $("<i></i>").attr("class", "fas fa-table mr-1")
	var icon2 = $("<i></i>").attr("class", "fa fa-times-circle close-btn")
	var link1 = $("<a></a>").attr("href", "javascript:checkedChange('" + dataJson.apiIdx + "')")
	var link2 = $("<a></a>").attr("class", "btn btn-formabotton").attr("href", "javascript:apiCall('" + dataJson.apiUrl + "' ,'" + dataJson.apiIdx + "' ,'" + dataJson.apiType + "')")
	if (dataJson.apiType == 0 || dataJson.apiType == 1)
	{
		link2 = link2.append("조회")
	} else if (dataJson.apiType == 2) {
		link2 = link2.append("입력")
	} else {
		link2 = link2.append("수정")
	}
	var link3 = $("<a></a>").attr("class", "btn btn-formabotton btn_glist").attr("href", "javascript:excelDownLoad('" + dataJson.apiUrl + "', '" + dataJson.apiTitle + "', 'apiForm_" + dataJson.apiIdx + "')")
	link3 = link3.append("ExcelDown")
	link1 = link1.append(icon2)
	
	// 바디 안에 들어가는 태그
	var inputTable = $("<table></table>").attr("class", "input-area").attr("id", "inputdata_" + dataJson.apiIdx)
	var inputHArea = $("<div></div>").attr("style", "display:none;").attr("id", "inputarea_" + dataJson.apiIdx)
	var resultLabel = $("<div></div>").attr("class", "result-label")
	var labelContent = $("<i></i>").attr("class", "fas fa-list-alt title-icon")
	
	//바디 태그부터 정리
	resultLabel = resultLabel.append(labelContent).append("결과 데이터")
	
	rowTag = $("<tr></tr>");
	viewCount = 0;
	for (var i = 0; i < formatData.iFormat.length; i++) {
		if (viewCount % distColmnAreaCnt == 0) {
			rowTag = $("<tr></tr>")
			rowTag.appendTo(inputTable)
		}
		
		if (formatData.iFormat[i].isView == 1) {
			var td = $("<td></td>")
			var inputForm = $("<input></input>").attr("class", "form-control form-control-sm form-control-inline inputCol")
							.attr("name", formatData.iFormat[i].colName)
			if (formatData.iFormat[i].colType == "int")
				inputForm = inputForm.attr("type", "number")
			else if (formatData.iFormat[i].colType == "datetime") {
				inputForm = inputForm.attr("type", "text").attr("maxlength", "19")
				if (inputForm.hasClass("dateCol") == false)
					inputForm.addClass("dateCol")
			}
			else if (formatData.iFormat[i].selboxCode != 0) {
				inputForm = getCodeListData(formatData.iFormat[i])
			}
			else
				inputForm = inputForm.attr("type", "text")
			
			if (formatData.iFormat[i].hasOwnProperty('desc') == true) {
				if (formatData.iFormat[i].desc.length > 0)
					inputForm.attr("placeholder", formatData.iFormat[i].desc)
			}
				
			var label = $("<label></label>").append(formatData.iFormat[i].displayName + " : ").append(inputForm)
			rowTag.append(td.append(label))
		} else {
			// 따로 히든 저장공간에 때려넣자..
			var inputH = $("<input></input>").attr("class", "inputCol").attr("name", formatData.iFormat[i].colName)
			inputH = inputH.attr("type", "hidden")
				
			if (formatData.iFormat[i].defaultValue.length > 0)
				inputH = inputH.attr("value", formatData.iFormat[i].defaultValue)
			inputHArea = inputHArea.append(inputH)
		}

		// 안보이는 컬럼때매 따로 카운팅
		if (formatData.iFormat[i].isView == 1)
			viewCount++;
	}

	// 리스트 결과를 뿌려줄때 컬럼 순서를 알기위해 히든태그로 포맷을 저장해놓는다.
	var hidden = $("<input></input>").attr("type", "hidden").attr("id", "hd_colList_" + dataJson.apiIdx).attr("value", JSON.stringify(formatData.oFormat))
	// 리스트 아웃풋은 좀 다르다.
	var outputTable = renderResultListType(dataJson.apiIdx, formatData.oFormat, [])
	
	var line = $("<hr/>")
	var split_line = $("<hr/>").attr("style", "border-top:groove;")
	
	body = body.append(inputTable).append(inputHArea).append(split_line).append(resultLabel).append(line).append(outputTable)
	header = header.append(icon1).append(dataJson.apiTitle).append(link2).append(link3).append(link1)
	
	rootTag.append(header).append(body).append(hidden)
	
	return rootTag
}

function excelDownLoad(apiUrl, apiTitle, formId) {
	$("body").loading()
	var formNum = formId.split("_")
	if (formNum.length < 1) {
		alert("잘못된 폼입니다.")
		return
	}
	var inputDatas = $("#" + formId + " #inputdata_" + formNum[1] + " .inputCol")
	var hiddenDatas = $("#" + formId + " #inputarea_" + formNum[1] + " .inputCol")
	var jsonData = {}
	var tempInput = {}
	var tempOutput = {}
	
	for (var i = 0; i < inputDatas.length; i++) {
		var tag = $("#" + formId + " #inputdata_" + formNum[1] + " .inputCol:eq(" + i + ")")
		var key = tag.attr("name")
		var value = ""
		if (key == "hijoSelBox") {
			key = tag.parent(".selbox").attr("name")
			value = tag.attr("tmp") == undefined ? "" : tag.attr("tmp")
		}
		else
			value = tag.val()
			
		
		tempInput['' + key] = value;
	}
	
	for (var i = 0; i < hiddenDatas.length; i++) {
		var tag = $("#" + formId + " #inputarea_" + formNum[1] + " .inputCol:eq(" + i + ")")
		var key = tag.attr("name")
		var value = tag.val()
		
		tempInput['' + key] = value;
	}
	
	jsonData['targetUrl'] = apiUrl
	jsonData['inputParams'] = JSON.stringify(tempInput)
	
	var $preparingFileModal = $("#preparing-file-modal");
	$preparingFileModal.dialog({ modal: true });
	$("#progressbar").progressbar({value: false});
	$.fileDownload(getBaseURL() + "excel_down.do", {
		httpMethod: "POST",
		data: jsonData,
		successCallback : function() {
			$("body").loading("stop")
			$preparingFileModal.dialog('close');
		},
		failCallback: function() {
			$("body").loading("stop")
			$preparingFileModal.dialog('close'); 
			$("#error-modal").dialog({ modal: true });
			alert("다운로드 불가능.. 담당자에게 문의하세요.")
		}, 
		abortCallback: function (url) { 
			$("body").loading("stop")
		},
		prepareCallback: function (url) {
			$("body").loading("stop")
		}
	});
	
	return false
}

function excelDownLoadFormat(apiUrl, formId) {
	$("body").loading()
	var formNum = formId.split("_")
	if (formNum.length < 1) {
		alert("잘못된 폼입니다.")
		return
	}

	var jsonData = {}
	jsonData['targetUrl'] = apiUrl
	
	var $preparingFileModal = $("#preparing-file-modal");
	$preparingFileModal.dialog({ modal: true });
	$("#progressbar").progressbar({value: false});
	$.fileDownload(getBaseURL() + "excel_down_inputformat.do", {
		httpMethod: "POST",
		data: jsonData,
		successCallback : function() {
			$("body").loading("stop")
			$preparingFileModal.dialog('close');
		},
		failCallback: function() {
			$("body").loading("stop")
			$preparingFileModal.dialog('close'); 
			$("#error-modal").dialog({ modal: true });
			alert("다운로드 불가능.. 담당자에게 문의하세요.")
		}, 
		abortCallback: function (url) { 
			$("body").loading("stop")
		},
		prepareCallback: function (url) {
			$("body").loading("stop")
		}
	});
	
	return false
}

function renderResultListType(formId, formatList, data) {
	// 리스트 아웃풋은 좀 다르다.
	var outputTable = $("<table></table>").attr("class", "table table-bordered").attr("id", "dataTable_" + formId).attr("width", "100%").attr("cellspacing", "0")
	var tbHead = $("<thead></thead>")
	var tbBody = $("<tbody></tbody>").attr("id", "resultListData_" + formId)
	
	// 테이블 헤더에 컬럼이름 넣기
	var htr = $("<tr></tr>")
	var colList = ""
	for (var i = 0; i < formatList.length; i++) {
		var th = $("<th></th>")
		th = th.append(formatList[i].displayName)
		if (formatList[i]["isView"] == 1) {
			htr = htr.append(th)
		}
		else {
			continue
		}
		if (colList.length != 0)
			colList = colList + ","
		colList = colList + formatList[i].colName
	}
	
	if (colList.length == 0) {
		alert('조회할 수 있는 컬럼이 없습니다.')
		return
	}
	
	// 데이터가 있으면 데이터도 첨부
	if (typeof data != "undefined" && data.length > 0) {
		for (var i= 0; i < data.length; i++) {
			var btr = $("<tr></tr>")
			for (var j = 0; j < formatList.length; j++) {
				var td = $("<td></td>")
				if ($.isNumeric(data[i][formatList[j]["colName"]]) == true) {
					if (data[i][formatList[j]["colName"]] >= Number.MAX_SAFE_INTEGER)
						td.append(BigInt(data[i][formatList[j]["colName"]]))
					else
						td.append(data[i][formatList[j]["colName"]])
				} else {
					td.append(data[i][formatList[j]["colName"]])
				}
				
				if (formatList[j]["isView"] == 1) {
					btr.append(td)
				}
			}
			tbBody.append(btr)
		}
	}
	outputTable = outputTable.append(tbHead.append(htr)).append(tbBody)

	return outputTable
}

function checkedChange(formId) {
	if ($("#menu_" + formId).is(":checked") == true) {
		$("#menu_" + formId).prop("checked", false)
	}
	else {
		$("#menu_" + formId).prop("checked", true)
	}
	formRender(formId);
}

function apiCall(url, formId, apiType) {
	$("body").loading()
	var inputDatas = $("#inputdata_" + formId + " .inputCol")
	var hiddenDatas = $("#inputarea_" + formId + " .inputCol")
	var jsonData = {}
	
	for (var i = 0; i < inputDatas.length; i++) {
		var tag = $("#inputdata_" + formId + " .inputCol:eq(" + i + ")")
		var key = tag.attr("name")
		var value = ""
		if (key == "hijoSelBox") {
			key = tag.parent(".selbox").attr("name")
			value = tag.attr("tmp") == undefined ? "" : tag.attr("tmp")
		}
		else
			value = tag.val()
			
		
		jsonData['' + key] = value;
	}
	
	for (var i = 0; i < hiddenDatas.length; i++) {
		var tag = $("#inputarea_" + formId + " .inputCol:eq(" + i + ")")
		var key = tag.attr("name")
		var value = tag.val()
		
		jsonData['' + key] = value;
	}
	
	var sendData = {}
	sendData["url"] = url
	sendData["sendParam"] = JSON.stringify(jsonData)
	
	$.ajax({
		type: "POST",
		url: getBaseURL() + "apiServerCall.do",
		data: JSON.stringify(sendData),
		dataType: "json",
		contentType: "application/json; charset=UTF-8",
		success: function(data, status, xhr) {
			if (data.result == false) {
				alert("실패 - " + data.msg)
				$("body").loading("stop")
				return
			}
			if (data.length == 0) {
				alert("조회된 데이터가 없습니다.")
				$("body").loading("stop")
				return
			}
			
			var returnData = JSON.parse(data.value);
			
			if (Array.isArray(returnData) == false) {
				alert("데이터 형식이 잘못되었습니다.")
				$("body").loading("stop")
				return
			}
			
			resultRender(returnData, formId, apiType)
			$("body").loading("stop")
		},
		error: function(request, status, error) {
			alert("비동기처리error: " + request.responseText);
			$("body").loading("stop")
		}
	});
}

function resultRender(data, formId, apiType) {
	if (typeof apiType == "string") {
		apiType = Number(apiType)
	}
	
	if (apiType == 0) {
		// 기존 list를 지우고 새로 그려야한다..
		$("#dataTable_" + formId + "_wrapper").remove()
		var colListStr = $("#hd_colList_" + formId).val();
		var colListJson = JSON.parse(colListStr)
		
		var outputTable = renderResultListType(formId, colListJson, data)
		
		$("#apiForm_" + formId + " .result-label").after(outputTable)
		
		if ($("#dataTable_" + formId).length == 1)
			$("#dataTable_" + formId).DataTable()
	} else {
		if (apiType == 1) {
			// 조회
			for (var k in data[0]) {
				if ($.isNumeric(data[0][k]) == true) {
					if (data[0][k] >= Number.MAX_SAFE_INTEGER)
						$("#outputdata_" + formId + " input[name=" + k + "]").val(BigInt(data[0][k]))
					else
						$("#outputdata_" + formId + " input[name=" + k + "]").val(data[0][k])
				} else {
					$("#outputdata_" + formId + " input[name=" + k + "]").val(data[0][k])
				}
			}
		} else if (apiType == 2 || apiType == 3) {
			// 입력
			alert("성공")
			$("#apiForm_" + formId + " .output-area input[name=ret]").val("성공")
		} else {
			// 일단 예외처리로 result기반 성공실패 메세지, value 출력
		}
	}
}

function logout() {
	if (confirm("정말 로그아웃하시겠습니까?") == true) {
		$.ajax({
			type: "POST",
			url: getBaseURL() + "logout.do",
			dataType: "json",
			success: function(data, status, xhr) {
				if (data.logout == "1") {
					location.href = getBaseURL() + "login.do"
				}
			},
			error: function(request, status, error) {
				alert("비동기처리error: " + request.responseText);
			}
		});
	}
}