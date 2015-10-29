///////////////////////////////////////////////////////////////////////////////
// Filter
// Constructs a filtering object to process content elements (divs with data-).
// 
// filters: class name of filtering elements on the page.
// contents: class name of the content elements on the page.
//
// TODO: add contents change function to enable filtering by dynamic contents.
///////////////////////////////////////////////////////////////////////////////
function Filter(filters, contents) {
	var othis = this;

	this.contents = $(contents);
	this.filters = $(filters);

	this.filterList = this.initFilterList();
	$(this.filters).each(function() { 
		t = othis.setFilterValue(this);
	});

	// Reset the filter counts, setup filter labels
	this.resetFilterCount();
	this.countAll();

	$(this.contents).each(function() { othis.setFilterCount(this) });
	this.updateFilterText();

	// Iterate through each filter in the list
	$(this.filters).each(function() {
		// Add a change handler and get the initial value
		$(this).change(function() {
			othis.resetFilterCount().setFilterValue(this).runFilter().updateFilterText();
		});
	});
}

///////////////////////////////////////////////////////////////////////////////
// getFilterType
// Gets the type of a control.
//
// Return: string
///////////////////////////////////////////////////////////////////////////////
Filter.prototype.getFilterType = function(filter) {
	var type = $(filter).prop('tagName').toLowerCase();

	if (type === "input") 
		type = $(filter).attr('type').toLowerCase();

	return type;
}

///////////////////////////////////////////////////////////////////////////////
// setFilterValue
// Adds a new value to the filter list.
//
// Return: this
///////////////////////////////////////////////////////////////////////////////
Filter.prototype.setFilterValue = function(filter) {
	var name = $(filter).attr('name');
	var type = this.filterList[name].type;
	var prop_value = this.filterList[name].value;

	switch (type) {
	case "checkbox":
		prop_value = [];

		$("input:checkbox[name=" + name + "]:checked").each(function() {
			prop_value.push($(this).val());
		});
		break;
	
	case "radio":
		var value = $("input:radio[name=" + name + "]:checked").val(); 
		prop_value = (value === "all") ? null : value;
		break;
	default:
		var value = $(filter).val();
		prop_value = (value === "all") ? null : value;
	}

	this.filterList[name].value = prop_value;
	return this;
}

///////////////////////////////////////////////////////////////////////////////
// initFilterList
// Initializes the filterList with the intitial value of the control. For 
// filters, a null or empty value indicates there is no filter in play.
///////////////////////////////////////////////////////////////////////////////
Filter.prototype.initFilterList = function() {
	var othis = this;
	var list = {};

	$(this.filters).each(function() {
		var name = $(this).attr("name");
		var type = othis.getFilterType(this);

		list[name] = {};
		list[name].type = type;
		list[name].value = (type === "checkbox") ? [] : null;
	});

	return list;
};

///////////////////////////////////////////////////////////////////////////////
// getContentData
// Gets a data- value from a content element.
//
// Return: string
///////////////////////////////////////////////////////////////////////////////
Filter.prototype.getContentData = function(content, name) {
	// Data- has hypens not underscors, but names are used in rails.
	var data = $(content).data(name.replace('_', '-'));

	if (typeof(data) === 'boolean') data = String(data);
	return data;
}

///////////////////////////////////////////////////////////////////////////////
// resetFilterCount
// Resets the counts of matching content elements for this filter value to 0.
// 
// Return: this
///////////////////////////////////////////////////////////////////////////////
Filter.prototype.resetFilterCount = function() {
	var filterThis = this;

	$(this.filters).each(function() {
		if (filterThis.getFilterType(this) === "select") {
			var name = $(this).attr("name");

			$('[name="' + name + '"] option').each(function() {
				$(this).data('count', 0);			
			});
		}
		else
			$(this).data('count', 0);
	});

	return this;
};

///////////////////////////////////////////////////////////////////////////////
// countAll
// Counts all contents, and uses that count for "all" values, because they
// never change.
///////////////////////////////////////////////////////////////////////////////
Filter.prototype.countAll = function() {
	var othis = this;

	$("[value=all]").each(function() {
		$(this).data('count', othis.contents.length);
	});
};

