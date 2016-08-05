/*
TODO:
Logic:

*/

var A = {};
var LAT = 37.7677,
  LON = -122.456,
  ZED = 8;

//var defaultFillOpacity = 0.5;
var defaultFillOpacity = 1;
var doneColor = "#999";
var strokeWeight = 1;
var correctColor = "#01A59F";
var wrongColor = "#7F00FF";
/*
var correctColor = "#0086FF";
var wrongColor = "#E4971A";
*/
var boundsOpts = {
  paddingTopLeft: [10,10],
  //paddingBottomRight: [40,300],
  paddingBottomRight: [10,200],
  maxZoom: 20
};


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
var basemapIdx = 0;


A.dataUrl = "assets/ne50_aroundworld.geojson";
//A.dataUrl = "assets/ca_counties_simp2.geojson";
A.datasets = {
  "world": { file: "ne50_aroundworld.geojson", baseIdx: 0 },
  "calif": { file: "ca_counties_simp2.geojson", baseIdx: 3 },
  "sf": { file: "sf_planning_neighborhoods.geojson", baseIdx: 3 },
  "wild": { file: "wilderness_norcal.geojson", baseIdx: 3 },
};
A.currDataName = "world";

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
    "weight": 4,
    "opacity": 0.6,
    "fillOpacity": 1
};
A.correctStyle = {
    "color": doneColor,
    "fillColor": correctColor,
    "weight": strokeWeight,
    "opacity": 0.8,
    "fillOpacity": 0.5 * defaultFillOpacity
};
A.incorrectStyle = {
    "color": doneColor,
    "fillColor": wrongColor,
    "weight": strokeWeight,
    "opacity": 0.8,
    "fillOpacity": 0.5 * defaultFillOpacity
};
A.currInt = 0;
A.currAttr = "test";
A.countCorrect = 0;
A.countAll = 0;

styleRosetta = {
  fillColor: {
    css: "background-color",
    leaflet: "fillColor",
    simplestyle: "fill",
    example: "#0ff",
    type: "color"
  },
  strokeColor: {
    css: "border-color",
    leaflet: "color",
    simplestyle: "fill-opacity",
    example: "#f0f",
    type: "color"
  },
  fillOpacity: {
    css: "",
    leaflet: "fillOpacity",
    simplestyle: "",
    example: 0.4,
    type: "float"
  },
  strokeOpacity: {
    css: "",
    leaflet: "opacity",
    simplestyle: "stroke-opacity",
    example: 0.8,
    type: "float"
  },
  strokeWidth: {
    css: "border-width",
    leaflet: "weight",
    simplestyle: "stroke-width",
    example: 3,
    type: "float"
  }
}

/*
for (var k in styleRosetta) {
  console.log(styleRosetta[k].css + ": " + styleRosetta[k].example + ";");
  d3.select('.leaflet-popup-content').append('div')
    .attr('class', 'swatch')
    .text(styleRosetta[k].css + ": " + styleRosetta[k].example + ";")
    .attr('style', function(){
      var ret = styleRosetta[k].css + ": " + styleRosetta[k].example + ";";
      return ret;
    })
}
*/

A.skip = ['San Francisco','Alameda','Contra Costa','Santa Clara','San Mateo','Santa Cruz','Marin','Sonoma','Napa','Solano','Mendocino','Monterey','Del Norte', 'Humboldt', 'San Luis Obispo', 'Santa Barbara', 'Ventura', 'Los Angeles','Orange','San Diego','San Bernardino','Riverside','San Joaquin','Lake'];
A.level = "ADVANCED";

document.addEventListener("DOMContentLoaded", function(event) {
  init();
});

function init() {
  A.map = L.map('fullMap',{'zoomControl': true, 'attributionControl': false}).setView([LAT, LON], ZED);
  A.baselayer.addTo( A.map );

  A.map.zoomControl.setPosition('bottomright');
  //A.map.attributionControl.setPrefix('');
  //A.map.attributionControl = false;

  resetData(A.dataUrl);

  d3.select('#data-select')
    .on('change', function(v){
      resetData();
    })
  ;
}

d3.selectAll('input[name=advanced]')
  .on('change', function(v) {
    resetData(A.dataUrl);
});

d3.selectAll('input[name=opts]')
  .on('change', function(v) {
    resetData(A.dataUrl);
});

