// Blur images on hover
$('.special.cards .image').dimmer({
    on: 'hover'
})

// Display modal on button click
$('.ui.inverted.button.food-menu').on('click', function () {
    $('.ui.basic.modal')
        .modal('show')
})

// $('.ui.inverted.button').on('click', getAPI)

let landmark_radius = 'Enter info here'

let url = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=by-chloe&location=boston'

// function getAPI() {

//     $.ajax({
//         url: url,
//         method: 'GET',
//         headers: {
//             'Authorization': 'Bearer hSg20dAvgmubASCTaSXjfHUdfVTxmC61k-8SUhivUTY9x4i8woHhKWzpRYhq3O_8egDpQRjDsPfge5EB8S5BWJhXHk94ldm1cfFQ5pdDikzj2IRSbh02B_auPxerW3Yx'
//         },
//         dataType: 'json'
//     })
//     .then(function (response) {
//         let yelp_data = response.businesses
//         console.log(response.businesses)
//         $.each(yelp_data, function (i, place) {
//             console.log(place.name)
//         })
//     })
// }

// // variables for sygic
var landmark = $("#landmark-search").val();
var queryURL = "https://api.sygictravelapi.com/1.0/en/places/list?query=";
// ajax notation for sygic 
$("#search").on("click", function () {
    console.log("GOT ITTTT!!!");
    
    event.preventDefault();
    landmark = $("#landmark-search").val();
    queryURL += landmark;
    // console.log(JSON.stringify(landmark));
    // if (landmark == String){
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
            //   output lat and lng of location
            var sygLat = (place.location.lat);
            var sygLng = (place.location.lng);
            var sygSuffix = (place.name_suffix);
            console.log(place.location.lat);
            console.log(place.location.lng);
            console.log(place.name_suffix);
            console.log(place.id);

        });
    }).catch((error) => {
        console.log(error)
    });
});
