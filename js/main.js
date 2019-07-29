$(function() {

    // dropdown menu selection
$('select').on('change', () => {
    // save menu selection
    let $selection = $('select').val()
    // empty main div and format header
    $('main').empty()

    let $browserWidth = $(window).width()
    if ($browserWidth < 600) {
        $('header').css('height', '300px')
        $('.logo').css('width', '40%')
    }
    else if ($browserWidth < 1240) {
        $('header').css({
            'height': '100px', 
            'font-size': '0.7rem'
        })
        $('.logo').css({
            'width': '50px', 
            'position': 'relative', 
            'right': '12%'
        })
        $('select').css('font-size', '0.7rem')
        $('.choose').css({
            'position': 'relative',
            'right': '4%'
        })
    }
    else {
        $('header').css('height', '135px')
        $('.logo').css({
            'width': '70px',
            'padding-left': '3%',
            'padding-right': '7%'
        })
    }


    $.getJSON(`https://api.nytimes.com/svc/topstories/v2/${$selection}.json?&max-results=5&api-key=hbvVpmOEMRq8xxJSav79k8nlLeNRfUGg`)
    .done(function(data) {
        console.log('data', data)
        
        // filter results for only those with images
        let filteredData = []
        $.each(data.results, function(key, value) {
            if (value.multimedia.length >= 1) {
                filteredData.push(value)
            }
        })
        console.log(filteredData)

        // only display the first 12 results
        for (let i=0; i < 12; i++) {
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

