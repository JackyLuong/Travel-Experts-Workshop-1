/* Filters all the packages based on what the user typed in the search and dates tool*/
function filter(searchField, startDate, endDate, package)
{
    //Gets what the user typed in the search bar
    var search = document.getElementById(searchField);
    
    //Gets day that user wants to start
    var str = document.getElementById(startDate);

    //Gets day that user wants to end
    var end = document.getElementById(endDate);

    //Converts all text in the search bar to capital letters
    var filter = search.value.toUpperCase();

    //Get div that contains all the packages
    var div = document.getElementById(package);

    //Gets all package names
    var packageNames = div.getElementsByTagName("h1");

    //Gets all package dates
    var packageDates = div.getElementsByTagName("h2");

    //Gets all the packages that are displayed
    var packagesDisplayed = div.getElementsByTagName("div");

    for (i = 0; i< packageNames.length; i++)
    {
        //Converts packageNames variable to readable string
        var textValueOfNames = packageNames[i].textContent || packageNames[i].innerText;

        //Converts packageDate variable to readable string
        var textValueOfDate = packageDates[i].textContent || packageDates[i].innerText;

        //Filters out the packages based on what is written on the search bar and what they chose for their dates
        if((textValueOfNames.toUpperCase().indexOf(filter) > -1 && textValueOfDate.toString() == (str.value + " - " + end.value).toString())
            || (textValueOfNames.toUpperCase().indexOf(filter) > -1 && (str.value + " - " + end.value).toString() == " - "))
        {
            packagesDisplayed[i].style.display = "block";
        }
        else
        {
            packagesDisplayed[i].style.display = "none";
        };
    };
};