//function resetData(fileUrl) {
function resetData() {
  // Get the dataset/filename
  var optValue = d3.select('#data-select').property('value');
  var fileUrl = "assets/" + A.datasets[optValue].file;
  A.currDataName = optValue;

  // Advanced?
  A.level = $('input[name=advanced]:checked').val();

  // Set the appropriate basemap
  // If advanced, use a map without labels
  if (A.level === "ADVANCED" && A.currDataName !== "world") {
    basemapIdx = 2;
  } else {
    basemapIdx = A.datasets[optValue].baseIdx;
  }
  A.map.removeLayer(A.baselayer);
  A.baselayer = L.tileLayer(A.basemaps[basemapIdx].url, {
      maxZoom: 20,
      attribution: A.basemaps[basemapIdx].attribution
  });
  A.baselayer.addTo( A.map );


  d3.json(fileUrl, function(data){
    A.data = data;
    if ( A.level == "ADVANCED") {
      A.data.features = A.data.features.filter(function(el){
        return A.skip.indexOf(el.properties.name) < 0;
      });
    }

    A.polyStyle.fillOpacity = 0.7;
    A.focusStyle.fillOpacity = 0;

    if (A.currDataName === "world") {
      A.polyStyle.fillOpacity = defaultFillOpacity;
      A.focusStyle.fillOpacity = defaultFillOpacity;
      A.data.features = A.data.features.filter(function(el){
        return el.properties.name && el.properties.name.length > 0 && el.properties.homepart !== '-99.0' && el.properties.area_sqkm > 6000 || el.properties.name == 'Palestine';
      });

      if ( A.level == "ADVANCED") {
        A.data.features = A.data.features.filter(function(el){
          return el.properties.continent === 'Africa';
        });
      }
    }

    if (A.currDataName !== "world") {
      $('input[name=opts][value=random').click();
    }
    var sortOrder = $('input[name=opts]:checked').val();

    if (sortOrder === "random") {
        A.data.features = shuffle(A.data.features);
    }
    if (A.currDataName === "world" && sortOrder === "pop") {
        A.data.features.sort(function(a,b){
            if (a.properties.pop_mill > b.properties.pop_mill) {
              return -1;
            }
            return 1;
        });
    }
    if (A.currDataName === "world" && sortOrder === "area") {
        A.data.features.sort(function(a,b){
            if (a.properties.area_sqkm > b.properties.area_sqkm)
              return -1;
            return 1;
        });
    }

    A.names = A.data.features.map(function(v){
      return v.properties.name;
    });

    A.namesPop = A.names;
    A.namesAlpha = sortCopy(A.names);

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

    A.gjLayer.eachLayer(function (layer) {
      setPopups(layer);
      if(layer.feature.properties.name === A.currAttr) {
        A.map.fitBounds(layer.getBounds(), boundsOpts);
        layer.setStyle(A.focusStyle)
      }
    });


    $('#response').typeahead('destroy');

    A.typeahead = $('#response').typeahead({
      hint: true,
      highlight: true,
      autoselect: true,
      minLength: 1
    },
    {
      name: 'typeahead',
      source: substringMatcher(A.namesAlpha)
    })
    .on('typeahead:select', function(e,text){

        $('input.typeahead').val(text);
        console.log(text);
        $('#enter').click();
        $('.typeahead').typeahead('close');
        $('input.typeahead').val("");
        return true;
    });


    //A.typeahead.data('typeahead').source = A.namesAlpha;
    $('#response').focus();

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
          toast = '<i class="fa fa-check-circle" aria-hidden="true"></i>';
          //toast = '<i class="material-icons">done</i>';
          d3.select('#toast').classed('correct',true);
          d3.select('#toast').classed('incorrect',false);

        } else {
          layer.setStyle(A.incorrectStyle);
          toast += "The correct answer was " + A.currAttr;
          toast += '<br>You said "' + document.querySelector('#response').value + '"';
          console.log(toast);
          //toast = "✕";
          toast = '<i class="fa fa-times-circle" aria-hidden="true"></i>';
          d3.select('#toast').classed('correct',false);
          d3.select('#toast').classed('incorrect',true);
        }
        A.countAll++;
      }
    });

    //document.querySelector('#current-number').innerHTML = A.countAll + 1;
    document.querySelector('#toast').innerHTML = toast;
    document.querySelector('#count-correct').innerHTML = A.countCorrect;
    document.querySelector('#count-all').innerHTML = A.countAll;
    document.querySelector('#count-percent').innerHTML = parseInt(100 * (A.countCorrect / A.countAll)) + "%";
    document.querySelector('#response').value = "";

    var currFeature = A.data.features[A.currInt];
    A.currInt++;
    A.currAttr = A.namesPop[A.currInt];

    //$('#knowledge').collapse('hide');
    getKnowledge(A.currAttr);

    A.gjLayer.eachLayer(function (layer) {
      //console.log(layer);
      if(layer.feature.properties.name === A.currAttr) {

        $('#capital').val(layer.feature.properties.capital || "");

        setTimeout(function(){
          A.map.fitBounds(layer.getBounds(), boundsOpts );
        }, 1000);
        layer.setStyle(A.focusStyle);
      }
    });

  });

  // Move cursor to input
  $('#response').focus();

}

