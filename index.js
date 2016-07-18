/*
TODO:
Logic:

*/

var A = {};
var LAT = 37.7677,
  LON = -122.456,
  ZED = 8;

var defaultFillOpacity = 0.5;
var doneColor = "#999";
var strokeWeight = 1;

A.dataUrl = "assets/ne50_aroundworld.geojson";
A.polyStyle = {
    "color": "#000",
    "fillColor": "#fff",
    "weight": strokeWeight,
    "opacity": 0.2,
    "fillOpacity": defaultFillOpacity
};
A.focusStyle = {
    "color": "#fc0",
    "fillColor": "#fff",
    "weight": 5,
    "opacity": 0.8,
    "fillOpacity": 0
};
A.correctStyle = {
    "color": doneColor,
    "fillColor": "#080",
    "weight": strokeWeight,
    "opacity": 0.8,
    "fillOpacity": defaultFillOpacity
};
A.incorrectStyle = {
    "color": doneColor,
    "fillColor": "#f00",
    "weight": strokeWeight,
    "opacity": 0.8,
    "fillOpacity": defaultFillOpacity
};
A.currInt = 0;
A.currAttr = "test";
A.countCorrect = 0;
A.countAll = 0;

document.addEventListener("DOMContentLoaded", function(event) {
  init();
});

function init() {
  A.map = L.map('fullMap',{'zoomControl': true, 'attributionControl': false}).setView([LAT, LON], ZED);
  A.baselayer.addTo( A.map );

  /*L.control.zoom({
       position:'topright'
  }).addTo(A.map);*/

  A.map.zoomControl.setPosition('bottomright');
  //A.map.attributionControl.setPrefix('');
  //A.map.attributionControl = false;

  resetData(A.dataUrl);

  d3.select('#data-select')
    .on('change', function(v){
      var fileUrl = "assets/" + d3.select(this).property('value');
      resetData(fileUrl);

      console.log(d3.select(this).property('value'));

      if ( d3.select(this).property('value') === "wilderness_norcal.geojson" ) {
        var basemapIdx = 3;
        A.baselayer = L.tileLayer(A.basemaps[basemapIdx].url, {
            maxZoom: 20,
            attribution: A.basemaps[basemapIdx].attribution
        });
        A.baselayer.addTo( A.map );
      } else {
        var basemapIdx = 2;
        A.baselayer = L.tileLayer(A.basemaps[basemapIdx].url, {
            maxZoom: 20,
            attribution: A.basemaps[basemapIdx].attribution
        });
        A.baselayer.addTo( A.map );
      }

    })
  ;
}

