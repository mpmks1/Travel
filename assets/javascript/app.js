$(document).ready(function () {
  // object that contains lat, lng, and id of each individual dynamic landmark card
  var landObj = {
    ids: [],
    lats: [],
    lngs: [],
  }


  // Sygic api url
  let urlSygic = "https://api.sygictravelapi.com/1.0/en/places/list?query=";

  // Add event listener to search button
  $("#search").on("click", sygicAPI)
  $("#cards .card .blurring.dimmable.image .ui.dimmer.transition.hidden .content .center").on("click", ".ui.inverted.button", sygicModal)

  function sygicAPI() {

    // Clear card content
    $("#cards").empty();

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

          console.log(places[i].id);

          let urlPlaces = "https://api.sygictravelapi.com/1.0/en/places/" + places[i].id;
          console.log(urlPlaces);

          $.ajax({
            url: urlPlaces,
            headers: {
              "x-api-key": "elOVQ84rsF7fwxTyQ2uwM64xAfBGcbJf8rbCGmgw"
            }
          })
            .then(function (results) {
              console.log(results.data.place.main_media.media[0].url);
              console.log(results.data.place.id);
              console.log(results.data.place.perex);

              var perex = results.data.place.perex;
              if (perex !== null) {
                perex = results.data.place.perex;
              }
              else {
                perex = " ";
              }

              // Push to responsive div
              $("#cards").append(`
                        <div class="card" lat="${results.data.place.location.lat}" lng="${results.data.place.location.lng}">
                        <div class="blurring dimmable image">
                            <div class="ui dimmer">
                            <div class="content">
                                <div class="center">
                                <div class="ui inverted button" id="${results.data.place.id}">View Landmark</div>
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
              `)

              // Blur images on hover
              $(".special.cards .image").dimmer({
                on: "hover"
              });

              // // Clear search input
              // $("#landmark-search").val('')


              // included on click function that pushes sygic api call data into a global var
              $(".ui.inverted.button").on("click", push);

              function push() {
                // these clear the array after clicks
                landObj.ids = [];
                landObj.lats = [];
                landObj.lngs = [];
                // these populate the object to use for yelp
                landObj.ids.push(results.data.place.id);
                landObj.lats.push(results.data.place.location.lat);
                landObj.lngs.push(results.data.place.location.lng);
                // console logs ids we wont need after yelp is working
                console.log("lats array" + landObj.ids);
                // calling yelp
                yelpAPI();
              }

            })


        }

      })

    // change "like button" color ----- NOT WORKING RIGHT NOW?????????
    $(document).click(".ui.button", function() {
      $(this).toggleClass("selected");
      console.log("hello?");
    });


    // Yelp search event listener - correct version

    // Yelp api url

    function yelpAPI() {

      var urlYelp = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?="
      $.ajax({
        url: urlYelp + "&latitude=" + landObj.lats[0] + "&longitude=" + landObj.lngs[0],

        method: "GET",
        headers: {
          "Authorization": "Bearer hSg20dAvgmubASCTaSXjfHUdfVTxmC61k-8SUhivUTY9x4i8woHhKWzpRYhq3O_8egDpQRjDsPfge5EB8S5BWJhXHk94ldm1cfFQ5pdDikzj2IRSbh02B_auPxerW3Yx"
        },
        dataType: "json"
      })
        .then(function (response) {
          console.log(response);
          console.log("test");
          // let yelp_data = response.businesses
          // console.log(response.businesses);
          // console.log("responsesss" + response);
          // $.each(yelp_data, function (i, place) {
          //     console.log(place.name)
          // })
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

  }
})
