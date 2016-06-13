// JQUERY: hide(), show(), append(), click(), remove(), attr(), each(), 
// parent(), hasClass(), prop(), change(), next(), focus(), keyup(),
// siblings(), removeClass(), addClass(), toggle(), on()

// JavaScript: document.getElementById(), document.getElementsByTagName()[],
// GlobalEventHandlers.onclick, console.log, ParentNode.children
// Element.querySelector, GlobalEventHandlers.onclick, GlobalEventHandlers.onchange,
// document.createElement, element.removeChild, appendChild, this.parentNode, 
// EventTarget.addEventListener, HTMLInputElement.value

/*--Key Reference--*/
// str.indexOf() https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf
// Regular Expressions https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions

/*--(1)--*/
// Use the filters-example.html file to guide your decision making
// Using progressive enhancement, your work should affect the index.html file.

/*--(2)--*/
// Only 10 students should be shown at a time
// Calculate # of pages needed and add the appropriate number of links to the bottom of the page
var studentList = document.getElementsByClassName('student-item');
var numberOfPages = Math.ceil(studentList.length / 10);
var pagination = "<div class='pagination'><ul>";

for (var p = 0; p < numberOfPages; p++)
{
	if (p === 0) {
		pagination += "<li>\n<a class='active' href='#'>" + (p + 1) + "</a>\n</li>";
	} else {
		pagination += "<li>\n<a href='#'>" + (p + 1) + "</a>\n</li>";
	}
}
pagination += "</ul></div>";
$(".page").append(pagination);

/*--(3)--*/
// Hide all but first 10 students when page loads
for (var i = 10; i < studentList.length; i++)
{
	$(studentList[i]).hide();
}

/*--(4)--*/
// When user clicks "2", students 11-20 are shown. When user clicks
// "3", students 21-30 are shown etc.
$(".pagination > ul > li > a").each(function () {
	$(this).click(function () {
		var activePage = document.getElementsByClassName("active");
		$(activePage).removeClass("active");
		$(this).addClass("active");
		var pageNumber = $(this).parent().index();
		getStudentList(pageNumber);
	});
});

var getStudentList = function (page) {
	var startingPoint = page * 10;
	$(studentList).hide();
	for (var k = startingPoint; k < (startingPoint + 10); k++)
	{
		$(studentList[k]).show();
	}
};

/*--(5)--*/
// Using progressive enhancement, add student search markup in filters-example.html to index.html
$(".page-header").append('<div class="student-search">\n<input placeholder="Search for students...">\n<button>Search</button>\n</div>');

/*--(6)--*/
// Add an event listener to the search button
	// When user clicks button it should use the text
	// in the search input to filter the results.
var searchInput = document.getElementsByTagName("input")[0];

var printSearchResults = function () {
	console.log(searchInput.value);
	$(studentList).hide();
};

var searchButton = document.getElementsByTagName("button")[0];
searchButton.addEventListener("click", printSearchResults);

/*--(7)--*/
// Users should be able to search by name or e-mail address 
// Partial matches, like just a first name, should be displayed in the results.

/*--(8)--*/
// Search results should also be paginated
// Eg. if the search returns more than 10 results, those results should be paginated too.

/*--(9)--*/
// Mke sure you can check off all of the items on the Student Project Submission Checklist. 
