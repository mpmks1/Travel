// Blur images on hover
$('.special.cards .image').dimmer({
    on: 'hover'
})

// Display modal on button click
$('.ui.inverted.button.food-menu').on('click', function () {
    $('.ui.basic.modal')
        .modal('show')
})

$('.ui.inverted.button').on('click', getAPI)

let landmark_radius = 'Enter info here'

let url = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=by-chloe&location=boston'

function getAPI() {

    $.ajax({
        url: url,
        method: 'GET',
        headers: {
            'Authorization': 'Bearer hSg20dAvgmubASCTaSXjfHUdfVTxmC61k-8SUhivUTY9x4i8woHhKWzpRYhq3O_8egDpQRjDsPfge5EB8S5BWJhXHk94ldm1cfFQ5pdDikzj2IRSbh02B_auPxerW3Yx'
        },
        dataType: 'json'
    })
    .then(function (response) {
        let data = response.businesses
        console.log(response.businesses)
        $.each(data, function (i, place) {
            console.log(place.name)
        })
    })
}