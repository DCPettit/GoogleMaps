// JS Linker
// Template ID: 855755236875311900 //OLD: 720319321948567500 //VERY OLD: 643361218331276800 //REALY REALY OLD: 293597337205479360
// Template Name: Google Map
// Feb. 17, 2017 - March 20th, 2017
// Developers: Tim & David

var ApptexTemplatesMapping = (ApptexTemplatesMapping || {});
var ApptexLoadedJSFiles = (ApptexLoadedJSFiles || {});
(function (){
  var siteAbsoluteUrl ='https://salkeiz.sharepoint.com/sites/adminsandbox/maptesting';
  var tempURL = siteAbsoluteUrl + '/Apptexfiles/beta1_3_6_1/common/js/apptex.csr.js';
  if(!ApptexLoadedJSFiles['jscommon']){ document.write("<script src='" + tempURL + "'></script>"); ApptexLoadedJSFiles['jscommon'] = true; };
  tempURL = siteAbsoluteUrl + '/Apptexfiles/beta1_3_6_1/common/js/jquery-2.1.4.min.js';
  if (!ApptexLoadedJSFiles['jquery']) { document.write("<script src='" + tempURL + "'></script>"); ApptexLoadedJSFiles['jquery'] = true; };
  tempURL = siteAbsoluteUrl + '/Apptexfiles/beta1_3_6_1/common/js/handlebars.runtime-v4.0.2.js';
  if (!ApptexLoadedJSFiles['handlebarsruntime']) { document.write("<script src='" + tempURL + "'></script>"); ApptexLoadedJSFiles['handlebarsruntime'] = true; };
  ApptexTemplatesMapping["{e10c0f4d-3a43-41a4-b148-5b006f470f9b}"] = 855755236875311900;
  var ApptexObj = {};
  ApptexObj.Templates = {};
  ApptexObj.Variables =  {"height":"900px","width":"900px","centerLatitude":"44.954851","centerLongitude":"-123.028498","zoom":12,"scaleControl":true};
  ApptexObj.Fields =  {"fldTitle":"Title","fldLatitude":"Location_x003a_Latitude_x0028_de","fldLongitude":"Location_x003a_Longitude_x0028_d","fldincidentType":"IncidentType","fldLocation":"Location", "fldDescription":"Description", "fldRadiusSize":"RadiusSize", "fldAddress":"Address"};
  ApptexObj.Templates.View = function(ctx) {
  if(ctx.Templates.Body){
    ctx.Variables =  ApptexObj.Variables;
    var precompileTemplate = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
      var stack1, helper;
      return "<div id='"
        + container.escapeExpression(((helper = (helper = helpers.wpq || (depth0 != null ? depth0.wpq : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"wpq","hash":{},"data":data}) : helper)))
        + "canvas' style=\"height:"
        + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.Variables : depth0)) != null ? stack1.height : stack1), depth0))
        + "; width: "
        + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.Variables : depth0)) != null ? stack1.width : stack1), depth0))
        + "; margin: 0; padding: 0\"></div>  \r\n\r\n";
    },"useData":true});
  var returnHtml = ApptexCommon.GetView(precompileTemplate, ctx, ApptexObj.Fields);
  return returnHtml;
  }else{
    return RenderFooterTemplate(ctx);
  }
};
ApptexObj.ContexOnPreRender = function(ctx) {};
ApptexObj.ContexOnPostRender = function(ctx) {

  jQuery(function () { 

    // global variables
    var myLatLng;
    var siteAddress;
    var map;
    var geocoder;
    var Circles = [];
    var Markers = [];
    var Labels = [];
    var lColors = [];
    //var Salem = {lat: 44.922367, lng: -123.036895};
    var iconBase = 'http://maps.google.com/mapfiles/ms/icons/';
    var yellow = iconBase + 'yellow-dot.png';
    var blue = iconBase + 'blue-dot.png';
    var green = iconBase + 'green-dot.png';
    var red = iconBase + 'red-dot.png';
    //var normal = 'http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_gray.png';
    //var normal = 'https://salkeiz.sharepoint.com/sites/adminsandbox/maptesting/SiteAssets/icons/blueDot.png';
    var normal = 'https://salkeiz.sharepoint.com/sites/adminsandbox/maptesting/SiteAssets/icons/smallElementary.png';
    var none = 'https://salkeiz.sharepoint.com/sites/adminsandbox/maptesting/SiteAssets/icons/spacer.gif';
    //var none = 'https://developers.google.com/maps/documentation/javascript/images/circle.png';
    var link = none;
    var label = none;
    var mapOptions = { 
      scaleControl: ApptexObj.Variables.scaleControl, 
      zoom: ApptexObj.Variables.zoom, 
      mapTypeId: 'roadmap', /* HYBRID, ROADMAP, SATELLITE, TERRAIN */
      center: new google.maps.LatLng(ApptexObj.Variables.centerLatitude , ApptexObj.Variables.centerLongitude) };
    var clicked = 0;

    //----Suport Functions----------------------------------------------\\

    // Icon Color
    function iconColorName(iType) {
      if (iType == "Yellow") {
        icName = "yellow";
        } else if (iType == "Blue"){
          icName = "blue";
          } else if (iType == "Green"){
            icName = "green";
            } else if (iType == "Red"){
              icName = "red";
              } else{
                icName = "normal";
              }
      return icName;
    }

    // Icon Color
    function iconColor(iType) {
      if (iType == "Yellow") {
        link = yellow;
        } else if (iType == "Blue"){
          link = blue;
          } else if (iType == "Green"){
            link = green;
            } else if (iType == "Red"){
              link = red;
              } else{
                link = normal;
              }
      return link;
    } 

    // Label Color
    function labelColor(iLabel){
      var yellow = '#FDD017';
      var blue = '#151B54';
      var green = '#347235';
      var red = '#8C001A';
      var normal = '#25383C'; // dark gray
      var label = normal;
      if (iLabel == "Yellow") {
        label = yellow;
        } else if (iLabel == "Blue"){
          label = blue;
          } else if (iLabel == "Green"){
            label = green;
            } else if (iLabel == "Red"){
            label = red;
              } else {
                label = normal;
              }
      return label;
    } 

    // Text Size
    function textSize(iText){
      var text = '10px';
      if (iText != "_Normal") {
        text = '24px';}
      return text;
    }

    function getColor(theIcon) {
      switch(theIcon) {
        case "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png": //Yellow
            return "#ffff66"
            break;
        case "http://maps.google.com/mapfiles/ms/icons/blue-dot.png": //Blue
            return "#b3ffff"
            break;
        case "http://maps.google.com/mapfiles/ms/icons/green-dot.png": //Green
            return "#80ff80"
            break;
        case "http://maps.google.com/mapfiles/ms/icons/red-dot.png": //Red
            return "#ffb3b3"
            break;
        default:
            return "#eeeeee" // lt Gray
      }
    }

    // Zoom out button
    function CenterControl(controlDiv, map) {

        // Set CSS for the control border.
        var controlUI = document.createElement('div');
        controlUI.setAttribute("class", "buttonBorder");
        controlUI.title = 'Click to Zoom Top';
        controlDiv.appendChild(controlUI);

        // Set CSS for the control interior.
        var controlText = document.createElement('div');
        controlText.setAttribute("class", "buttonInterior");
        controlText.innerHTML = 'Zoom Top';
        controlUI.appendChild(controlText);

        // Setup the click event listeners
        controlUI.addEventListener('click', function() {
          map.setCenter(new google.maps.LatLng(ApptexObj.Variables.centerLatitude , ApptexObj.Variables.centerLongitude) );
          map.setZoom(12);
            for (i in Circles)
            {
                Circles[i].setMap(map);
            }
            for (i in Markers)
            {
                Markers[i].infowindow.close();
                if(lColors[i] == "normal"){
                  Markers[i].labelClass="blankLabel"};
            }
        });
    }// end function CenterControl

    var drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.STOP_DRAWING,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_RIGHT,
        //drawingModes: ['marker', 'circle', 'polygon', 'polyline', 'rectangle']
        drawingModes: ['marker', 'circle']
      },
      markerOptions: {icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'},
      circleOptions: {
        fillColor: '#ffff00',
        fillOpacity: 0.075,
        strokeOpacity: 0.8,
        strokeWeight: 1,
        clickable: true,
        editable: true,
        zIndex: 2
      }
    });

    // toggle schools
    function ToggleSchoolsControl(controlToggleDiv, map) {

        // Set CSS for the control border.
        var controlUI1 = document.createElement('div');
        controlUI1.setAttribute("class", "buttonBorder");
        controlUI1.title = 'Click to Toggle Schools';
        controlToggleDiv.appendChild(controlUI1);

        // Set CSS for the control interior.
        var controlText1 = document.createElement('div');
        controlText1.setAttribute("class", "buttonInterior");
        controlText1.innerHTML = 'Toggle Schools';
        controlUI1.appendChild(controlText1);

        // Setup the toggle click event listeners
        controlUI1.addEventListener('click', function() {
         
          if(clicked == 1) {
            //for (i in Markers) {
              for (i = 0; i < Labels.length; i++)
              {
              if(lColors[i] == "normal")
              {
                //Markers[i].setMap(map);
                Markers[i].visible=true;
                clicked = 0;
              }// end if (inner) 
            }// end for   
          } else {
              for (i in Markers) {
              if(lColors[i] == "normal")
              {
                //Markers[i].setMap(null);
                Markers[i].visible=false;
                clicked = 1;
              }// end if (inner) 
            }// end for
          }// end if (outer)
          for (i in Markers)
            {
                Markers[i].infowindow.close();
                if(lColors[i] == "normal"){
                  Markers[i].setLabel();
                 //Markers[i].visible=false;
                }
            }
        })// end toggle click event listeners
    }// end function 

    // toggle schools Names
    function ToggleSchoolsNamesControl(controlToggleNamesDiv, map) {

        // Set CSS for the control border.
        var controlUI2 = document.createElement('div');
        controlUI2.setAttribute("class", "buttonBorder");
        controlUI2.title = 'Click to Toggle Names';
        controlToggleDiv.appendChild(controlUI2);

        // Set CSS for the control interior.
        var controlText2 = document.createElement('div');
        controlText2.setAttribute("class", "buttonInterior");
        controlText2.innerHTML = 'Toggle Names';
        controlUI2.appendChild(controlText2);

        // Setup the toggle click event listeners
        controlUI2.addEventListener('click', function() {
          if(clicked == 0) {
            //console.log("clicked = " + clicked);
            for (i = 0; i < Markers.length; i++) {
              if(lColors[i] == "normal")
              { 
              // we go through the labels again...
              for (i = 0; i < Labels.length; i++)
                {
                    // ... and if the icon is 'normal' we will turn the labels on 
                    // Show
                    if(lColors[i] == "normal"){
                      Markers[i].labelClass="normalLabel";
                      //console.log("(" + i + ") " + "Label content = " + Markers[i].labelContent);
                    }
                }// end for
                clicked = 1;
              }// end if (inner) 
            }// end for   
          } else { /* if clicked = 1 */
              //console.log("clicked = " + clicked);
              for (i = 0; i < Markers.length; i++) {
              if(lColors[i] == "normal")
              {
                // ... and if the icon is 'normal' we will turn the labels off 
                // Hide
                Markers[i].labelClass="blankLabel";
                clicked = 0;
              }// end if (inner) 
            }// end for
          }// end if (outer)
        flashZoom();
        })// end toggle click event listeners
    }// end function 

    function flashZoom() {
        var zoomLevel = map.getZoom();
        map.setZoom(13);
        map.setZoom(zoomLevel);
    }

    // toggle Circles
    function ToggleCirclesControl(controlToggleCirclesDiv, map) {

        // Set CSS for the control border.
        var controlUI3 = document.createElement('div');
        controlUI3.setAttribute("class", "buttonBorder");
        controlUI3.title = 'Click to Toggle Circles';
        controlToggleDiv.appendChild(controlUI3);

        // Set CSS for the control interior.
        var controlText3 = document.createElement('div');
        controlText3.setAttribute("class", "buttonInterior");
        controlText3.innerHTML = 'Toggle Circles';
        controlUI3.appendChild(controlText3);

        // Setup the toggle click event listeners
        controlUI3.addEventListener('click', function() {
         
          if(clicked == 1) {
            //console.log("clicked = " + clicked + " i = " + i);
              for (i = 0; i < Circles.length; i++)
              {
                if(lColors[i] != "normal")
                {
                  Circles[i].setOptions({fillOpacity:0.10, strokeOpacity:0.8}); 
                  clicked = 0;
                }// end if (inner) 
              }// end for   
          } else {
            //console.log("clicked = " + clicked) + " i = " + i;
              for (i = 0; i < Circles.length; i++)
              {
                if(lColors[i] != "normal")
                {
                  Circles[i].setOptions({fillOpacity:0, strokeOpacity:0}); 
                  clicked = 1;
                }// end if (inner) 
            }// end for
          }// end if (outer)
        })// end toggle click event listeners
    }// end function 

    function drawMaker(i){
    var markerIcon = {
      url: iconColor(location[ApptexObj.Fields.fldincidentType]),
      //size: new google.maps.Size(10, 10),
      origin: new google.maps.Point(0,0),
      anchor: new google.maps.Point(0,0),
      scaledSize: new google.maps.Size(20, 20)
    };

    if(iconColorName(location[ApptexObj.Fields.fldincidentType]) != "normal"){
      markerIcon.scaledSize = new google.maps.Size(35, 35);
    }

    // Set the class for label display
    var iColor = iconColorName(location[ApptexObj.Fields.fldincidentType]);
    if(iColor != "normal") {
      var lClass = "incidentLabel"
    } else {
      var lClass = "normalLabel"
    };

    var markerLabel = location[ApptexObj.Fields.fldTitle];

    var marker = {
      map: map,
      animation: google.maps.Animation.DROP,
      //position: markerLatLng,
      position: myLatLng,//geocodeAddress(geocoder, map),
      icon: markerIcon,
      labelContent: markerLabel,
      labelAnchor: new google.maps.Point(-15, 7),
      labelClass: lClass, // your desired CSS class
      labelInBackground: true,
      infowindow: infowindow,
      zIndex: i,
      id: i
    }; //end marker
    // place marker in an array
    Markers[i] = new MarkerWithLabel(marker);
    Labels[i] = markerLabel;
    lColors[i] = iColor;
    //console.log("Location: " + markerLabel + ", " + myLatLng); 
    }// end drawMarker

    // build the circles 
    function drawCircle(i){
        if(lColors[i] != "normal"){
          var circleOptions = {
              radius: metersToMiles(location[ApptexObj.Fields.fldRadiusSize]),
              fillColor: lColors[i],
              strokeColor: '#eeeeee',
              id: i,
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillOpacity: 0.10,
              map: map,
              center: myLatLng
          };
        };
        // place circle in an array
        Circles[i] = new google.maps.Circle(circleOptions);
    }// end build the circles

    // Change Meters to Miles
    function metersToMiles(xMiles) {
      var multiplyer = 1609.34; // Conversion factor for meters to miles
      var meters = xMiles * multiplyer;
      return meters;
    }

    // Find custom address's
    function geocodeAddress(geocoder, resultsMap) {
        var address = location[ApptexObj.Fields.fldAddress];
        geocoder.geocode({'address': address}, function(results, status) {
          if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            myLatLng = results[0].geometry.location;
            // draw the markers
            drawMaker(i);
            // draw the circles
            drawCircle(i);//*/
            // Add add Event Listener
            addListnerToMarkers(i)
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });
      }

    //Add listner to markers
    function addListnerToMarkers(i){
      Markers[i].addListener('click', function() {
      // open the info popup when you click on any marker
      this.infowindow.open(map, this);
      // if the icon (marker) is not 'normal', so it is an incident we want to pan and zoom...
      if(lColors[this.id] != "normal"){
        console.log("Pan and Zoom");
        map.panTo(this.getPosition());
        map.setZoom(15);
        // Now we go through the labels again...
        for (this.id in Labels)
          {
              // ... and if the icon is 'normal' we will just turn the labels on 
              if(lColors[this.id] == "normal"){
                Markers[this.id].labelClass="normalLabel";
                Markers[this.id].labelContent=Labels[this.id];
              }
          }// end for labels loop
      }// end if - Pan/Zoom
      });// end marker Listener */
    }// end addListnerToMarkers

    //------------------------------------------------------------------\\
    //draw map
    map = new google.maps.Map(document.getElementById(ctx.wpq + 'canvas'), mapOptions); 
    //set up geo locator
    geocoder = new google.maps.Geocoder();

    // Loop through all the row in the EMIT Incidents SharePoint LIST 
    // FOR LOOP [][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]
    for (var i = 0; i < ctx.ListData.Row.length; i++) { var location = ctx.ListData.Row[i]; 

      siteAddress = location[ApptexObj.Fields.fldAddress];

      // Set up information popup window for marker
      var infowindow = new google.maps.InfoWindow({ 
        content: location[ApptexObj.Fields.fldTitle] + '<br/> ' + location[ApptexObj.Fields.fldDescription] /*+ ' (' + i + ')'*/
      });// end ver infowindow */   

      if(siteAddress != "")// if the site address has text then it is a CUSTOM location, so has no lat & Long
      {
        //so we need to get the Lat & Long
        geocodeAddress(geocoder, map);
      } else {
        // this is a normal school
        myLatLng = new google.maps.LatLng(location[ApptexObj.Fields.fldLatitude], location[ApptexObj.Fields.fldLongitude]);
        // draw the markers
        drawMaker(i);
        // draw the circles
        drawCircle(i);
        // Add Listener
        addListnerToMarkers(i)
      }

      // remove normal titles from markers
      if(lColors[i] == "normal"){
        Markers[i].labelClass="blankLabel";
      };

    }// END FOR LOOP [][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]

    // drawing listner
    google.maps.event.addListener(drawingManager, 'circlecomplete', function(circle) {
      google.maps.event.addListener(circle, 'dblclick', function() {
        circle.setMap(null);
        map.zoom(12);
      });
    });// end addListener

    // drawing listner
    google.maps.event.addListener(drawingManager, 'markercomplete', function(shape) {
        google.maps.event.addListener(shape, 'dblclick', function() {
          shape.setMap(null);
        });
      }
    );// end addListener*/

    // BUTTONS
    // Create the DIV to hold the control and call the CenterControl() constructor passing in this DIV.  Zoom to Top button
    var centerControlDiv = document.createElement('div');
    var centerControl = new CenterControl(centerControlDiv, map);
    centerControlDiv.index = 2;
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);

    //  Create the DIV to hold the control  ToggleSchoolsControl
    var controlToggleDiv = document.createElement('div');
    var ToggleSchoolsControl = new ToggleSchoolsControl(controlToggleDiv, map);
    controlToggleDiv.index = 3;
    map.controls[google.maps.ControlPosition.LEFT].push(controlToggleDiv);

    //  Create the DIV to hold the control  ToggleSchoolsNameControl
    var controlToggleNamesDiv = document.createElement('div');
    var ToggleSchoolsNamesControl = new ToggleSchoolsNamesControl(controlToggleNamesDiv, map);
    controlToggleNamesDiv.index = 4;
    map.controls[google.maps.ControlPosition.LEFT].push(controlToggleNamesDiv);
    //

    ///*//  Create the DIV to hold the control  ToggleCirclesNameControl
    var controlToggleCirclesDiv = document.createElement('div');
    var ToggleCirclesControl = new ToggleCirclesControl(controlToggleCirclesDiv, map);
    controlToggleCirclesDiv.index = 5;
    map.controls[google.maps.ControlPosition.LEFT].push(controlToggleCirclesDiv);
    //*/

    drawingManager.setMap(map);
  });// end function 
  

};// end ApptextObj

