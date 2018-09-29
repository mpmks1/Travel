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
        $("#cards").empty()

        $(".ui.container.segment").show()

        // Value of search input
        let landmark = $("#landmark-search").val().trim()
        console.log(`User search: ${landmark}`)


        //======firebase==============

        console.log(landmark + " this is the landmark that should be added to firebase")
    
        database.ref().push({
            landmarkLocation: landmark
      
        })
      
        database.ref().on("value", function(snapshot) {
            //console.log(snapshot.val() + " all the firebase objects");
        }, function(errorObject) {
            console.log("firebase error, failed to read: " + errorObject.code);
        });

        //=========firebase=============

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


                // Push elements to DOM
                $.each(places, function (index, place) {
                    

             
                    // Push to responsive div
                    $("#cards").append(`
                    <div class="card" lat="${place.location.lat}" lng="${place.location.lng}">
                      <div class="blurring dimmable image">
                        <div class="ui dimmer">
                          <div class="content">
                            <div class="center">
                              <div class="ui inverted button" id="${index}">View Landmark</div>
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

                    // included on click function that pushes sygic api call data into a global var
                    $(".ui.inverted.button").on("click", push);
            
                    function push(){
                        // these clear the array after clicks
                        landObj.ids = [];
                        landObj.lats = [];
                        landObj.lngs = [];
                        // these populate the object to use for yelp
                        landObj.ids.push(place.id);
                        landObj.lats.push(place.location.lat);
                        landObj.lngs.push(place.location.lng);
                        // console logs ids we wont need after yelp is working
                        console.log("lats array" + landObj.ids);
                         // calling yelp
                    yelpAPI();
                    }
                   
                })

                // Blur images on hover
                $(".special.cards .image").dimmer({
                    on: "hover"
                });

                // Clear search input
                $("#landmark-search").val('')
            })


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

})

//
var config = {
    apiKey: "AIzaSyAa6e_lXOL1nONWCwftcJW0NmsdPs4uK3w",
    authDomain: "travel-truant.firebaseapp.com",
    databaseURL: "https://travel-truant.firebaseio.com/",
    projectId: "travel-truant",
    storageBucket: "",
    messagingSenderId: "525665077026"
  };
  firebase.initializeApp(config);

  var database = firebase.database();








    }
    
    function sygicModal() {
        console.log('hello')

        // Display modal on button click
        $(".ui.inverted.button").on("click", function () {
            $(".ui.basic.modal")
                .modal("show")
        })
    }
})

