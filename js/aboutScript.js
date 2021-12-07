//Hides and shows more of a paragraph
function readMore(dotsId, moreId, buttonId)
{
    var dots = document.getElementById(dotsId);
    var moreText = document.getElementById(moreId);
    var btnText = document.getElementById(buttonId)
    
    //hide parts of the paragraph to shorten the div.
    if (dots.style.display === "none") 
    {
        dots.style.display = "inline";
        btnText.innerHTML = "Read more"; 
        moreText.style.display = "none";
    }
    //hides the dots
    else 
    {
        dots.style.display = "none";
        btnText.innerHTML = "Read less"; 
        moreText.style.display = "inline";
    }
}