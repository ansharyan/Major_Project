// const map = new maplibregl.Map({
//   container: "map",
//   style:
//     "https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL",
//   center: [84.6833132, 23.4349532],
//   zoom: 9,
// });

// const marker = new maplibregl.Marker()
//   .setLngLat([84.6833132, 23.4349532])
//   .addTo(map);

const map = new maplibregl.Map({
    container: 'map',
    style:
        'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL',
    center: [84.6833132, 23.4349532],
    zoom: 8
});

function handleFileSelect(evt) {
    const file = evt.target.files[0]; // Read first selected file

    const reader = new FileReader();

    reader.onload = function (theFile) {
        // Parse as (geo)JSON
        const geoJSONcontent = JSON.parse(theFile.target.result);

        // Add as source to the map
        map.addSource('uploaded-source', {
            'type': 'geojson',
            'data': geoJSONcontent
        });

        map.addLayer({
            'id': 'uploaded-polygons',
            'type': 'fill',
            'source': 'uploaded-source',
            'paint': {
                'fill-color': '#888888',
                'fill-outline-color': 'red',
                'fill-opacity': 0.4
            },
            // filter for (multi)polygons; for also displaying linestrings
            // or points add more layers with different filters
            'filter': ['==', '$type', 'Polygon']
        });
    };

    // Read the GeoJSON as text
    reader.readAsText(file, 'UTF-8');
}

document
    .getElementById('file')
    .addEventListener('change', handleFileSelect, false);