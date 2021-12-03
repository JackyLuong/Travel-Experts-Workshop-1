var errorMessage = "";
var passwordShowing = false;
var countryShowing = false;

/* Checks the text field and checks if the field only has letter.
    There are other characters aside from letters, it'll reset the field
    and send out an error message.
    Uses: errorMessage variable*/
function checkTextBox(idName)
{
    var textInBox= document.getElementById(idName).value;
    console.log(textInBox);
    
    if(textInBox.length > 0 && textInBox.match(/^[a-zA-Z]+$/g) && textInBox.length != null) 
    {
        errorMessage = "";
        document.getElementById("message").innerHTML = errorMessage;
        validate();
    }
    else
    {
        errorMessage = "Invalid " + document.getElementById(idName).name;
        document.getElementById("message").innerHTML = errorMessage;
        document.getElementById("message").focus();
        return document.getElementById(idName).value = "";
    };
    validate();
};

/* Checks the text field and checks if the field is in the right phone format is: 123-123-1234.
    There are other characters aside from letters, it'll reset the field
    and send out an error message.
    uses: error Message variable*/
function checkPhone(idName)
{
    var textInBox= document.getElementById(idName).value;
    console.log(textInBox);
    
    if(textInBox.length > 0 && textInBox.match(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/) && textInBox.length != null) 
    {
        errorMessage = "";
        document.getElementById("message").innerHTML = errorMessage;
        validate();
    }
    else
    {
        errorMessage = "Invalid " + document.getElementById(idName).name;
        document.getElementById("message").innerHTML = errorMessage;
        document.getElementById("message").focus();
        return document.getElementById(idName).value = "";
    };
    validate();
};

/* Checks the text field and checks of the field only has matches the postal code format.
    There are other characters aside from letters, it'll reset the field
    and send out an error message.
    Uses: errorMessage variable*/
function checkPostal(idName)
{
    var textInBox= document.getElementById(idName).value;
    console.log(textInBox);

    if(textInBox.length > 0 && textInBox.match(/^[A-Z]\d[A-Z]\s?\d[A-Z]\d$/) && textInBox.length != null) 
    {
        errorMessage = "";
        document.getElementById("message").innerHTML = errorMessage;
        validate();
    }
    else
    {
        errorMessage = "Invalid " + document.getElementById(idName).name;
        document.getElementById("message").innerHTML = errorMessage;
        document.getElementById("message").focus();
        return document.getElementById(idName).value = "";
    };
    validate();
};

/* Compares the email that the customer has typed with all the emails in the database 
    to ensure that each account only has one email attached to it.*/
function checkEmailUniquness(idName, userArray)
{
    var currentEmail = document.getElementById(idName).value;
    var emailMismatched = 0;
    for(i = 0; i <userArray.length; i++)
    {
        if(userArray[i].custEmail != currentEmail)
        {
            emailMismatched ++;
        };
    };
    if(emailMismatched == userArray.length)
    {
        errorMessage = "";
        document.getElementById("message").innerHTML = errorMessage;
        validate();
    }
    else
    {
        errorMessage = "This email is already used.";
        document.getElementById("message").innerHTML = errorMessage;
        document.getElementById("message").focus();
        return document.getElementById(idName).value = "";
    };
    emailMismatched = 0;
    validate();
};

/* Checks input fields to 
    ensure that they are filled out.
    submit button is disabled till all fields are filled*/
function validate()
{
    var inputForm = document.getElementById("form");
    var inputs = inputForm.getElementsByTagName("input");
    var inputsFilled = 0;
    for(i = 0; i <inputs.length; i++)
    {
        if(inputs[i].value != null && inputs[i].value != "")
        {
            inputsFilled ++;
        };
    };
    if(inputsFilled == inputs.length && 
        document.getElementById("selectedCountry").innerHTML != "Select A Country")
    {
        document.getElementById("submitButton").disabled = false;

    }
    else
    {
        console.log(inputsFilled);
        document.getElementById("submitButton").disabled = true;
    };
    inputsFilled = 0;
};

/* Shows and hides password requirments */
function showPassReqirements(boolean)
{
    var passRequirements = document.getElementById("passRequirements");
    if(boolean == true)
    {
        passRequirements.style.visibility = "visible";
        passRequirements.style.height = "auto";
    } 
    else
    {
        passRequirements.style.visibility = "hidden";
        passRequirements.style.height = "0px";
    };
};
/* Converts input type password into input type text to show 
    what the user typed as their password.
    Uses: passwordShowing variable*/
function showPass(passwordId)
{
    if(passwordShowing == false)
    {
        document.getElementById(passwordId).type = "text";
        document.getElementById("passIcon").className = "fa fa-eye icon"
        passwordShowing = true;
    }
    else
    {
        document.getElementById(passwordId).type = "password";
        document.getElementById("passIcon").className = "fa fa-eye-slash icon"
        passwordShowing = false;
    };
};

/* Shows drop down of all the countries in the world for the user to select*/
function showCountries()
{
    if(countryShowing == false)
    {
        document.getElementById("selectedCountry").style.margin = "0px";
        document.getElementById("countryDropDown").style.display = "inline-block"
        countryShowing = true;
    }
    else
    {
        document.getElementById("countryDropDown").style.display = "none"
        countryShowing = false;
    };
};

/* Displays user selected country*/
function setFromDropDownField(selectedItem)
{
    document.getElementById("selectedCountry").innerHTML = document.getElementById(selectedItem.id).innerHTML;
    document.getElementById("countryId").value = document.getElementById(selectedItem.id).innerHTML;
    document.getElementById("countryDropDown").style.display = "none"
    countryShowing = false;
    validate();
};

/* Filters all the countries based on what the user typed in the search tool*/
function filter(searchField)
{
    var input = document.getElementById(searchField);
    var filter = input.value.toUpperCase();
    var div = document.getElementById("countryDropDown");
    var countries = div.getElementsByTagName("a");

    for (i = 0; i< countries.length; i++)
    {
        var textValue = countries[i].textContent || countries[i].innerText;
        if(textValue.toUpperCase().indexOf(filter) > -1)
        {
            countries[i].style.display = "block";
        }
        else
        {
            countries[i].style.display = "none";
        };
    };
};

/* Checks the email and password the user typed and compare it to the account that were store in the database
    It'll let the login if their information matches any user, otherwise they it'll display an error telling them
    their email or password is wrong.*/
function validateLogin(email, password, userArray)
{
    var currentEmail = document.getElementById(email).value;
    var currentPassword = document.getElementById(password).value;
    var noMatch  = 0;
    for(i = 0; i <userArray.length; i++)
    {
        if(userArray[i].custEmail == currentEmail && userArray[i].custPassword == currentPassword)
        {
            document.getElementById("form").submit();
            errorMessage = "";
            document.getElementById("message").innerHTML = errorMessage;
        }
        else
        {
            noMatch ++;
        };
    };
    if(noMatch == userArray.length)
    {
        errorMessage = "Incorrect email or password";
        document.getElementById("message").innerHTML = errorMessage;
    };
};
