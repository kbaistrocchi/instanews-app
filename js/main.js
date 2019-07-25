$(function() {

    // dropdown menu selection
$('select').on('change', () => {
    // save menu selection
    let $selection = $('select').val()
    // console.log($selection)
    $.getJSON(`https://api.nytimes.com/svc/topstories/v2/${$selection}.json?api-key=hbvVpmOEMRq8xxJSav79k8nlLeNRfUGg`)
    .done(function(data) {
        console.log('data', data)
        $.each(data.results, function(key, value) {
            // console.log("value in data", value)
            console.log(value.title)
            // append each result to a div with photo
            $('main').append(`<div><h2>${value.title}</h2></div>`)

            })
    })
    .fail(function() {})
    .always(function(){})
})





});