function getKnowledge(text) {

/*  var placesAPIKey = "AIzaSyDof1OssjhDFQWyyxqonAAAkknelZkJ6EU";
  var placesQuery = "https://kgsearch.googleapis.com/v1/entities:search?query="+text+"&key="+placesAPIKey+"&limit=1&indent=True";

  var placesQuery = "https://en.wikivoyage.org/w/api.php?action=query&titles="+text+"&prop=revisions&rvprop=content&format=json"
  console.log(placesQuery);
*/
  /*var service_url = 'https://kgsearch.googleapis.com/v1/entities:search';
  var params = {
    'query': text,
    'limit': 1,
    'indent': true,
    'key' : placesAPIKey,
  };*/
  var ret = "";
  //$.getJSON(service_url + '?callback=?', params, function(response) {
  /*
  $.getJSON(placesQuery, function(response) {
    console.log(response);
    //ret = response.itemListElement[0].result.detailedDescription.articleBody;
    pages = response.query.pages;
    for (var page in pages) {
      revision = pages[page].revisions[0];
      console.log(revision);
    }
    ret = replaceAll(ret, text, "...");
    //return ret;
    document.querySelector('#knowledge').innerHTML = ret;
  });
*/

/*  var queryData = {
    action: "query",
    titles: text,
    prop: "revisions",
    rvprop: "contents",
    //origin: "http://localhost:8000/",
    origin: "https://en.wikipedia.org/",
    format: "json"
  };
  var queryData = text;
*/
  $.ajax( {
      url: "https://en.wikivoyage.org/w/api.php",
      jsonp: "callback",
      dataType: 'jsonp',
      data: {
        action: "query",
        titles: text,
        prop: "revisions",
        rvprop: "content",
        format: "json"
      },
      xhrFields: { withCredentials: true },
      error: function (){
        document.querySelector('#knowledge').innerHTML = "";
      },
      success: function(response) {
        pages = response.query.pages;
        for (var page in pages) {
          revision = pages[page].revisions[0]["*"];

          //rev = revision.split("Quickbar")[1];
          rev = revision.split("nofollow")[1];
          rev = revision.split("==Regions==")[0];
          //console.log(rev);

          // 2nd call just to parse template format to html
          $.ajax( {
              url: "https://en.wikipedia.org/w/api.php",
              jsonp: "callback",
              dataType: 'jsonp',
              data: {
                action: "parse",
                text: rev,
                format: "json"
              },
              xhrFields: { withCredentials: true },
              error: function (){
                document.querySelector('#knowledge').innerHTML = "";
              },
              success: function(response2) {
                ret = response2.parse.text["*"];
                ret_arr = ret.split(". ");
                ret = ret_arr[ret_arr.length - 1];
                ret = replaceAll(ret, text, "...");
                ret = replaceAll(ret, "<p></p>", "");
                ret = replaceAll(ret, "<p><br /></p>", "");
                ret = ret.split("<!--")[0];
                ret = "<p>" + ret.trim();
                console.log(ret);

                document.querySelector('#knowledge').innerHTML = ret;
              }
          });

        }
        //console.log(response);
      }
  });

}

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

function replaceAll(target, search, replacement) {
    //var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

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

/*
$('input.typeahead').on('select')(function (e, text) {
    console.log(text);
    $('input.typeahead').val(text);

    $('#enter').click();
    $('.typeahead').typeahead('close');
    $('input.typeahead').val("");
    return true;
});
*/

$('input.typeahead').keypress(function (e) {

   /* A.typeahead.on('typeahead:select', function(e,text){

        $('input.typeahead').val(selectedValue);

        $('#enter').click();
        $('.typeahead').typeahead('close');
        $('input.typeahead').val("");
        return true;
    });*/

    if (e.which == 13) {
        /*var selectedValue = $('input.typeahead').data().ttView.dropdownView.getFirstSuggestion().datum.id;
        $("#value_id").val(selectedValue);
        */

        var selectedValue = $('input.tt-hint').val() || $('input.tt-input').val()

        // Grab the first hint, but not if another hint is clicked
        var selection = $('input.typeahead').parent().find('.tt-selectable:first')[0];

        if (selection) {
          selectedValue = selection.innerText;
        }

        $('input.typeahead').val(selectedValue);

        $('#enter').click();
        $('.typeahead').typeahead('close');
        $('input.typeahead').val("");
        return true;
    }
});


/*$('input.typeahead').bind('typeahead:render', function(e) {
    console.log('rendering');
    console.log( $('input.typeahead').parent().find('.tt-selectable:first')[0].innerText );
    $('input.typeahead').parent().find('.tt-selectable:first')
    //.addClass('tt-cursor');
});*/

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

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}



