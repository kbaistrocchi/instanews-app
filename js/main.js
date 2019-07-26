$(function() {

    // dropdown menu selection
$('select').on('change', () => {
    // save menu selection
    let $selection = $('select').val()
    // console.log($selection)
    $.getJSON(`https://api.nytimes.com/svc/topstories/v2/${$selection}.json?&max-results=5&api-key=hbvVpmOEMRq8xxJSav79k8nlLeNRfUGg`)
    .done(function(data) {
        console.log('data', data)
        $.each(data.results, function(key, value) {
            console.log(value.multimedia)
            console.log(value.multimedia[0].format)
            let imageArray = value.multimedia.filter(object => {
                return object.format === 'thumbLarge'
            })
            console.log(imageArray)
        })
        // for (let i=0; i < 12; i++) {
        //     // article variables
        //     let title = data.results[i].title
        //     let abstract = data.results[i].abstract
        //     let url = data.results[i].url
        //     console.log(url)

        //     // append each result to a div with photo
        //     // wrap entire div in link to url
        //     $('main').append(`<div><h2>${title}</h2><p>${abstract}</p></div>`)
        // }
        // $.each(data.results, function(key, value) {
        //     console.log("value in data", value)
        //     let $title = value.title
        //     let $abstract = value.abstract
        //     let $image;
        //     console.log($abstract)
        //     // append each result to a div with photo
        //     $('main').append(`<div><h2>${$title}</h2><p>${$abstract}</p></div>`)

        //     })
    })
    .fail(function() {})
    .always(function(){})
})





});

