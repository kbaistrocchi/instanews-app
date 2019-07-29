$(function() {

    // dropdown menu selection
$('select').on('change', () => {
    // save menu selection
    let $selection = $('select').val()
    // console.log($selection)
    $.getJSON(`https://api.nytimes.com/svc/topstories/v2/${$selection}.json?&max-results=5&api-key=hbvVpmOEMRq8xxJSav79k8nlLeNRfUGg`)
    .done(function(data) {
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

            // append each result to a div with photo
            // wrap entire div in link to url 

            // put title and abstract in another UN-NESTED div and overlay it using grid. Hopefully this will 
            // fix the text overflow issue
        $('main').append(`<div class="top-story"><div class="img-wrapper"><img src="${image}"></div><div class="text"><a href="${url}"><h2>${title}</h2></a><p>${abstract}</p></div></div>`)

            }

    })
    .fail(function() {})
    .always(function(){})
})





});

