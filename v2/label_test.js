

jQuery(document).ready(function () {
        var map = L.map('fullMap', {
            scrollWheelZoom: true,
            dragging: true,
            doubleClickZoom: false,
            center: [37.8476, 35.3564],
            zoom: 3,
            zoomControl: true,
            attributionControl: false,
        });
        /*var countriesLayer = L.geoJson(countries, {
            onEachFeature: onEachFeature,
        }).addTo(map);
*/
        var hash = new L.Hash(map);


        /*function countriesStyle(feature) {
            return {
                fillColor: "#f0d1b1",
                fillOpacity: 1,
                color: '#fff',
                opacity: 1,
                weight: 1,
            }
        }*/


        var geoJsonLayer = L.geoJson(countries, {
            pointToLayer: function (feature, latlng) {
                var myIcon = L.divIcon({
                    iconSize: new L.Point(25, 25),
                    className: 'div-icon',
                    //iconSize: [40,40],
                    html: feature.properties.geoname,
                    // popupAnchor: [0, -10]
                });

                return L.marker(latlng, {icon: myIcon});
            }
        }).addTo(map);


        function onEachFeature(feature, layer) {
            layer.bindTooltip(feature.properties.name, {
                permanent:true,
                direction:'center',
                className: 'countryLabel'
            });
        }

/*
        function filterCountries(feature, layer) {
            return feature.properties.name != 'Greenland'; // logic to filter out countries
        }
        */
    });


// MAP COODINATE DATA
/*var countries = {
"type": "FeatureCollection",
"crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
"features": [
    {
      "type": "Feature",
      "properties": { "name": "name1"},
      "geometry": {
        "type": "Point",
        "coordinates": [
          -121.37695312499999,
          41.062786068733026
        ]
      }
    },
    {
      "type": "Feature",
      "properties":  { "name": "name2"},
      "geometry": {
        "type": "Point",
        "coordinates": [
          -121.26708984374999,
          36.721273880045004
        ]
      }
    }
  ]
}*/

