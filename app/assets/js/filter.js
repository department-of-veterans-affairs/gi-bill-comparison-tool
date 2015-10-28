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
	var filterThis = this;

	this.filterList = {};

	this.contents = $(contents);
	this.filters = $(filters);

	// Reset the filter counts, setup filter labels
	this.resetFilterCount();

	$(this.filters).each(function() { filterThis.getFilterValue(this) });
	$(this.contents).each(function() { filterThis.filterCount(this) });
	this.updateFilterText();

	// Iterate through each filter in the list
	$(this.filters).each(function() {
		var name = $(this).attr("name");
		var type = filterThis.getFilterType(this, name);

		// Only need add control group once (checkbox group)
		if (!filterThis.filterList.hasOwnProperty(name))
			filterThis.filterList[name] = { ptype: type, pvalue: null };

		// Add a change handler and get the initial value
		$(this).change(function() {
			filterThis.resetFilterCount().getFilterValue(this).runFilter().updateFilterText();
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
// getFilterValue
// Constructs a value based on the type of filter control.
//
// Return: this
///////////////////////////////////////////////////////////////////////////////
Filter.prototype.getFilterValue = function(control) {
	var value = $(control).val();
	var name = $(control).attr('name');
	var prop = null;

	if (!(prop = this.filterList[name]))
		prop = { ptype: this.getFilterType(control), pvalue: null }

	switch (prop.ptype) {
	case "checkbox":
		prop.pvalue = prop.pvalue || [];

		var idx = $.inArray(value, prop.pvalue);
		var checked = $(control).prop("checked");

		// Add if not on the list and checked
		// Remive if on the list and not checked.
		if (idx == -1 && checked)
			prop.pvalue.push(value);
		else if (idx > -1 && !checked)
			prop.pvalue.splice(idx, 1);
		break;
	default:
		prop.pvalue = value;
	}

	this.filterList[name] = prop;
	return this;
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
	return !value || value.length == 0 || $.inArray(data, value) > -1;
};

///////////////////////////////////////////////////////////////////////////////
// radioMatch
// Matches the radio value to a data value.
// 
// Return: boolean
///////////////////////////////////////////////////////////////////////////////
Filter.prototype.radioMatch = function(value, data) {
	value = value.toLowerCase();
	data = data.toLowerCase(); 

	return !value || value === "all" || value === data;
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
	var option = null;

	name = name.replace('_', '-');
	value = value.toLowerCase();
	data = data.toLowerCase();

	if (value === "all")
		option = $('[name="' + name + '"] option[value="all"]');
	else if (value === data)
		option = $('[name="' + name + '"] option[value="' + data + '"]');

	return option;
};

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
// runFilter
// Filter contents by data-name, where name is the name of the filter applied.
//
// Return: this
///////////////////////////////////////////////////////////////////////////////
Filter.prototype.runFilter = function() {
	var filterThis = this;

	// Reset the filter counts
	this.resetFilterCount();

	// For each content element, show only if ALL filters are satisfied.
	$(this.contents).each(function() {
		var show = true;

		for (var name in filterThis.filterList) {
			var value = filterThis.filterList[name].pvalue;
			var type = filterThis.filterList[name].ptype;
			var data = filterThis.getContentData(this, name);

			switch(type) {
				case "checkbox":
					show = show && filterThis.checkboxMatch(value, data); break;
				case "select":
					show = show && filterThis.selectMatch(name, value, data); break;
				case "radio":
					show = show && filterThis.radioMatch(value, data); break;
				default:
					show = show && (!value || value === data);
			}

			if (!show) break;
		}

		show ? $(this).show() : $(this).hide();
		filterThis.filterCount(this);
	});

	return this;
};

///////////////////////////////////////////////////////////////////////////////
// filterCount
// Updates the number of visible content elements having each filters value.
//
// Return: this
///////////////////////////////////////////////////////////////////////////////
Filter.prototype.filterCount = function(content) {
	if (!$(content).is(':visible')) return;

	var filterThis = this;

	$(this.filters).each(function() {
		var name = $(this).attr('name');
		var value = $(this).val().toLowerCase();
		var type = filterThis.getFilterType(this);
		var data = filterThis.getContentData(content, name).toLowerCase();
		var ctl = null;

		// If the filter is a select, get the option
		if (type === "select") {
			$('[name="' + name + '"] option').each(function() {
				value = $(this).val().toLowerCase();

				if (value === "all" || value === data)
					$(this).data('count', Number($(this).data('count')) + 1);
			});
		}
		else if (type === "radio") {
			if (value === "all" || value === data)
				$(this).data('count', Number($(this).data('count')) + 1);
		}
		else if (value === data) {
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
	var filterThis = this;

	$(this.filters).each(function() {
		var type = filterThis.getFilterType(this);
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
