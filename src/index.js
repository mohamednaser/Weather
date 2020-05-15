var places = require("places.js");
var placesAutocomplete = places({
  appId: "plS7X61ESP3G",
  apiKey: "ac24a5c7aad117e8c12eb6c0f4a8a8de",
  type: "city",
  templates: {
    value: function (suggestion) {
      console.log("suestions ", suggestion);
      return suggestion.name;
    },
  },
  container: document.querySelector("#address-input"),
})
  .configure({
    type: "address",
  })
  .on("change", function resultSelected(e) {
    console.log(e.suggestion, "address details");
    // document.querySelector('#form-address2').value = e.suggestion.administrative || '';
    // document.querySelector('#form-city').value = e.suggestion.city || '';
    // document.querySelector('#form-zip').value = e.suggestion.postcode || '';
  });

placesAutocomplete.on("change", function resultSelected(e) {
  console.log(e.suggestion, "address details");
  // document.querySelector('#form-address2').value = e.suggestion.administrative || '';
  // document.querySelector('#form-city').value = e.suggestion.city || '';
  // document.querySelector('#form-zip').value = e.suggestion.postcode || '';
});

console.log("all places details ", placesAutocomplete);
