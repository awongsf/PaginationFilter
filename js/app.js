/* THIS PROJECT WAS TESTED ON GOOGLE CHROME */

var studentList = document.getElementsByClassName('student-item');
var searchButton = document.getElementsByTagName("button")[0];
var searchInput = document.getElementsByTagName("input")[0];
var searchResults = [];
var noMatchesMsg = false;

// Append HTML markup for Search component
var appendSearch = function () {
	$(".page-header").append('<div class="student-search">\n<input placeholder="Search for students...">\n<button>Search</button>\n</div>');
}

// Create and append pagination markup for a given list to the bottom of the page.
// Determine the number of pages to create by dividing the list length
// by 10, and rounding up to the nearest integer.
var createPagination = function (list) {

	var numberOfPages = Math.ceil(list.length / 10);
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
};

// Hide all list items except the first 10
var showFirstTenOnly = function (list) {

	for (var i = 10; i < list.length; i++)
	{
		$(list[i]).hide();
	}
};

// When each page link is clicked, use getStudentList function
// to display the corresponding student list. Also, remove the 
// active class from the page link that is active, and add it to the
// page link that is clicked.
var createPageLinks = function (list) {

	$(".pagination > ul > li > a").each(function () {

		$(this).click(function () {

			var activePage = document.getElementsByClassName("active");
			var pageNumber = $(this).parent().index();

			$(activePage).removeClass("active");
			$(this).addClass("active");
			getStudentList(pageNumber, list);
		});
	});
};

// Show student list 
var getStudentList = function (page, list) {
	
	var startingPoint = page * 10;

	$(list).hide();

	for (var k = startingPoint; k < (startingPoint + 10); k++)
	{
		$(list[k]).fadeIn(['slow']);
	}
};

// Use the value of Search Input as a regular expression and
// test it against the name and email of each item in Student List.
// Show each list item that has a match in name or email.
// Add all matches to a new array and use that array to create
// a new pagination.
// If the Search Input does not match with anything, display
// a message to tell the user there are no matches.
var printSearchResults = function () {
	
	var searchFilter = new RegExp(searchInput.value, "i");

	$(studentList).hide();

	if (noMatchesMsg)
	{
		$(".page > h2").remove();
	}
	
	for (var i = 0; i < studentList.length; i++)
	{
		var name = searchFilter.test($(studentList[i].getElementsByTagName("h3")).text());
		var email = searchFilter.test($(studentList[i].getElementsByTagName("span")[0]).text());

		if (name === true || email === true)
		{
			$(studentList[i]).show();
		}
	}

	searchResults = $("li.student-item:visible").toArray();

	$(".pagination").remove();
	
	if (searchResults.length > 10)
	{
		createPagination(searchResults);
		showFirstTenOnly(searchResults);
		createPageLinks(searchResults);
	}

	if (searchResults.length === 0)
	{
		$(".page").append("<h2>Sorry, no matches found.</h2>");
		noMatchesMsg = true;
	}
};

appendSearch();

createPagination(studentList);
showFirstTenOnly(studentList);
createPageLinks(studentList);

searchButton.addEventListener("click", printSearchResults);
searchInput.addEventListener("keyup", printSearchResults);

