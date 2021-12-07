var links = ["/Home", "/Contact", "/Login","/Vacation_Packages", "/Account","/About"];
var dropDownImages = ["DropDownIcon.svg","DropDownIconHovered.svg"];
var dropDownVisible = true;

//Instantiates links to be used.
function goToLinkInPage(index)
{
    location.href = links [index];
}
//Changes the dropdown icon to orange so i can be used in an onmouseover trigger.
function changeDropDownIcon(index)
{
    document.getElementById("navMiniButtonIcon").src = dropDownImages[index];
}

//Displays the drop down menu when called. If its already displayed, it will close the drop down menu when called.
function displayDropDown()
{
    var allDiv = document.querySelectorAll("div");
    //Opens the drop down menu.
    if(dropDownVisible == true && window.innerWidth <= 1000)
    {
        for(i = 0; i<allDiv.length; i++)
        {
            if(allDiv[i].id != "navMiniMenu" && allDiv[i].id != "banner")
            {
                allDiv[i].style.display = "none";
            }
        };
        document.getElementById("navMiniMenu").style.visibility = "visible";
        dropDownVisible = false;
    }
    //Closes the drop down menu.
    else
    {
        for(i = 0; i<allDiv.length; i++)
        {
            if(allDiv[i].id != "navMiniMenu" && allDiv[i].id != "banner")
            {
                allDiv[i].style.display = "";
            }
        };
        document.getElementById("navMiniMenu").style.visibility = "hidden";
        dropDownVisible = true;
    } 
}