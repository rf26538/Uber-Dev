module.exports.getAddressCoordinates = async (address) => {
    
    try {
        if (!address) {
            throw new Error('Address is required');
        }

        const apiKey = process.env.GOOGLE_MAPS_API_KEY;
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
        const response = await fetch(url);

        if (response.status === 200) {
            const data = await response.json();
            if (!data || data.status !== 'OK' || !data.results || data.results.length === 0) return null;

            const result = data.results[0];
            const { lat, lng } = result.geometry.location;
            return { lat, lng, formattedAddress: result.formatted_address };
        } else {
            throw new Error(`Unable to fetch data from Google Maps API. Status Code: ${response.status}`);
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
}

module.exports.getDistanceTime = async (origin, destination) => {
    try {
        if (!origin || !destination) {
            throw new Error('Origin and Destination are required');
        }

        const apiKey = process.env.GOOGLE_MAPS_API_KEY;
        const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&key=${apiKey}`;
        const response = await fetch(url);

        if (response.status === 200) {
            const data = await response.json();
            if (!data || data.status !== 'OK' || !data.routes || data.routes.length === 0){
                throw new Error('No routes found');
            } 

            const leg = data.routes[0].legs[0];

            return {
                distance: {
                    text: leg.distance.text,
                    value: leg.distance.value
                },
                time: {
                    text: leg.duration.text,
                    value: leg.duration.value
                },
               status: data.status
            };
        } else {
            throw new Error(`Unable to fetch distance and time from Google Maps API. Status Code: ${response.status}`);
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
}

module.exports.getSuggestions = async (input) => {
    try {
        if (!input) {
            throw new Error('Query is required');
        }
        const apiKey = process.env.GOOGLE_MAPS_API_KEY;
        const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;
        const response = await fetch(url);

        if (response.status === 200) {
            const data = await response.json();
            if (!data || data.status !== 'OK' || !data.predictions) return [];
            return data.predictions;
        } else {
            throw new Error(`Unable to fetch suggestions from Google Maps API. Status Code: ${response.status}`);
        }
    } catch (err) {
        console.error(err);
        throw err;
    }   
}
