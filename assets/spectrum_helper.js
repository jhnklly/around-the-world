
function initSpectrum(drawn_obj) {

    var color = drawn_obj.options.color || drawn_obj.options.custom_color || '#000011';

    var outline_color = hex2rgba(color,0.8);
    var fill_color = hex2rgba(color,0.2);
    $("#colorPicker").css('border-color',outline_color);
    $("#colorPicker").css('background-color',fill_color);


    $("#colorPicker").spectrum({
        //color: "#000",
        color: color,
        showInitial: true,
        showInput: true,
        preferredFormat: 'hex',
        d_obj: drawn_obj,
        clickoutFiresChange: true, // defaults to cancelling/reverting color
        show: function(){
            //$("#colorPicker").css('background-color',drawn_obj.options.color);
        }
    });


    $(".sp-choose").on('change', {d_obj: drawn_obj}, function(e) {
      console.log($('.sp-input'));
      tinycolor = $('.sp-input');
    });

    $("#colorPicker").on('move.spectrum,dragstop.spectrum', {d_obj: drawn_obj}, function(e, tinycolor) {
        //console.log('drag',tinycolor.toHexString());
        var outline_color = hex2rgba(tinycolor.toHexString(),0.8);
        var fill_color = hex2rgba(tinycolor.toHexString(),0.2);

        if ( e.data.d_obj.gin_type == 'marker' ) {
            customIcon.options.strokeColor = customIcon.options.markerColor = tinycolor.toHexString();
            e.data.d_obj.setIcon(customIcon);
            e.data.d_obj.options.custom_color = tinycolor.toHexString();
            //http://a.tiles.mapbox.com/v3/marker/pin-s+009900.png
        } else {
            console.log(e.data.d_obj.options.style);
            var newStyle = {
              color: tinycolor.toHexString(),
              fillColor: tinycolor.toHexString(),
              weight: 1,
              opacity: 0.9,
              fillOpacity: 0.5
            };
            e.data.d_obj.setStyle(newStyle);
        }
        $("#colorPicker").css('border-color',outline_color);
        $("#colorPicker").css('background-color',fill_color);
    });


    $('#annotation').val(drawn_obj.options.anno);

    $('#custom_info_save').click( {d_obj: drawn_obj}, function(e, d_obj) {
        e.data.d_obj.options.anno = $('#annotation').val();
        a = $(".leaflet-popup-close-button")[0];
        $(a).click();
    });
}

function getCustomizer() {
    //customize_ui = createCustomizeUI();
    var customize_ui = '';
    customize_ui += '<div class="middle-aligner"> <a href="javascript:void(0)" id="colorPicker" class="button-c"> </a> ';
    customize_ui += ' <a href="javascript:void(0)" id="custom_info_save" class="button-b">Save</a>';
    customize_ui += '</div>';
    return customize_ui;
}

function setPopups(layer) {
    var new_dist, new_area;

    console.log(layer);

    layer.unbindPopup();

    if (layer instanceof L.Marker) {
        layer.gin_type = 'marker';
        layer.options.custom_color = layer.options.custom_color ? layer.options.custom_color : "#ff0000";
        customIcon.options.strokeColor = customIcon.options.markerColor = layer.options.custom_color;
        layer.setIcon(customIcon);
        layer.bindPopup(getCustomizer());
    }
    if (layer instanceof L.Circle) {

        layer.gin_type = 'circle';
        layer.bindPopup('<div class="drawing-stats">Radius: ' +'<br>Area: ' + ' acres</div>' + getCustomizer());


    }
    if (layer instanceof L.Polyline) {

        layer.gin_type = 'polyline';
        layer.bindPopup('<div class="drawing-stats">' + '</div>' + getCustomizer());
    }
    if (layer instanceof L.Polygon) {
        layer.gin_type = 'polygon';
        layer.bindPopup('<div class="drawing-stats">'+ '</div>' + getCustomizer());
        //layer.bindPopup(L.GeometryUtil.readableArea(area));
    }

    A.map.on('popupopen', function(e) {
        //var marker = e.popup._source;
        initSpectrum(e.popup._source);
    });

}


function hex2rgba(hex,opacity){
    R = hexToR(hex);
    G = hexToG(hex);
    B = hexToB(hex);
    rgba = 'rgba('+R+','+G+','+B+','+opacity+')';
    return rgba;
}

function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16);}
function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16);}
function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16);}
function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h;}


var getShapeType = function(layer) {

    if (layer instanceof L.Circle) {
        return 'circle';
    }

    if (layer instanceof L.Marker) {
        return 'marker';
    }

    if ((layer instanceof L.Polyline) && ! (layer instanceof L.Polygon)) {
        return 'polyline';
    }

    if ((layer instanceof L.Polygon) && ! (layer instanceof L.Rectangle)) {
        return 'polygon';
    }

    if (layer instanceof L.Rectangle) {
        return 'rectangle';
    }

};
