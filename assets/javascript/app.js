// Blur images on hover
$('.special.cards .image').dimmer({
    on: 'hover'
})

// Display modal on button click
$('.ui.inverted.button.food-menu').on('click', function () {
    $('.ui.basic.modal')
        .modal('show')
})

// variables for sygic
var landmark = "great wall";
var queryURL = "https://api.sygictravelapi.com/1.0/en/places/list?query=" + landmark;
// ajax notation for sygic 
$.ajax({
    url: queryURL,
    method: "GET",
    headers: {
        "x-api-key": "elOVQ84rsF7fwxTyQ2uwM64xAfBGcbJf8rbCGmgw"
    },
    // sygic console log
}).then(function (response) {
    console.log(response);

    var data = response.data.places;
    $.each(data, function (i, place) {
        //   output lat and long of location 
        console.log(place.location);
    });
}).catch((error) => {
    console.log(error)
});




