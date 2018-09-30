$(document).ready(function () {

    // object that contains lat, lng, and id of each individual dynamic landmark card
    var landObj = {
        ids: [],
        lats: [],
        lngs: [],
    }

    // Simulate click on enter key
    $("#landmark-search").on("keyup", function (e) {
        let keyCode = e.which
        if (keyCode === 13) {
            $("#search").click()
        }
    })
    // Sygic api url
    let urlSygic = "https://api.sygictravelapi.com/1.0/en/places/list?query=";

    // Add event listener to search button
    $("#search").on("click", sygicAPI)
    $("#index-search").on("click", sygicAPI)

    // Call sygic api
    function sygicAPI() {

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
                    // $.each(places, function () {

                    // console.log(places[i].id);

                    let urlPlaces = "https://api.sygictravelapi.com/1.0/en/places/" + places[i].id;

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
                            if (perex !== null) {
                                perex = results.data.place.perex;
                            } else {
                                perex = " ";
                            }

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
                                    <i class="users icon"></i>
                                    Category: ${results.data.place.level}
                                </div>
                            </div>
                            `)

                            $(".ui.basic.modal").append(`

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
                                    <div class="content" id="accordion-content">
                                    <p class="transition hidden">A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.</p>
                                    </div>
                                </div>
                            </div>
                            </div>
                                `)

                            // Expand accordion
                            $("#accordion-title").on("click", function () {
                                $(".ui.accordion").accordion()
                            })

                            // Blur images on hover
                            $(".special.cards .image").dimmer({
                                on: "hover"
                            });

                            // // Clear search input
                            $("#landmark-search").val('')

                            // included on click function that pushes sygic api call data into a global var
                            $(".ui.inverted.button").on("click", function () {

                                // these clear the array after clicks
                                landObj.ids = [];
                                landObj.lats = [];
                                landObj.lngs = [];

                                // these populate the object to use for yelp
                                landObj.ids.push(results.data.place.id);
                                landObj.lats.push(results.data.place.location.lat);
                                landObj.lngs.push(results.data.place.location.lng);

                                // console logs ids we wont need after yelp is working
                                // console.log("lats array" + landObj.ids);

                                yelpAPI();

                                // Display modal on button click
                                $(".ui.basic.modal").modal("show")
                            });
                        })
                }
            })

        // Yelp search event listener - correct version
        function yelpAPI() {

            // Yelp API url
            var urlYelp = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?=" + "&latitude=" + landObj.lats + "&longitude=" + landObj.lngs + "&categories=restaurants&limit=5"

            fetch(urlYelp, {
                    headers: {
                        "Authorization": "Bearer hSg20dAvgmubASCTaSXjfHUdfVTxmC61k-8SUhivUTY9x4i8woHhKWzpRYhq3O_8egDpQRjDsPfge5EB8S5BWJhXHk94ldm1cfFQ5pdDikzj2IRSbh02B_auPxerW3Yx"
                    }
                })
                .then((res) => res.json())
                .then((data) => {
                    let places = data.businesses[0]

                    console.log(places)

                    $("ui.positive.right.labeled.icon.button").on("click", function (e) {
                        $.each(places, function (i, place) {

                            // Push elements to modal
                            $("#accordion-content").append(`
                                    <div class="item">
                                    <div class="image">
                                    <img src="${place.image_url}">
                                    </div>
                                    <div class="content">
                                    <a class="header">Header</a>
                                    <div class="meta">
                                        <span>Description</span>
                                    </div>
                                    <div class="description">
                                        <p></p>
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
    }
})