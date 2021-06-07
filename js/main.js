$(function() {
    
// jQuery Select Plugin
$('select').prettyDropdown({
    height: 30,
  });

   
$('select').on('change', () => {

    let $selection = $('select').val()
    
    // empty 'Main' container, display loading gif, format header
    $('main').empty()
    $('.loading-gif').show()

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


    $.getJSON(`https://api.nytimes.com/svc/topstories/v2/${$selection}.json?&api-key=hbvVpmOEMRq8xxJSav79k8nlLeNRfUGg`)
    .done(function(data) {
        $('.loading-gif').hide()
        
        // filter results for only those with images
        let filteredData = []
        $.each(data.results, function(key, value) {
            if (value.multimedia.length >= 1) {
                filteredData.push(value)
            }
        })

        // only display the first 12 results
        for (let i=0; i < 12; i++) {
            let title = filteredData[i].title
            let abstract = filteredData[i].abstract
            let image = filteredData[i].multimedia[4].url
            let url = filteredData[i].url

            $('main').append(`<div class="top-story"><div class="img-wrapper"><img src="${image}"></div><div class="text"><h2><a href="${url}">${title}</a></h2><p>${abstract}</p></div></div>`)

        }

    })
    .fail(function() {
        alert('There was a problem with your request. Please refresh the page and try again.')
    })

    // display abstract on hover
    $(document).on('mouseenter', '.top-story', (e) => {
        $(e.currentTarget).children(':nth-child(2n)').children(':nth-child(2n)').slideDown()
    })
    .on('mouseleave', '.top-story', (e) => {
        $(e.currentTarget).children(':nth-child(2n)').children(':nth-child(2n)').slideUp()
    })


})


});

