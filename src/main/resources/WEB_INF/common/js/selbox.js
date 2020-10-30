function toggleSelbox(selbox) {
	if ($(selbox).attr("readonly") == "readonly") {
		$(selbox).removeAttr("readonly")
	}
	
	$(selbox).next("ul").toggle();
	return false;
}

function selboxRemove(selbox) {
	if ($(selbox).is(':visible') == true)
		$(selbox).hide();
}

function selectOption(optionTag) {
    $(optionTag).parent().parent().children("input").attr("tmp", $(optionTag).attr("name")).val($(optionTag).text())

    return false;
    //$(this).prependTo($(this).parent());
}

function selectValue(selbox) {
	return $(selbox).children("input").attr("tmp")
}

function selectText(selbox) {
	return $(selbox).children("input").val()
}

function hideList(textBox, event) {
	var ul = $(textBox).siblings("ul")
	
	if (ul.is(':visible') == false) {
		ul.toggle();
	}
	
	// 백스페이스 이벤트
	if ( event.which == 8 ) {
		if ($(textBox).val().length == 0) {
			for (var i =0 ; i < ul.children("li").length; i++) {
				ul.children("li:eq(" + i + ")").show()
			}
		} else {
			for (var i =0 ; i < ul.children("li").length; i++) {
				if (ul.children("li:eq(" + i + ")").text().indexOf($(textBox).val()) >= 0) {
					ul.children("li:eq(" + i + ")").show()
				}
			}
		}
	} 
	
	// 엔터  이벤트
	if ( event.which == 13 ) {
		if ($(textBox).val().length > 0) {
			var value = new Array()
			var isValid = false;
			for (var i =0 ; i < ul.children("li").length; i++) {
				if (ul.children("li:eq(" + i + ")").text().indexOf($(textBox).val()) >= 0) {
					value.push(ul.children("li:eq(" + i + ")").attr("name") + "|" + ul.children("li:eq(" + i + ")").text())
				}
				
				if (ul.children("li:eq(" + i + ")").text() == $(textBox).val()) {
					isValid = true;
				}
			}
			
			if (isValid == true && value.length > 0) {
				var tmp = value[0].split("|")
				$(textBox).attr("tmp", tmp[0]).val(tmp[1])
			}
			
			if (isValid == false) {
				$(textBox).attr("tmp", $(textBox).val())
			}
			
			$(textBox).attr("readonly", true)
		}
	}
	
	// 타이핑시 이벤트
	if ( event.which != 13 ) {
		if ($(textBox).val().length > 0) {
			for (var i =0 ; i < ul.children("li").length; i++) {
				if (ul.children("li:eq(" + i + ")").text().indexOf($(textBox).val()) < 0) {
					ul.children("li:eq(" + i + ")").hide()
				}
			}
		} 
	}
}

function changeValueCommit(textBox) {
	var ul = $(textBox).siblings("ul")
	
	for (var i =0 ; i < ul.children("li").length; i++) {
		if (ul.children("li:eq(" + i + ")").text().indexOf($(textBox).val()) >= 0) {
			// 처음에 일치하는거 찾으면 그값넣고 return
			$(textBox).attr("tmp", ul.children("li:eq(" + i + ")").attr("name"))
			return
		}
	}
}

function disableEnterEvent(textBox, event) {
	if ( event.which == 13 ) {
		hideList(textBox, event)
		event.preventDefault()
	}
}