///////////////////////////////////////////////////////////////////////////////
// setFilterCount
// Updates the number of visible content elements having each filters value.
//
// Return: this
///////////////////////////////////////////////////////////////////////////////
Filter.prototype.setFilterCount = function(content) {
	if (!$(content).is(':visible')) return;

	var othis = this;

	$(this.filters).each(function() {
		var name = $(this).attr('name');
		var value = $(this).val().toLowerCase();
		var type = othis.getFilterType(this);
		var data = othis.getContentData(content, name).toLowerCase();
		var ctl = null;

		// If the filter is a select, get the option
		if (type === "select") {
			$('[name="' + name + '"] option').each(function() {
				value = $(this).val().toLowerCase();
				if (value !== "all" && value === data)
					$(this).data('count', Number($(this).data('count')) + 1); 
			});
		}
		else if (type === "radio") {
			if (value !== "all" && value === data)
				$(this).data('count', Number($(this).data('count')) + 1); 
		}
		else if (value !== "all" && value === data) {
			$(this).data('count', Number($(this).data('count')) + 1);
		}	
	});

	return this;
}

///////////////////////////////////////////////////////////////////////////////
// updateFilterText
// Updates the text associated with each control to reflect counts.
//
// Return: this
///////////////////////////////////////////////////////////////////////////////
Filter.prototype.updateFilterText = function () {
	var othis = this;

	$(this.filters).each(function() {
		var type = othis.getFilterType(this);
		var id = $(this).attr('id');

		var count;
		var text;

		if (type == "select") {
			$("#" + id + " option").each(function() {
				text = $(this).data('text');
				count = $(this).data('count');

				$(this).text(text + " (" + count + ")");
			});
		}
		else {
			text = $(this).data('text');
			count = $(this).data('count');

			$("#" + id + "-label").text(text + " (" + count + ")");
		}
	});

	return this;
}

///////////////////////////////////////////////////////////////////////////////
// checkboxMatch
// Matches the checkbox value to a data value. With checkboxes, we can have
// multiple values (for checkboxes with the same name) that are or-ed. 
// Implicitly when all checkboxes are unchecked with the same name it is 
// treated as "all", that is, all values of the checkbox group are considered
// checked.
// 
// Return: boolean
///////////////////////////////////////////////////////////////////////////////
Filter.prototype.checkboxMatch = function(value, data) {
	return value.length == 0 || $.inArray(data, value) > -1;
};

///////////////////////////////////////////////////////////////////////////////
// radioMatch
// Matches the radio value to a data value.
// 
// Return: boolean
///////////////////////////////////////////////////////////////////////////////
Filter.prototype.radioMatch = function(value, data) {
	if (value === null) return true;
	return value.toLowerCase() === data.toLowerCase();
};

///////////////////////////////////////////////////////////////////////////////
// selectMatch
// Matches the select value to a data value. With selects there is an
// "all" value that represents all options. Moreover, we wish to return the 
// option element that is matched. If no match, null is returned.
// 
// Return: object
///////////////////////////////////////////////////////////////////////////////
Filter.prototype.selectMatch = function(name, value, data) {
	if (value === null) return $('[name="' + name + '"] option[value="all"]');

	var option = null;

	name = name.replace('_', '-');
	value = value.toLowerCase();
	data = data.toLowerCase();

	if (value === data)
		option = $('[name="' + name + '"] option[value="' + data + '"]');

	return option;
};

///////////////////////////////////////////////////////////////////////////////
// runFilter
// Filter contents by data-name, where name is the name of the filter applied.
//
// Return: this
///////////////////////////////////////////////////////////////////////////////
Filter.prototype.runFilter = function() {
	var othis = this;

	// Reset the filter counts
	this.resetFilterCount();

	// For each content element, show only if ALL filters are satisfied.
	$(this.contents).each(function() {
		var show = true;

		for (var name in othis.filterList) {
			var value = othis.filterList[name].value;
			var type = othis.filterList[name].type;
			var data = othis.getContentData(this, name);

			switch(type) {
				case "checkbox":
					show = show && othis.checkboxMatch(value, data); break;
				case "select":
					show = show && othis.selectMatch(name, value, data); break;
				case "radio":
					show = show && othis.radioMatch(value, data); break;
				default:
					show = show && (!value || value === data);
			}

			if (!show) break;
		}

		show ? $(this).show() : $(this).hide();
		othis.countAll();
		othis.setFilterCount(this);
	});

	return this;
};
