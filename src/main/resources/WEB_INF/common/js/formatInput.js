function applyDateTimeFormatInputEvent(domList) {
	for (var i = 0; i < domList.length; i++) {
		var dom = domList[i]
		
		dom.addEventListener('keypress', function () {
			event.preventDefault();
			var string = getString(event);
			var selectionStart = this.selectionStart;
			var selectionEnd = this.selectionEnd;
			var selectionLength = selectionEnd - selectionStart;
			var sanitizedString = string.replace(/[^0-9]+/g, '');
			// Do nothing if nothing is added after sanitization
			if (sanitizedString.length === 0) {
				return;
			}
			// Only paste numbers that will fit
			var valLength = this.value.replace(/[^0-9]+/g, '').length; // 숫자만 추리는 작업
			var availableSpace = 14 - valLength + selectionLength; // 앞에 14는 포맷에서 숫자만 추렸을때 총길이
			// If `/` is selected it should not count as available space
			if (selectionStart <= 4 && (selectionEnd >= 5 && selectionEnd < 7)) {
				availableSpace -= 1;
			}
			if (selectionStart <= 7 && (selectionEnd >= 8 && selectionEnd < 10)) {
				availableSpace -= 1;
			}
			if (selectionStart <= 10 && (selectionEnd >= 11 && selectionEnd < 13)) {
				availableSpace -= 1;
			}
			if (selectionStart <= 13 && (selectionEnd >= 14 && selectionEnd < 16)) {
				availableSpace -= 1;
			}
			if (selectionStart <= 16 && (selectionEnd >= 17 && selectionEnd <= 19)) {
				availableSpace -= 1;
			}
			// Remove numbers that don't fit
			if (sanitizedString.length > availableSpace) {
				sanitizedString = sanitizedString.substring(0, availableSpace);
			}
			var newCursorPosition = selectionEnd + sanitizedString.length
					- selectionLength;
			// Add one to cursor position if a `/` gets inserted
			if (selectionStart <= 4 && newCursorPosition >= 4) {
				newCursorPosition += 1;
			}
			if (selectionStart <= 7 && newCursorPosition >= 7) {
				newCursorPosition += 1;
			}
			if (selectionStart <= 10 && newCursorPosition >= 10) {
				newCursorPosition += 1;
			}
			if (selectionStart <= 13 && newCursorPosition >= 13) {
				newCursorPosition += 1;
			}
			if (selectionStart <= 16 && newCursorPosition >= 16) {
				newCursorPosition += 1;
			}
			// Previous input value before current cursor position
			var valueStart = this.value.substring(0, this.selectionStart);
			// Previous input value after current cursor position
			var valueEnd = dom.value.substring(this.selectionEnd, dom.value.length);
			var proposedValue = valueStart + sanitizedString + valueEnd;
			// Remove anything that's not a number
			var sanitized = proposedValue.replace(/[^0-9]+/g, '');
			format(sanitized, this);
			this.setSelectionRange(newCursorPosition, newCursorPosition);
		});
		
		dom.addEventListener('change', function (event) {

			event.preventDefault();
			var string = getString(event);
			var selectionStart = this.selectionStart;
			var selectionEnd = this.selectionEnd;
			var selectionLength = selectionEnd - selectionStart;
			var sanitizedString = string.replace(/[^0-9]+/g, '');
			// Do nothing if nothing is added after sanitization
			if (sanitizedString.length === 0) {
				return;
			}
			// Only paste numbers that will fit
			var valLength = this.value.replace(/[^0-9]+/g, '').length; // 숫자만 추리는 작업
			var availableSpace = 14 - valLength + selectionLength; // 앞에 14는 포맷에서 숫자만 추렸을때 총길이
			// If `/` is selected it should not count as available space
			if (selectionStart <= 4 && (selectionEnd >= 5 && selectionEnd < 7)) {
				availableSpace -= 1;
			}
			if (selectionStart <= 7 && (selectionEnd >= 8 && selectionEnd < 10)) {
				availableSpace -= 1;
			}
			if (selectionStart <= 10 && (selectionEnd >= 11 && selectionEnd < 13)) {
				availableSpace -= 1;
			}
			if (selectionStart <= 13 && (selectionEnd >= 14 && selectionEnd < 16)) {
				availableSpace -= 1;
			}
			if (selectionStart <= 16 && (selectionEnd >= 17 && selectionEnd <= 19)) {
				availableSpace -= 1;
			}
			// Remove numbers that don't fit
			if (sanitizedString.length > availableSpace) {
				sanitizedString = sanitizedString.substring(0, availableSpace);
			}
			var newCursorPosition = selectionEnd + sanitizedString.length
					- selectionLength;
			// Add one to cursor position if a `/` gets inserted
			if (selectionStart <= 4 && newCursorPosition >= 4) {
				newCursorPosition += 1;
			}
			if (selectionStart <= 7 && newCursorPosition >= 7) {
				newCursorPosition += 1;
			}
			if (selectionStart <= 10 && newCursorPosition >= 10) {
				newCursorPosition += 1;
			}
			if (selectionStart <= 13 && newCursorPosition >= 13) {
				newCursorPosition += 1;
			}
			if (selectionStart <= 16 && newCursorPosition >= 16) {
				newCursorPosition += 1;
			}
			// Previous input value before current cursor position
			var valueStart = this.value.substring(0, this.selectionStart);
			// Previous input value after current cursor position
			var valueEnd = dom.value.substring(this.selectionEnd, dom.value.length);
			var proposedValue = valueStart + sanitizedString + valueEnd;
			// Remove anything that's not a number
			var sanitized = proposedValue.replace(/[^0-9]+/g, '');
			format(sanitized, this);
			this.setSelectionRange(newCursorPosition, newCursorPosition);
		});
		
		dom.addEventListener('paste', function() {

			event.preventDefault();
			var string = getString(event);
			var selectionStart = this.selectionStart;
			var selectionEnd = this.selectionEnd;
			var selectionLength = selectionEnd - selectionStart;
			var sanitizedString = string.replace(/[^0-9]+/g, '');
			// Do nothing if nothing is added after sanitization
			if (sanitizedString.length === 0) {
				return;
			}
			// Only paste numbers that will fit
			var valLength = this.value.replace(/[^0-9]+/g, '').length; // 숫자만 추리는 작업
			var availableSpace = 14 - valLength + selectionLength; // 앞에 14는 포맷에서 숫자만 추렸을때 총길이
			// If `/` is selected it should not count as available space
			if (selectionStart <= 4 && (selectionEnd >= 5 && selectionEnd < 7)) {
				availableSpace -= 1;
			}
			if (selectionStart <= 7 && (selectionEnd >= 8 && selectionEnd < 10)) {
				availableSpace -= 1;
			}
			if (selectionStart <= 10 && (selectionEnd >= 11 && selectionEnd < 13)) {
				availableSpace -= 1;
			}
			if (selectionStart <= 13 && (selectionEnd >= 14 && selectionEnd < 16)) {
				availableSpace -= 1;
			}
			if (selectionStart <= 16 && (selectionEnd >= 17 && selectionEnd <= 19)) {
				availableSpace -= 1;
			}
			// Remove numbers that don't fit
			if (sanitizedString.length > availableSpace) {
				sanitizedString = sanitizedString.substring(0, availableSpace);
			}
			var newCursorPosition = selectionEnd + sanitizedString.length
					- selectionLength;
			// Add one to cursor position if a `/` gets inserted
			if (selectionStart <= 4 && newCursorPosition >= 4) {
				newCursorPosition += 1;
			}
			if (selectionStart <= 7 && newCursorPosition >= 7) {
				newCursorPosition += 1;
			}
			if (selectionStart <= 10 && newCursorPosition >= 10) {
				newCursorPosition += 1;
			}
			if (selectionStart <= 13 && newCursorPosition >= 13) {
				newCursorPosition += 1;
			}
			if (selectionStart <= 16 && newCursorPosition >= 16) {
				newCursorPosition += 1;
			}
			// Previous input value before current cursor position
			var valueStart = this.value.substring(0, this.selectionStart);
			// Previous input value after current cursor position
			var valueEnd = dom.value.substring(this.selectionEnd, dom.value.length);
			var proposedValue = valueStart + sanitizedString + valueEnd;
			// Remove anything that's not a number
			var sanitized = proposedValue.replace(/[^0-9]+/g, '');
			format(sanitized, this);
			this.setSelectionRange(newCursorPosition, newCursorPosition);
		});
		
		dom.addEventListener('keydown', function (event) {
			if (event.key === 'Backspace' || event.type === 'cut') {
				event.preventDefault();
				var selectionStart = this.selectionStart;
				var selectionEnd = this.selectionEnd;
				var selectionLength = selectionEnd - selectionStart;
				// If pressing backspace with no selected text
				if (selectionLength === 0 && event.type !== 'cut') {
					selectionStart -= 1;
					// Remove number from before `/` if attempting to delete `/`
					if (selectionStart === 4) {
						selectionStart -= 1;
					}
					if (selectionStart === 7) {
						selectionStart -= 1;
					}
					if (selectionStart === 10) {
						selectionStart -= 1;
					}
					if (selectionStart === 13) {
						selectionStart -= 1;
					}
					if (selectionStart === 16) {
						selectionStart -= 1;
					}
				}
				var valueStart = this.value.substring(0, selectionStart);
				var valueEnd = this.value.substring(selectionEnd, this.value.length);
				// Account for added `/`
				if (selectionStart === 4) {
					selectionStart += 1;
				}
				if (selectionStart === 7) {
					selectionStart += 1;
				}
				if (selectionStart === 10) {
					selectionStart += 1;
				}
				if (selectionStart === 13) {
					selectionStart += 1;
				}
				if (selectionStart === 16) {
					selectionStart += 1;
				}
				var proposedValue = valueStart + valueEnd;
				var sanitized = proposedValue.replace(/[^0-9]+/g, '');
				format(sanitized, this);
				this.setSelectionRange(selectionStart, selectionStart);
			}
		});
		
		dom.addEventListener('cut', function () {

			if (event.key === 'Backspace' || event.type === 'cut') {
				event.preventDefault();
				var selectionStart = this.selectionStart;
				var selectionEnd = this.selectionEnd;
				var selectionLength = selectionEnd - selectionStart;
				// If pressing backspace with no selected text
				if (selectionLength === 0 && event.type !== 'cut') {
					selectionStart -= 1;
					// Remove number from before `/` if attempting to delete `/`
					if (selectionStart === 4) {
						selectionStart -= 1;
					}
					if (selectionStart === 7) {
						selectionStart -= 1;
					}
					if (selectionStart === 10) {
						selectionStart -= 1;
					}
					if (selectionStart === 13) {
						selectionStart -= 1;
					}
					if (selectionStart === 16) {
						selectionStart -= 1;
					}
				}
				var valueStart = this.value.substring(0, selectionStart);
				var valueEnd = this.value.substring(selectionEnd, this.value.length);
				// Account for added `/`
				if (selectionStart === 4) {
					selectionStart += 1;
				}
				if (selectionStart === 7) {
					selectionStart += 1;
				}
				if (selectionStart === 10) {
					selectionStart += 1;
				}
				if (selectionStart === 13) {
					selectionStart += 1;
				}
				if (selectionStart === 16) {
					selectionStart += 1;
				}
				var proposedValue = valueStart + valueEnd;
				var sanitized = proposedValue.replace(/[^0-9]+/g, '');
				format(sanitized, this);
				this.setSelectionRange(selectionStart, selectionStart);
			}
		});
	
		function getString(event) {
			if (event.type === 'paste') {
				var clipboardData = event.clipboardData || window.clipboardData;
				return clipboardData.getData('Text');
			} else {
				return String.fromCharCode(event.which);
			}
		}
	
		function format(sanitized, d) {
			var newValue;
			var year = sanitized.substring(0, 4);
			var month = sanitized.substring(4, 6);
			var day = sanitized.substring(6, 8);
			var hour = sanitized.substring(8, 10);
			var min = sanitized.substring(10, 12);
			var sec = sanitized.substring(12, 14);
			if (sanitized.length <= 4) {
				newValue = year;
			}
			if (sanitized.length > 4 && sanitized.length <= 6) {
				newValue = year + '-' + month;
			}
			if (sanitized.length > 6 && sanitized.length <= 8) {
				newValue = year + '-' + month + '-' + day;
			}
			if (sanitized.length > 8 && sanitized.length <= 10) {
				newValue = year + '-' + month + '-' + day + ' ' + hour;
			}
			if (sanitized.length > 10 && sanitized.length <= 12) {
				newValue = year + '-' + month + '-' + day + ' ' + hour + ':' + min;
			}
			if (sanitized.length > 12 && sanitized.length <= 14) {
				newValue = year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec;
			}
			d.value = newValue;
		}
	}
}