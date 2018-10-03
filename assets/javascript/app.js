$(document).ready(function () {

    // Simulate click on enter key
    $("#landmark-search").on("keyup", function (e) {
        let keyCode = e.which
        if (keyCode === 13) {
            $("#search").click()
        }
    })

    // Add event listener to search button
    $("#search").on("click", sygicAPI)
    // $("#search").on("click", zomatoAPI)
    $("#index-search").on("click", sygicAPI)

    // Expand accordion
    $(document).on("click", "#accordion-title", function () {
        $(".ui.accordion").accordion()
    })

    // Landmark click event and call api
    $(document).on("click", ".ui.inverted.button", function (index) {

        // Store lat & lng variables
        let lat = $(this).attr("lat")
        let lng = $(this).attr("lng")

        // Call yelp api function and pass lat & lng
        yelpAPI(lat, lng);

        // Call zomato api function and pass lat & lng
        // zomatoAPI(lat, lng);

        // Display modal on button click
        $(".ui.modal").modal("show")
    });

    

    // Call sygic api
    function sygicAPI() {

        // Sygic api url
        let urlSygic = "https://api.sygictravelapi.com/1.0/en/places/list?query=";

        // Clear card content
        $("#cards").empty();

        // Show cards content on search
        $(".ui.container.segment").show()

        // Value of search input
        let landmark = $("#landmark-search").val().trim()
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
                let places = landmarks.data.places;

                // Push elements to DOM
                for (var i = 0; i < places.length; i++) {

                    urlPlaces = "https://api.sygictravelapi.com/1.0/en/places/" + places[i].id;

                    // console.log('url places: ' + urlPlaces)

                    $.ajax({
                            url: urlPlaces,
                            headers: {
                                "x-api-key": "elOVQ84rsF7fwxTyQ2uwM64xAfBGcbJf8rbCGmgw"
                            }
                        })
                        .then(function (results) {
                            // console.log(results.data.place.main_media.media[0].url);
                            // console.log(results.data.place.id);
                            // console.log(results.data.place.perex);

                            var perex = results.data.place.perex;
                            var img_url = results.data.place.main_media.media[0].url

                            if (perex !== null || img_url !== null) {

                                console.log(perex)
                                console.log(JSON.stringify(img_url))

                                // Push to responsive div
                                $("#cards").append(`
                            <div class="card">
                                <div class="blurring dimmable image">
                                    <div class="ui dimmer">
                                    <div class="content">
                                        <div class="center">
                                        <div class="ui inverted button" id="${results.data.place.id}" lat="${results.data.place.location.lat}" lng="${results.data.place.location.lng}">View Landmark</div>
                                        </div>
                                    </div>
                                    </div>
                                    <img src="${results.data.place.main_media.media[0].url}">
                                </div>
                                <div class="content">
                                    <a class="header" id="${results.data.place.id}" src="${results.data.place.url}" target="_blank">${results.data.place.name}</a>
                                    <div class="meta">
                                    <h5>${results.data.place.name_suffix}</h5>
                                    <span class="date">${perex}</span>
                                    </div>
                                </div>
                                <div class="extra content">
                                    <div class="ui labeled button" tabindex="0">
                                    <div class="ui button" id="likeBtn">
                                      <i class="heart icon"></i> Like
                                    </div>
                                    <button class="ui teal button">Add to my calendar</button>
                                    </div>
                                    <br>
                                    <i class="users icon"></i>
                                    Category: ${results.data.place.level}
                                </div>
                            </div>
                            `)

                                $(".ui.modal").html(`
                            <i class="close icon"></i>
                            <div class="header">
                              ${results.data.place.name}
                            </div>
                            <div class="image content">
                              <div class="ui medium image">
                                <img src="${results.data.place.main_media.media[0].url}">
                              </div>
                              <div class="description">
                                <div class="ui header">${results.data.place.name_suffix}</div>
                                <p>${perex}</p>
                              </div>
                            </div>
                            <div class="actions">
                                <div class="ui accordion">
                                    <div class="title" id="accordion-title">
                                    <i class="dropdown icon"></i>
                                    View Restaurants in Area
                                    </div>
                                    <div class="content">
                                    <div class="ui items" id="accordion-content">
                                    </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                                `)
                            }

                            // Blur images on hover
                            $(".special.cards .image").dimmer({
                                on: "hover"
                            });

                            // // Clear search input
                            $("#landmark-search").val('')
                        })
                }
            })
    }


    // Yelp search event listener - correct version
    function yelpAPI(lat, lng) {

        // Yelp API url
        var urlYelp = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?=" + "&latitude=" + lat + "&longitude=" + lng + "&categories=restaurants&limit=5"

        fetch(urlYelp, {
                headers: {
                    "Authorization": "Bearer hSg20dAvgmubASCTaSXjfHUdfVTxmC61k-8SUhivUTY9x4i8woHhKWzpRYhq3O_8egDpQRjDsPfge5EB8S5BWJhXHk94ldm1cfFQ5pdDikzj2IRSbh02B_auPxerW3Yx"
                }
            })
            .then((res) => res.json())
            .then((data) => {
                let places = data.businesses
                // console.log("*****Yelp Results Below*****")
                // console.log(places)

                $(document).on("click", "#accordion-title", function (e) {

                    // Clear previous elements
                    $("#accordion-content").empty()

                    $.each(places, function (i, place) {

                        // Push elements to modal
                        $("#accordion-content").append(`
                            <div class="item">
                            <div class="image">
                            <img class="ui medium image" src="${this.image_url}">
                            </div>
                            <div class="content">
                            <a class="header" href="${this.url}" target="_blank">${this.name}</a>
                            <div class="meta">
                                <span>Category: ${this.categories[0].title}</span>
                                <span>Open: ${this.is_closed}</span>
                                <span>Price: ${this.price}</span>
                                <span>Rating: ${this.rating}</span>
                                <span>Distance: ${this.distance}</span>
                            </div>
                            <div class="description">
                                <p>${this.location.display_address}</p>
                            </div>
                            <div class="extra">
                                Additional Details
                            </div>
                            </div>
                            </div>
                        `)
                    })
                })
            })
    }


    // Call zomato api
    function zomatoAPI(lat, lng) {
        // Zomato url
        let urlZomato = 'https://developers.zomato.com/api/v2.1/geocode?lat=' + lat + '&lon=' + lng
        console.log(urlZomato)

        $.ajax({
                url: urlZomato,
                headers: {
                    "X-Zomato-API-Key": '9dfccaf245eac8f41bdcf42d94118ce4'
                }
            })
            .then(function (response) {
                // console.log(response)

                let places = response.nearby_restaurants

                // console.log(places)

                $(document).on("click", ".dropdown.icon", function (e) {

                    $("#accordion-content").empty()
                    $.each(places, function (i, place) {
                        console.log(place.restaurant)
                        // Push elements to modal
                        $("#accordion-content").append(`
                            <div class="item">
                            <div class="image">
                            <img class="ui medium image" src="${place.restaurant.thumb}">
                            </div>
                            <div class="content">
                            <a class="header" href="${place.restaurant.url}" target="_blank">${place.restaurant.name}</a>
                            <div class="meta">
                                <span>Category: ${place.restaurant.cuisines}</span>
                                <span>Open: ${place.restaurant.is_closed}</span>
                                <span>Price: ${place.restaurant.price_range}</span>
                                <span>Rating: ${place.restaurant.user_rating.aggregate_rating}</span>
                                <span>Distance: ${place.restaurant.user_rating.rating_text}</span>
                            </div>
                            <div class="description">
                                <p>${place.restaurant.location.address}</p>
                            </div>
                            <div class="extra">
                                Additional Details
                            </div>
                            </div>
                            </div>
                        `)
                    })
                })
            })
    }
})