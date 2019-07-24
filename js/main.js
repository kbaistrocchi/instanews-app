$(function() {

    // dropdown menu selection
$('select').on('change', () => {
    // save menu selection
    let $selection = $('select').val()
    // console.log($selection)
    $.getJSON(`https://api.nytimes.com/svc/topstories/v2/${$selection}.json?api-key=hbvVpmOEMRq8xxJSav79k8nlLeNRfUGg`)
    .done(function(data) {
        console.log("data", data)
        $.each(data, function(key, value) {
            console.log("value in data", value)
            // append each result to a div with photo
            // $('ul').append(`<li>${value.name}</li>`)
            })
    })
    .fail(function() {})
    .always(function(){})
})





});



// $("button").on("click", function() {
//     $.getJSON("https://api.nytimes.com/svc/topstories/v2/science.json?api-key=hbvVpmOEMRq8xxJSav79k8nlLeNRfUGg")
//             // need to replace the /science from url above to selected item (use string interpolation)
//     .done(function(data) {
//       console.log(data)
//       $.each(data, function(key, value) {
//         $('ul').append(`<li>${value.name}</li>`)
//       })
//     })
//     .fail(function() {
//       alert('sorry, your request could not be processed') // in case the request didn't work
//     })
//     .always(function() {
//       //something that happens whether request goes through or not
//     })
//   });