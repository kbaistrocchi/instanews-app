$(function() {

    // dropdown menu selection
$('select').on('change', () => {
    // save menu selection
    let $selection = $('select').val()
    // console.log($selection)
    $.getJSON(`https://api.nytimes.com/svc/topstories/v2/${$selection}.json?&max-results=5&api-key=hbvVpmOEMRq8xxJSav79k8nlLeNRfUGg`)
    .done(function(data) {
        $('header').css('height', '300px')
        $('.logo').css('width', '40%')
        console.log('data', data)
        let filteredData = []
        // filter results for only those with images
        $.each(data.results, function(key, value) {
            if (value.multimedia.length >= 1) {
                filteredData.push(value)
            }
        })
        console.log(filteredData)
        // only display the first 12 results
        for (let i=0; i < 12; i++) {
            // article variables
            let title = filteredData[i].title
            let abstract = filteredData[i].abstract
            let image = filteredData[i].multimedia[4].url
            let url = filteredData[i].url

        $('main').append(`<div class="top-story"><div class="img-wrapper"><img src="${image}"></div><div class="text"><a href="${url}"><h2>${title}</h2></a><p>${abstract}</p></div></div>`)

            }

    })
    .fail(function() {})
    .always(function(){})
})





});