var countries = {
"type": "FeatureCollection",
"crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
"features": [
{ "type": "Feature", "properties": { "name": "Alturas", "geoname": "Alturas", "seat": null, "largest": null, "county": "Modoc", "lat": 41.490929999999999, "lon": -120.5491 }, "geometry": { "type": "Point", "coordinates": [ -120.549099, 41.490934 ] } },
{ "type": "Feature", "properties": { "name": "Anaheim", "geoname": "Anaheim", "seat": null, "largest": "largest", "county": "Orange", "lat": 33.824150000000003, "lon": -117.89771 }, "geometry": { "type": "Point", "coordinates": [ -117.897707, 33.82415 ] } },
{ "type": "Feature", "properties": { "name": "Auburn", "geoname": "Auburn", "seat": "seat", "largest": null, "county": "Placer", "lat": 38.89808, "lon": -121.07125000000001 }, "geometry": { "type": "Point", "coordinates": [ -121.071247, 38.898076 ] } },
{ "type": "Feature", "properties": { "name": "Bakersfield", "geoname": "Bakersfield", "seat": null, "largest": null, "county": "Kern", "lat": 35.369759999999999, "lon": -118.96979 }, "geometry": { "type": "Point", "coordinates": [ -118.969794, 35.369763 ] } },
{ "type": "Feature", "properties": { "name": "Bishop", "geoname": "Bishop", "seat": null, "largest": "largest", "county": "Inyo", "lat": 37.367319999999999, "lon": -118.39715 }, "geometry": { "type": "Point", "coordinates": [ -118.397148, 37.367319 ] } },
{ "type": "Feature", "properties": { "name": "Chico", "geoname": "Chico", "seat": null, "largest": "largest", "county": "Butte", "lat": 39.760539999999999, "lon": -121.82491 }, "geometry": { "type": "Point", "coordinates": [ -121.824908, 39.760544 ] } },
{ "type": "Feature", "properties": { "name": "Clearlake", "geoname": "Clearlake", "seat": null, "largest": "largest", "county": "Lake", "lat": 38.952080000000002, "lon": -122.62278999999999 }, "geometry": { "type": "Point", "coordinates": [ -122.622794, 38.952083 ] } },
{ "type": "Feature", "properties": { "name": "Colusa", "geoname": null, "seat": null, "largest": null, "county": "Colusa", "lat": 39.210439999999998, "lon": -122.00927 }, "geometry": { "type": "Point", "coordinates": [ -122.009267, 39.210445 ] } },
{ "type": "Feature", "properties": { "name": "Concord", "geoname": "Concord", "seat": null, "largest": "largest", "county": "Contra Costa", "lat": 37.979149999999997, "lon": -122.00772000000001 }, "geometry": { "type": "Point", "coordinates": [ -122.007725, 37.979147 ] } },
{ "type": "Feature", "properties": { "name": "Crescent City", "geoname": "Crescent City", "seat": null, "largest": null, "county": "Del Norte", "lat": 41.750259999999997, "lon": -124.19932 }, "geometry": { "type": "Point", "coordinates": [ -124.199322, 41.750265 ] } },
{ "type": "Feature", "properties": { "name": "Daly City", "geoname": "Daly City", "seat": null, "largest": "largest", "county": "San Mateo", "lat": 37.676220000000001, "lon": -122.48175999999999 }, "geometry": { "type": "Point", "coordinates": [ -122.481757, 37.676219 ] } },
{ "type": "Feature", "properties": { "name": "Davis", "geoname": "Davis", "seat": null, "largest": "largest", "county": "Davis", "lat": 38.550069999999998, "lon": -121.72580000000001 }, "geometry": { "type": "Point", "coordinates": [ -121.725799, 38.550067 ] } },
{ "type": "Feature", "properties": { "name": "Downieville", "geoname": "Downieville", "seat": "seat", "largest": null, "county": "Sierra", "lat": 39.570929999999997, "lon": -120.81928000000001 }, "geometry": { "type": "Point", "coordinates": [ -120.819283, 39.570925 ] } },
{ "type": "Feature", "properties": { "name": "El Centro", "geoname": "El Centro", "seat": null, "largest": null, "county": "Imperial", "lat": 32.78734, "lon": -115.56115 }, "geometry": { "type": "Point", "coordinates": [ -115.561149, 32.787341 ] } },
{ "type": "Feature", "properties": { "name": "Eureka", "geoname": "Eureka", "seat": null, "largest": null, "county": "Humboldt", "lat": 40.79562, "lon": -124.16267999999999 }, "geometry": { "type": "Point", "coordinates": [ -124.162676, 40.795621 ] } },
{ "type": "Feature", "properties": { "name": "Fairfield", "geoname": "Fairfield", "seat": "seat", "largest": null, "county": "Solano", "lat": 38.27308, "lon": -122.04147 }, "geometry": { "type": "Point", "coordinates": [ -122.041473, 38.273076 ] } },
{ "type": "Feature", "properties": { "name": "Fresno", "geoname": null, "seat": null, "largest": null, "county": "Fresno", "lat": 36.751559999999998, "lon": -119.80061000000001 }, "geometry": { "type": "Point", "coordinates": [ -119.800612, 36.75156 ] } },
{ "type": "Feature", "properties": { "name": "Hanford", "geoname": "Hanford", "seat": null, "largest": null, "county": "Kings", "lat": 36.326250000000002, "lon": -119.65429 }, "geometry": { "type": "Point", "coordinates": [ -119.654286, 36.326253 ] } },
{ "type": "Feature", "properties": { "name": "Hollister", "geoname": "Hollister", "seat": null, "largest": null, "county": "San Benito", "lat": 36.848610000000001, "lon": -121.40340999999999 }, "geometry": { "type": "Point", "coordinates": [ -121.403409, 36.848612 ] } },
{ "type": "Feature", "properties": { "name": "Independence", "geoname": "Independence", "seat": "seat", "largest": null, "county": "Inyo", "lat": 36.83522, "lon": -118.21624 }, "geometry": { "type": "Point", "coordinates": [ -118.216241, 36.835222 ] } },
{ "type": "Feature", "properties": { "name": "Ione", "geoname": "Ione", "seat": null, "largest": null, "county": "Amador", "lat": 38.363010000000003, "lon": -120.94304 }, "geometry": { "type": "Point", "coordinates": [ -120.943042, 38.363015 ] } },
{ "type": "Feature", "properties": { "name": "Lakeport", "geoname": "Lakeport", "seat": "seat", "largest": null, "county": "Lake", "lat": 39.039929999999998, "lon": -122.92152 }, "geometry": { "type": "Point", "coordinates": [ -122.921524, 39.03993 ] } },
{ "type": "Feature", "properties": { "name": "Los Angeles", "geoname": null, "seat": null, "largest": null, "county": "Los Angeles", "lat": 34.055129999999998, "lon": -118.25703 }, "geometry": { "type": "Point", "coordinates": [ -118.25703, 34.05513 ] } },
{ "type": "Feature", "properties": { "name": "Loyalton", "geoname": "Loyalton", "seat": null, "largest": "largest", "county": "Sierra", "lat": 39.676870000000001, "lon": -120.24481 }, "geometry": { "type": "Point", "coordinates": [ -120.244812, 39.676867 ] } },
{ "type": "Feature", "properties": { "name": "Madera", "geoname": null, "seat": null, "largest": null, "county": "Madera", "lat": 36.964950000000002, "lon": -120.07635000000001 }, "geometry": { "type": "Point", "coordinates": [ -120.076345, 36.964948 ] } },
{ "type": "Feature", "properties": { "name": "Mammoth Lakes", "geoname": "Mammoth Lakes", "seat": null, "largest": "largest", "county": "Mono", "lat": 37.626809999999999, "lon": -118.99144 }, "geometry": { "type": "Point", "coordinates": [ -118.991443, 37.626808 ] } },
{ "type": "Feature", "properties": { "name": "Mariposa", "geoname": null, "seat": null, "largest": null, "county": "Mariposa", "lat": 37.529490000000003, "lon": -120.03255 }, "geometry": { "type": "Point", "coordinates": [ -120.032548, 37.529487 ] } },
{ "type": "Feature", "properties": { "name": "Markleeville", "geoname": "Markleeville", "seat": null, "largest": null, "county": "Alpine", "lat": 38.685560000000002, "lon": -119.84307 }, "geometry": { "type": "Point", "coordinates": [ -119.84307, 38.685558 ] } },
{ "type": "Feature", "properties": { "name": "Martinez", "geoname": "Martinez", "seat": "seat", "largest": null, "county": "Contra Costa", "lat": 37.988709999999998, "lon": -122.10881000000001 }, "geometry": { "type": "Point", "coordinates": [ -122.108807, 37.988715 ] } },
{ "type": "Feature", "properties": { "name": "Marysville", "geoname": "Marysville", "seat": null, "largest": "largest", "county": "Yuba", "lat": 39.145499999999998, "lon": -121.59116 }, "geometry": { "type": "Point", "coordinates": [ -121.591163, 39.145499 ] } },
{ "type": "Feature", "properties": { "name": "Merced", "geoname": null, "seat": null, "largest": null, "county": "Merced", "lat": 37.33175, "lon": -120.47234 }, "geometry": { "type": "Point", "coordinates": [ -120.472344, 37.331751 ] } },
{ "type": "Feature", "properties": { "name": "Modesto", "geoname": "Modesto", "seat": null, "largest": null, "county": "Stanislaus", "lat": 37.663409999999999, "lon": -120.99011 }, "geometry": { "type": "Point", "coordinates": [ -120.990112, 37.66341 ] } },
{ "type": "Feature", "properties": { "name": "Napa", "geoname": null, "seat": null, "largest": null, "county": "Napa", "lat": 38.302169999999997, "lon": -122.28852000000001 }, "geometry": { "type": "Point", "coordinates": [ -122.288524, 38.302174 ] } },
{ "type": "Feature", "properties": { "name": "Nevada City", "geoname": null, "seat": "seat", "largest": null, "county": "Nevada", "lat": 39.257260000000002, "lon": -121.02076 }, "geometry": { "type": "Point", "coordinates": [ -121.020758, 39.257263 ] } },
{ "type": "Feature", "properties": { "name": "Oakland", "geoname": "Oakland", "seat": null, "largest": null, "county": "Alameda", "lat": 37.785200000000003, "lon": -122.19781 }, "geometry": { "type": "Point", "coordinates": [ -122.197811, 37.785199 ] } },
{ "type": "Feature", "properties": { "name": "Orland", "geoname": "Orland", "seat": null, "largest": "largest", "county": "Glenn", "lat": 39.745649999999998, "lon": -122.17899 }, "geometry": { "type": "Point", "coordinates": [ -122.178992, 39.745648 ] } },
{ "type": "Feature", "properties": { "name": "Oroville", "geoname": "Oroville", "seat": "seat", "largest": null, "county": "Butte", "lat": 39.498800000000003, "lon": -121.56641 }, "geometry": { "type": "Point", "coordinates": [ -121.566412, 39.498795 ] } },
{ "type": "Feature", "properties": { "name": "Oxnard", "geoname": "Oxnard", "seat": null, "largest": "largest", "county": "Ventura", "lat": 34.195050000000002, "lon": -119.18028 }, "geometry": { "type": "Point", "coordinates": [ -119.180285, 34.195054 ] } },
{ "type": "Feature", "properties": { "name": "Placerville", "geoname": "Placerville", "seat": "seat", "largest": null, "county": "El Dorado", "lat": 38.730890000000002, "lon": -120.8014 }, "geometry": { "type": "Point", "coordinates": [ -120.801404, 38.730892 ] } },
{ "type": "Feature", "properties": { "name": "Portola", "geoname": "Portola", "seat": null, "largest": null, "county": "Plumas", "lat": 39.83813, "lon": -120.48005000000001 }, "geometry": { "type": "Point", "coordinates": [ -120.480055, 39.838128 ] } },
{ "type": "Feature", "properties": { "name": "Quincy", "geoname": "Quincy", "seat": "seat", "largest": null, "county": "Plumas", "lat": 39.92942, "lon": -120.95199 }, "geometry": { "type": "Point", "coordinates": [ -120.951994, 39.929416 ] } },
{ "type": "Feature", "properties": { "name": "Rancho Calaveras", "geoname": null, "seat": null, "largest": "largest", "county": "Calaveras", "lat": 38.125129999999999, "lon": -120.85699 }, "geometry": { "type": "Point", "coordinates": [ -120.85699, 38.125134 ] } },
{ "type": "Feature", "properties": { "name": "Red Bluff", "geoname": "Red Bluff", "seat": null, "largest": null, "county": "Tehama", "lat": 40.157330000000002, "lon": -122.23495 }, "geometry": { "type": "Point", "coordinates": [ -122.23495, 40.157331 ] } },
{ "type": "Feature", "properties": { "name": "Redding", "geoname": "Redding", "seat": null, "largest": null, "county": "Shasta", "lat": 40.598590000000002, "lon": -122.35818 }, "geometry": { "type": "Point", "coordinates": [ -122.358175, 40.598589 ] } },
{ "type": "Feature", "properties": { "name": "Redwood City", "geoname": "Redwood City", "seat": "seat", "largest": null, "county": "San Mateo", "lat": 37.526580000000003, "lon": -122.20627 }, "geometry": { "type": "Point", "coordinates": [ -122.206273, 37.52658 ] } },
{ "type": "Feature", "properties": { "name": "Riverside", "geoname": null, "seat": null, "largest": null, "county": "Riverside", "lat": 33.949269999999999, "lon": -117.36368 }, "geometry": { "type": "Point", "coordinates": [ -117.36368, 33.949274 ] } },
{ "type": "Feature", "properties": { "name": "Roseville", "geoname": "Roseville", "seat": null, "largest": "largest", "county": "Placer", "lat": 38.760440000000003, "lon": -121.28632 }, "geometry": { "type": "Point", "coordinates": [ -121.286318, 38.760442 ] } },
{ "type": "Feature", "properties": { "name": "Sacramento", "geoname": null, "seat": null, "largest": null, "county": "Sacramento", "lat": 38.57873, "lon": -121.46679 }, "geometry": { "type": "Point", "coordinates": [ -121.466786, 38.57873 ] } },
{ "type": "Feature", "properties": { "name": "Salinas", "geoname": "Salinas", "seat": null, "largest": null, "county": "Monterey", "lat": 36.689630000000001, "lon": -121.63518999999999 }, "geometry": { "type": "Point", "coordinates": [ -121.635188, 36.689631 ] } },
{ "type": "Feature", "properties": { "name": "San Andreas", "geoname": "San Andreas", "seat": "seat", "largest": null, "county": "Calaveras", "lat": 38.192320000000002, "lon": -120.66959 }, "geometry": { "type": "Point", "coordinates": [ -120.669588, 38.192315 ] } },
{ "type": "Feature", "properties": { "name": "San Bernardino", "geoname": null, "seat": null, "largest": null, "county": "San Bernardino", "lat": 34.136809999999997, "lon": -117.29277999999999 }, "geometry": { "type": "Point", "coordinates": [ -117.29278, 34.136809 ] } },
{ "type": "Feature", "properties": { "name": "San Diego", "geoname": null, "seat": null, "largest": null, "county": "San Diego", "lat": 32.727930000000001, "lon": -117.15528999999999 }, "geometry": { "type": "Point", "coordinates": [ -117.15529, 32.72793 ] } },
{ "type": "Feature", "properties": { "name": "San Francisco", "geoname": null, "seat": null, "largest": null, "county": "San Francisco", "lat": 37.778010000000002, "lon": -122.43127 }, "geometry": { "type": "Point", "coordinates": [ -122.431272, 37.778008 ] } },
{ "type": "Feature", "properties": { "name": "San Jose", "geoname": "San Jose", "seat": null, "largest": null, "county": "Santa Clara", "lat": 37.354559999999999, "lon": -121.88384000000001 }, "geometry": { "type": "Point", "coordinates": [ -121.883844, 37.354559 ] } },
{ "type": "Feature", "properties": { "name": "San Luis Obispo", "geoname": null, "seat": null, "largest": null, "county": "San Luis Obispo", "lat": 35.266779999999997, "lon": -120.65944 }, "geometry": { "type": "Point", "coordinates": [ -120.659441, 35.266778 ] } },
{ "type": "Feature", "properties": { "name": "San Rafael", "geoname": "San Rafael", "seat": null, "largest": null, "county": "Marin", "lat": 37.963149999999999, "lon": -122.4883 }, "geometry": { "type": "Point", "coordinates": [ -122.488299, 37.963147 ] } },
{ "type": "Feature", "properties": { "name": "Santa Ana", "geoname": "Santa Ana", "seat": "seat", "largest": null, "county": "Orange", "lat": 33.732250000000001, "lon": -117.88083 }, "geometry": { "type": "Point", "coordinates": [ -117.880826, 33.732249 ] } },
{ "type": "Feature", "properties": { "name": "Santa Barbara", "geoname": null, "seat": "seat", "largest": null, "county": "Santa Barbara", "lat": 34.389659999999999, "lon": -119.70265000000001 }, "geometry": { "type": "Point", "coordinates": [ -119.702652, 34.389656 ] } },
{ "type": "Feature", "properties": { "name": "Santa Cruz", "geoname": null, "seat": null, "largest": null, "county": "Santa Cruz", "lat": 36.967260000000003, "lon": -122.03551 }, "geometry": { "type": "Point", "coordinates": [ -122.035505, 36.967259 ] } },
{ "type": "Feature", "properties": { "name": "Santa Maria", "geoname": "Santa Maria", "seat": null, "largest": "largest", "county": "Santa Barbara", "lat": 34.92942, "lon": -120.44226999999999 }, "geometry": { "type": "Point", "coordinates": [ -120.442266, 34.929421 ] } },
{ "type": "Feature", "properties": { "name": "Santa Rosa", "geoname": "Santa Rosa", "seat": null, "largest": null, "county": "Sonoma", "lat": 38.463410000000003, "lon": -122.71893 }, "geometry": { "type": "Point", "coordinates": [ -122.718931, 38.463407 ] } },
{ "type": "Feature", "properties": { "name": "Sonora", "geoname": "Sonora", "seat": null, "largest": null, "county": "Tuolumne", "lat": 37.981310000000001, "lon": -120.38249999999999 }, "geometry": { "type": "Point", "coordinates": [ -120.382499, 37.981314 ] } },
{ "type": "Feature", "properties": { "name": "South Lake Tahoe", "geoname": "South Lake Tahoe", "seat": null, "largest": "largest", "county": "El Dorado", "lat": 38.945990000000002, "lon": -119.98662 }, "geometry": { "type": "Point", "coordinates": [ -119.986619, 38.94599 ] } },
{ "type": "Feature", "properties": { "name": "Stockton", "geoname": "Stockton", "seat": null, "largest": null, "county": "San Joaquin", "lat": 37.945189999999997, "lon": -121.28462 }, "geometry": { "type": "Point", "coordinates": [ -121.284615, 37.945186 ] } },
{ "type": "Feature", "properties": { "name": "Susanville", "geoname": "Susanville", "seat": null, "largest": null, "county": "Lassen", "lat": 40.424819999999997, "lon": -120.6549 }, "geometry": { "type": "Point", "coordinates": [ -120.654902, 40.424819 ] } },
{ "type": "Feature", "properties": { "name": "Truckee", "geoname": "Truckee", "seat": null, "largest": "largest", "county": "Nevada", "lat": 39.341790000000003, "lon": -120.18658000000001 }, "geometry": { "type": "Point", "coordinates": [ -120.186585, 39.341792 ] } },
{ "type": "Feature", "properties": { "name": "Ukiah", "geoname": "Ukiah", "seat": null, "largest": null, "county": "Mendocino", "lat": 39.147120000000001, "lon": -123.20744000000001 }, "geometry": { "type": "Point", "coordinates": [ -123.20744, 39.147123 ] } },
{ "type": "Feature", "properties": { "name": "Vallejo", "geoname": "Vallejo", "seat": null, "largest": "largest", "county": "Solano", "lat": 38.124659999999999, "lon": -122.22854 }, "geometry": { "type": "Point", "coordinates": [ -122.228542, 38.124663 ] } },
{ "type": "Feature", "properties": { "name": "Ventura", "geoname": null, "seat": "seat", "largest": null, "county": "Ventura", "lat": 34.458419999999997, "lon": -119.09036999999999 }, "geometry": { "type": "Point", "coordinates": [ -119.090374, 34.458416 ] } },
{ "type": "Feature", "properties": { "name": "Visalia", "geoname": "Visalia", "seat": null, "largest": null, "county": "Tulare", "lat": 36.330509999999997, "lon": -119.30728999999999 }, "geometry": { "type": "Point", "coordinates": [ -119.307288, 36.330511 ] } },
{ "type": "Feature", "properties": { "name": "Weaverville", "geoname": "Weaverville", "seat": null, "largest": null, "county": "Trinity", "lat": 40.734830000000002, "lon": -122.92739 }, "geometry": { "type": "Point", "coordinates": [ -122.92739, 40.734825 ] } },
{ "type": "Feature", "properties": { "name": "Willows", "geoname": "Willows", "seat": "seat", "largest": null, "county": "Glenn", "lat": 39.515610000000002, "lon": -122.20037000000001 }, "geometry": { "type": "Point", "coordinates": [ -122.200372, 39.515611 ] } },
{ "type": "Feature", "properties": { "name": "Woodland", "geoname": "Woodland", "seat": "seat", "largest": null, "county": "Yolo", "lat": 38.681449999999998, "lon": -121.75277 }, "geometry": { "type": "Point", "coordinates": [ -121.752768, 38.681446 ] } },
{ "type": "Feature", "properties": { "name": "Yreka", "geoname": "Yreka", "seat": null, "largest": null, "county": "Siskiyou", "lat": 41.729170000000003, "lon": -122.64172000000001 }, "geometry": { "type": "Point", "coordinates": [ -122.641722, 41.72917 ] } },
{ "type": "Feature", "properties": { "name": "Yuba City", "geoname": null, "seat": "seat", "largest": null, "county": "Yuba", "lat": 39.146610000000003, "lon": -121.63301 }, "geometry": { "type": "Point", "coordinates": [ -121.633009, 39.146607 ] } },
{ "type": "Feature", "properties": { "name": "Jackson", "geoname": "Jackson", "seat": "seat", "largest": null, "county": "Amador", "lat": null, "lon": null }, "geometry": { "type": "Point", "coordinates": [ -120.767861, 38.344291 ] } },
{ "type": "Feature", "properties": { "name": "Bridgeport", "geoname": "Bridgeport", "seat": "seat", "largest": null, "county": "Mono", "lat": null, "lon": null }, "geometry": { "type": "Point", "coordinates": [ -119.206915, 38.247514 ] } }
]
}
;
