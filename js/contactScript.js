var errorMessage = "";

/* Checks the text field and checks if the field only has letter.
    There are other characters aside from letters, it'll reset the field
    and send out an error message.
    Uses: errorMessage variable*/
function checkTextBox(idName)
{
    var textInBox= document.getElementById(idName).value;
    console.log(textInBox);
    
    //Checks the input fields to see if there are only letters
    if(textInBox.length > 0 && textInBox.match(/^[a-zA-Z]+$/g) && textInBox.length != null) 
    {
        errorMessage = "";
        document.getElementById("message").innerHTML = errorMessage;

        //checks if the field is filled
        validate();
    }
    else
    {
        errorMessage = "Invalid " + document.getElementById(idName).name;

        //sends error message
        document.getElementById("message").innerHTML = errorMessage;
        document.getElementById("message").focus();
        return document.getElementById(idName).value = "";
    };

    //checks if the field is filled
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
    
    //checks if the phone format matches 111-222-3333
    if(textInBox.length > 0 && textInBox.match(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/) && textInBox.length != null) 
    {
        errorMessage = "";
        document.getElementById("message").innerHTML = errorMessage;

        //checks if the field is filled
        validate();
    }
    else
    {
        //sends error message
        errorMessage = "Invalid " + document.getElementById(idName).name;
        document.getElementById("message").innerHTML = errorMessage;
        document.getElementById("message").focus();
        return document.getElementById(idName).value = "";
    };

    //checks if the field is filled
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
        
        //Checks all fields to see if they are filled
        for(i = 0; i <inputs.length; i++)
        {
            if(inputs[i].value != null && inputs[i].value != "")
            {
                inputsFilled ++;
            };
        };

        //Enable the submit button if all the fields are filled 
        if(inputsFilled == inputs.length && document.getElementById('concernId').value != ""
        && document.getElementById('concernId').value != null)
        {
            document.getElementById("submitButton").disabled = false;
    
        }
        //Disable the submit button if not all the fields are filled 
        else
        {
            document.getElementById("submitButton").disabled = true;
        };
        inputsFilled = 0;
    };