function resetData(fileUrl) {
  d3.json(fileUrl, function(data){
    console.log(data);
    A.data = data;
    A.names = A.data.features.map(function(v){
      return v.properties.name;
    }).filter(function(v){
      return v && v.length > 0;
    });
    A.namesPop = A.names;
    A.namesAlpha = sortCopy(A.names);

    //processJSON(A.rules);
    if (A.gjLayer) {
      A.map.removeLayer(A.gjLayer);
    }
    A.gjLayer = L.geoJson(A.data, {
      style: A.polyStyle
    });
    A.gjLayer.addTo(A.map);


    var currFeature = A.data.features[A.currInt];
    //A.currInt++;
    //var currFeature = A.data.features[getRandomInt(0,A.data.features.length)];
    A.currAttr = currFeature.properties.name;

    //console.log(currFeature.properties.name);
    A.gjLayer.eachLayer(function (layer) {
      //console.log(layer);
      if(layer.feature.properties.name === A.currAttr) {
        A.map.fitBounds(layer.getBounds());
        layer.setStyle(A.focusStyle)
      }
    });


    $('#response').typeahead('destroy');

    A.typeahead = $('#response').typeahead({
      hint: true,
      highlight: true,
      minLength: 1
    },
    {
      name: 'typeahead',
      source: substringMatcher(A.namesAlpha)
    });

    //A.typeahead.data('typeahead').source = A.namesAlpha;

  });

  d3.select("#enter").on("click", function(){
    //var result = false;
    var response = document.querySelector('#response').value.toUpperCase().trim();
    var answer = A.currAttr.toUpperCase().trim();
    var toast = "";
    A.gjLayer.eachLayer(function (layer) {
      if(layer.feature.properties.name === A.currAttr) {
        if ( response === answer ) {
          layer.setStyle(A.correctStyle);
          A.countCorrect++;
          toast += A.currAttr + " was correct! ";
        } else {
          layer.setStyle(A.incorrectStyle);
          toast += "The correct answer was " + A.currAttr;
          toast += '<br>You said "' + document.querySelector('#response').value + '"';
        }
        A.countAll++;
      }
    });

    document.querySelector('#current-number').innerHTML = A.countAll + 1;
    document.querySelector('#toast').innerHTML = toast;
    document.querySelector('#count-correct').innerHTML = A.countCorrect;
    document.querySelector('#count-all').innerHTML = A.countAll;
    document.querySelector('#count-percent').innerHTML = parseInt(100 * (A.countCorrect / A.countAll)) + "%";
    document.querySelector('#response').value = "";

    var currFeature = A.data.features[A.currInt];
    A.currInt++;
    //var currFeature = A.data.features[getRandomInt(0,A.data.features.length)];
    //A.currAttr = currFeature.properties.name;
    if (1==1) {
      A.currAttr = A.namesPop[A.currInt];
    } else {

    }

    console.log(currFeature.properties.name);
    A.gjLayer.eachLayer(function (layer) {
      //console.log(layer);
      if(layer.feature.properties.name === A.currAttr) {
        A.map.fitBounds(layer.getBounds());
        //A.map.setZoom(A.map.getZoom() - 1);
        layer.setStyle(A.focusStyle)
      }
    });

  });

}


var substringMatcher = function(strs) {
  return function findMatches(q, cb) {
    var matches, substringRegex;

    // an array that will be populated with substring matches
    matches = [];

    // regex used to determine if a string contains the substring `q`
    substrRegex = new RegExp(q, 'i');

    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
    $.each(strs, function(i, str) {
      if (substrRegex.test(str)) {
        matches.push(str);
      }
    });

    cb(matches);
  };
};

$('input.typeahead').keypress(function (e) {
    if (e.which == 13) {
        /*var selectedValue = $('input.typeahead').data().ttView.dropdownView.getFirstSuggestion().datum.id;
        $("#value_id").val(selectedValue);
        */
        console.log('enter');
        //$('form').submit();
        $('#enter').click();
        //$('input.typeahead').val("");
        //$('input.typeahead').typeahead('val', '');
        $('.typeahead').typeahead('close');
        $('input.typeahead').val("");
        //$('input.typeahead').typeahead('setQuery', '');
        return true;
    }
});

A.basemaps = [
  {
    "url": "http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
    "attribution": '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://cartodb.com/attributions">CartoDB</a>',
    "maxZoom": 19
  },
  {
    "url": "http://{s}.tile.openstreetmap.us/usgs_large_scale/{z}/{x}/{y}.png",
    "attribution": 'USGS Large Scale Imagery',
    "maxZoom": 20
  },
  {
    "url": "http://server.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}.png",
    "attribution": 'Map tiles by <a target="_blank" href="http://www.esri.com">esri</a>.',
    "maxZoom": 18
  },
  {
    "url": "https://api.mapbox.com/styles/v1/mapbox/outdoors-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoiamhua2xseSIsImEiOiIxLUVDMzVNIn0.MguPdmGTQUvosyLINY3wGQ",
    "attribution": 'Map tiles by <a target="_blank" href="http://www.mapbox.com">Mapbox</a>.',
    "maxZoom": 18
  }
];

var basemapIdx = 2;
A.baselayer = L.tileLayer(A.basemaps[basemapIdx].url, {
    maxZoom: 20,
    attribution: A.basemaps[basemapIdx].attribution
});

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sortCopy(arr) {
  return arr.slice(0).sort();
}