if(!ApptexLoadedJSFiles['GoogleMaps']){ 
  // Google Maps Dev Key
  document.write("<script src='https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyBCdSbI2HBJRu9kgve7ZMAn1nEQ9xNEEZM&libraries=drawing'></script>");
  // Marker with Label js file - requiered
  document.write("<script src='https://salkeiz.sharepoint.com/sites/adminsandbox/maptesting/SiteAssets/scripts/markerwithlabel.js'></script>"); 
  // CSS
  document.write("<style>" +
  ".incidentLabel {" +
  "  width: 150px; " +
  "  height: 20px; " +
  "  padding-Left: 20px;" +
  "  padding-Right: 20px;" +

  "  border: 1px solid #eb3a44; " +
  "  border-radius: 5px; " +
  "  background: #fee1d7; " +
  "  text-align: center; " +
  "  line-height: 20px; " +
  "  font-weight: bold; " +
  "  font-size: 14px; " +
  "  color: #25383C /*#eb3a44*/; " +
  "}" +

  ".normalLabel {" +
  "  border: 1px solid #0041c2; " +
  "  border-radius: 5px; " +
  "  background: #c6deff; " +
  "  text-align: center; " +
  "  line-height: 20px; " +
  "  font-weight: bold; " +
  "  font-size: 12px; " +
  "  color: #25383C /*#eb3a44*/; " +
  "}" +

    ".blankLabel {" +
  "  text-align: center; " +
  "  line-height: 20px; " +
  "  font-weight: bold; " +
  "  font-size: 12px; " +
  "  color: transparent /*#25383C*/ /*#eb3a44*/; " +
  "}" +

    ".buttonBorder {" +
  "  background-Color: #fff; " +
  "  border: 2px solid #fff; " +
  "  border-Radius: 3px; " +
  "  box-Shadow: 0 2px 6px rgba(0,0,0,.3); " +
  "  cursor: cursor; " +
  "  margin-Top: 5px; " +
  "  margin-Bottom: 10px; " +
  "  margin-Left: 10px; " +
  "  text-Align: center; " +
  "}" +

    ".buttonInterior {" +
  "  Color: rgb(25,25,25); " +
  "  font-Family: Roboto,Arial,sans-serif; " +
  "  font-size: 12px; " +
  "  line-height: 38px; " +
  "  padding-Left: 5px;" +
  "  padding-Right: 5px;; " +
  "}" +

  "</style>");
//transparent
  ApptexLoadedJSFiles['GoogleMaps'] = true; 
};

var overrideContext = {};
overrideContext.BaseViewID = 855755236875311900;
overrideContext.Templates = {};
overrideContext.Templates.View = ApptexObj.Templates.View;
overrideContext.OnPreRender = ApptexObj.ContexOnPreRender;
overrideContext.OnPostRender = ApptexObj.ContexOnPostRender;
SPClientTemplates.TemplateManager.RegisterTemplateOverrides(overrideContext);
})();