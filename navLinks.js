var links = ["http://localhost:8000/main.html", "http://localhost:8000/Contact.html", "http://localhost:8000/Registration.html"];
var dropDownImages = ["img/DropDownIcon.svg","img/DropDownIconHovered.svg"];
//Instantiates links to be used
function goToLinkInPage(index)
{
    location.href = links [index];
}
function changeDropDownIcon(index)
{
    document.getElementById("navMiniButtonIcon").src = dropDownImages[index];
}