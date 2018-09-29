$(document).ready(function () {

    //serach from index page
    var landmark ='';

    // Sygic api url
    let urlSygic = "https://api.sygictravelapi.com/1.0/en/places/list?query=";

    // add event listender to indexSearch button, store it into local storage
    $("#searchBtn").on("click", "#indexSearch", function() {
        landmark = $("#landmark-search").val().trim();
        localStorage.setItem("landmarkSearch", landmark);
        console.log(localStorage.getItem("landmarkSearch"));
        $("#landmark-search").val((localStorage.getItem("landmarkSearch")));
        console.log(`User search: ${landmark}`)
    })

    $("#landmark-search").val((localStorage.getItem("landmarkSearch")));
    
    // Add event listener to search button
    $(".field").on("click", "#search", sygicAPI);
    $("#cards .card .blurring.dimmable.image .ui.dimmer.transition.hidden .content .center").on("click", ".ui.inverted.button", sygicModal)

    function sygicAPI() {

        // Clear card content
        $("#cards").empty()

        $(".ui.container.segment").show()

        // Value of search input
        landmark = $("#landmark-search").val().trim();
        localStorage.setItem("landmarkSearch", landmark);
        console.log(localStorage.getItem("landmarkSearch"));
        $("#landmark-search").val((localStorage.getItem("landmarkSearch")));
        console.log(`User search: ${landmark}`)

        // Make request to Sygic
        $.ajax({
                url: urlSygic + landmark,
                headers: {
                    "x-api-key": "elOVQ84rsF7fwxTyQ2uwM64xAfBGcbJf8rbCGmgw"
                },
            })
            .then(function (landmarks) {

                // Store places object in variable
                let places = landmarks.data.places
                console.log(places)

                // Push elements to DOM
                $.each(places, function (index, place) {

                    // Push to responsive div
                    $("#cards").append(`
                    <div class="card" lat="${place.location.lat}" lng="${place.location.lng}">
                      <div class="blurring dimmable image">
                        <div class="ui dimmer">
                          <div class="content">
                            <div class="center">
                              <div class="ui inverted button" id="${place.id}">View Landmark</div>
                            </div>
                          </div>
                        </div>
                        <img src="${place.thumbnail_url}">
                      </div>
                      <div class="content">
                        <a class="header" id="${place.id}" src="${place.url}" target="_blank">${place.name}</a>
                        <div class="meta">
                          <h5>${place.name_suffix}</h5>
                          <span class="date">${place.perex}</span>
                        </div>
                      </div>
                      <div class="extra content">
                          <i class="users icon"></i>
                          Category: ${place.level}
                      </div>
                    `)
                })

                // Blur images on hover
                $(".special.cards .image").dimmer({
                    on: "hover"
                });

                // Clear search input
                // $("#landmark-search").val('')
            })
    }

    function sygicModal() {
        console.log('hello')

        // Display modal on button click
        $(".ui.inverted.button").on("click", function () {
            $(".ui.basic.modal")
                .modal("show")
        })
    }

    // Yelp search event listener
    $("#search-yelp").on("click", yelpAPI)

    // Yelp api url
    let urlYelp = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?="

    function yelpAPI() {

        $.ajax({
                url: urlYelp,
                method: "GET",
                headers: {
                    "Authorization": "Bearer hSg20dAvgmubASCTaSXjfHUdfVTxmC61k-8SUhivUTY9x4i8woHhKWzpRYhq3O_8egDpQRjDsPfge5EB8S5BWJhXHk94ldm1cfFQ5pdDikzj2IRSbh02B_auPxerW3Yx"
                },
                dataType: "json"
            })
            .then(function (response) {
                let yelp_data = response.businesses
                console.log(response.businesses)
                $.each(yelp_data, function (i, place) {
                    console.log(place.name)
                })
            })
    }
})