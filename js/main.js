console.log("loaded bruh");


// $.ajax({
//     url: "https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=DEMO_KEY"
// }).then(function(data) {
//    document.write(JSON.stringify(data));
// });

$.ajax({
    url: "/resources/testResponse.json",
    success: function (data) {
        // console.log(JSON.stringify(data));

    	processData(JSON.parse(data));
    }
});


function processData(json) {
	var elementCount = json.element_count;
	console.log("processing " + elementCount + " elements.");
	var asteroids = [];

	for (day in json.near_earth_objects) {
		console.log("processing " + day)
		var currDay = json.near_earth_objects[day];
		for (index in currDay) {
			var currAsteroid = currDay[index];

			// TODO filter when I have an understanding of what I need
			var filteredAsteroid = {};
			filteredAsteroid["name"] = currAsteroid.name;
			filteredAsteroid["is_potentially_hazardous_asteroid"] = currAsteroid.is_potentially_hazardous_asteroid;
			filteredAsteroid["estimated_diameter"] = determineDiameter(currAsteroid.estimated_diameter);
			filteredAsteroid["relative_velocity"] = currAsteroid.close_approach_data[0].relative_velocity;
			filteredAsteroid["miss_distance"] = currAsteroid.close_approach_data[0].miss_distance;

			asteroids.push(filteredAsteroid);
		}
	}

	console.log("Parsed out " + asteroids.length + " total asteroids.");

	document.write(JSON.stringify(asteroids[0]));
}

// determine the appropriate uom and get it's avg diameter
function determineDiameter(estimated_diameter) {
	var result;

	if (true) { // metric or 'murica toggle
		var avgMi = getAvgDiameter(estimated_diameter.miles);
		
 		// if mi is less than one, use feet instead
		if (avgMi > 1) {
			result = {"miles":avgMi};
		} else {
			var avgFt = getAvgDiameter(estimated_diameter.feet);
			result = {"feet":avgFt};
		}

	} else if (false) {
	    var avgKm = getAvgDiameter(estimated_diameter.kilometers);

	    // if km is less than one, use meters instead
		if (avgKm > 1) {
			result = {"kilometers":avgKm};
		} else {
			var avgM = getAvgDiameter(estimated_diameter.meters);
			result = {"meters":avgM};
		}
	}

	return result;
}

// get the average of a unit of measure object inside estimated_diameter
function getAvgDiameter(measure) {
	return ((measure.estimated_diameter_min+measure.estimated_diameter_max)/2);
}


// - speed

// - how close they are

// - when they are coming

