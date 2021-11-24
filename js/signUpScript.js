
var errorMessage = "";

/* Checks the text field and checks if the field only has letter.
    There are other characters aside from letters, it'll reset the field
    and send out an error message.*/
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
    }
    validate();
}

/* Checks the text field and checks if the field is in the right phone format is: 123-123-1234.
    There are other characters aside from letters, it'll reset the field
    and send out an error message.*/
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
    }
    validate();
}

//extends the confirm function and disables all the input boxes if the user chooses to confirm and reset the text fields
function userConfirm ()
{
    var reseting = confirm("do you want to reset?");
    if(reseting == true)
    {
        disableAll();
    }
    else
    {
        return reseting;
    }
}

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
        }
    }
    if(inputsFilled == inputs.length)
    {
        document.getElementById("submitButton").disabled = false;
    }
    else
    {
        document.getElementById("submitButton").disabled = true;
    }
    console.log(inputsFilled);
    inputsFilled = 0;
}
