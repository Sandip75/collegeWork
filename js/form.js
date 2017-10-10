$(document).ready(function(){
   preventSubmitEvents(); 
});

$("#submitBtn1").click(form1Submission());
$("#submitBtn2").click(form2Submission());

function preventSubmitEvents(){
    var form1 = document.getElementById("form1");
    var form2 = document.getElementById("form2");
    
    form1.addEventListener("submit",event => {
        event.preventDefault();
        form1Submission();
        console.log("form submission stopped");
    });
    
    form2.addEventListener("submit",event => {
        event.preventDefault();
        form2Submission();
        console.log("form submission stopped");
    });
}

function form2Submission(){
    var values = {};
    var i = 0;
    $inputs = $("#form2 :input");
    $inputs.each(function(){
        values[i] = $(this).val();
        i++;
    });
    
    if(values[0]!="")
        {
            $.ajax({
                    method: "POST",
                    url: "https://docs.google.com/forms/d/e/1FAIpQLSc7V-h2Vnxl6WK26teVHNCpgZTG07dWk20f71UupEtb9M3fcg/formResponse",
                    data: {
                        'entry.1087603262' : values[0],
                        'entry.1364015409' : values[1],
                        'entry.159024' : values[2]
                    }
                }).done(function (){
                    console.log("form2 data sent to sheet");
                });        
        }
    
    
}

function form1Submission(){
    var values = {};
    var i = 0;
    $inputs = $("#form1 :input");
    $inputs.each(function(){
        values[i] = $(this).val();
        i++;
    });
    
    if(values[0])
        {
            $.ajax({
                    method: "POST",
                    url: "https://docs.google.com/forms/d/e/1FAIpQLSeKz2h0OKZSzgaaL3Vcr3kAFMh7s4Lxes50rmcUXallgL38ug/formResponse",
                    data: {
                        'entry.1912826213': values[0]
                    }
                }).done(function (){
                    console.log("form1 data sent to sheet");
                });
        }
    
}