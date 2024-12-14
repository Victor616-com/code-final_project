const mapWrapper = document.getElementById('map-wrapper');


// --- Function for the map --- 
const initMap = (filteredSpots) =>  {
    let markers = filteredSpots;
    // Positioning the map on load based on the screen size 
    let zoom = 0;
    let positioOnStart = [];
    let zoomControls = false;
    if (window.innerWidth <= 390) {
        zoom = 12.7;
        positioOnStart = [56.169334, 10.203145];
    } else if (window.innerWidth <= 1100) {
        zoom = 12.7;
        positioOnStart = [56.169334, 10.203145];
    } else {
        zoom = 12.7;
        positioOnStart = [56.149334, 10.203145];
        zoomControls = true; // Allows zoom controls only on desktop version
    }
    
    const centerMap = { lat: positioOnStart[0], lng: positioOnStart[1] }
    const mapOptions = {
        center: centerMap,
        zoom: zoom,
        disableDefaultUI: true, // Disable the google maps controls 
        zoomControl: zoomControls, // Manages the zoom controls

        // Styling for the map from SnazzyMaps
        styles: [
            {
                "featureType": "all",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "weight": "2.00"
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#9c9c9c"
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#f2f2f2"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "landscape.man_made",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "landscape.man_made",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#f0e4de"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 45
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#eeeeee"
                    },
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#7b7b7b"
                    },
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#46bcec"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#c6e0da"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#070707"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            }
        ]
    }

    // Creates a new map object from Google API
    const map = new google.maps.Map(document.getElementById('map'), mapOptions);
    

    // Displaying the markers and the pop-up boxes
    markers.forEach((markerData) => {

        // Displaying the markers on the map
        const marker = new google.maps.Marker({
            position: { lat: markerData.lat, lng: markerData.lng },
            map: map,
            icon: {
                url: 'resources/images/marker.svg',
                scaledSize: new google.maps.Size(30, 30),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(15, 30) // Positions the tip of the marker on the lng and lat
            }
        });

       
        // --- Creating the marker details box ---

        // Creating the html for each one
        const markerDet = document.createElement('div');
        markerDet.classList.add('marker_det');
        markerDet.innerHTML = `
            <div class="marker-top">
                <img class="exit" src="resources/images/x.svg" alt="x">
                <div class="title-wrapper">
                <h2>${markerData.title}</h2>
                </div
            </div>
            <div class="btn-wrapper">
                <button class="black-btn" onclick="openEventsLink()">See more</button> 
            </div>
            
        `;
    
        const overlay = new google.maps.OverlayView();
        
        overlay.onAdd = function () {
            const panes = this.getPanes();
            panes.overlayMouseTarget.appendChild(markerDet); // Adding to the panes of google API so they stay next to the markers
        
            // Exit button functionality
            const exitBtn = markerDet.querySelector('.exit');
            exitBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                markerDet.classList.remove('show');
            });
        };

        // Updating the position of the box based on the position of the marker
        overlay.draw = function () {
            const projection = this.getProjection();
            const position = projection.fromLatLngToDivPixel(marker.getPosition());
            markerDet.style.left = position.x + 20 + 'px'; // Adjust for spacing between marker and box
            markerDet.style.top = position.y - 20 + 'px'; // Adjust for proper vertical alignment
        };

        overlay.setMap(map);
        
        // Click event to toggle marker details box visibility
        marker.addListener('click', () => {
            // Hide all other marker details when one is clicked
            document.querySelectorAll('.marker_det').forEach((el) => el.classList.remove('show'));

            // Show the current marker detail (the class show has the final scale and the css animation)
            markerDet.classList.add('show');
        });
        
        // Update overlay position when the map is idle (after zoom or drag)
        google.maps.event.addListener(map, 'idle', () => overlay.draw());

        /* --- Disabled for now ---
        // Modifying the interaction based on the screen size
        if (window.innerWidth > 400) {
            const overlay = new google.maps.OverlayView();
            overlay.onAdd = function () {
                const panes = this.getPanes();
                panes.overlayMouseTarget.appendChild(markerDet); // Adding to the panes of google API so they stay next to the markers
        
                // Exit button functionality
                const exitBtn = markerDet.querySelector('.exit');
                exitBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    markerDet.classList.remove('show');
                });
            };
            
            // Updating the position of the box based on the position of the marker
            overlay.draw = function () {
                const projection = this.getProjection();
                const position = projection.fromLatLngToDivPixel(marker.getPosition());
                markerDet.style.left = position.x + 40 + 'px';
                markerDet.style.top = position.y - 10 + 'px';
            };
        
            overlay.setMap(map);
        
            // Click event to toggle marker details box visibility
            marker.addListener('click', () => {
                // Hide all other marker details when one is clicked
                document.querySelectorAll('.marker_det').forEach((el) => el.classList.remove('show'));

                // Show the current marker detail (the class show has the final scale and the css animation)
                markerDet.classList.add('show');
            });
        
         // Update overlay position when the map is idle
            google.maps.event.addListener(map, 'idle', () => overlay.draw());

        } else {

            // --- Behaviour on the mobile version ---

            // Add the marker details box to the mapWrapper div so it can have fixed position
            mapWrapper.appendChild(markerDet);

            // Ensure the marker details are toggled on click
            marker.addListener('click', () => {

                // Toggle the visibility of the marker details box for mobile
                const isVisible = markerDet.classList.contains('show-mobile');
                document.querySelectorAll('.marker_det').forEach((el) => el.classList.remove('show-mobile'));
                if (!isVisible) {
                    markerDet.classList.add('show-mobile');
                }
            });

            // Exit button for mobile
            const exitBtn = markerDet.querySelector('.exit');
            exitBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                markerDet.classList.remove('show-mobile');
            });
        }
        */
        
    });
   
    // To display the current position with a different kind of marker
    //displayCurrentLocation(map);

    // Prevent touch zoom and gesture zoom on mobile devices
    document.addEventListener('touchstart', (e) => {
        if (e.touches.length > 1) e.preventDefault();
    }, { passive: false });

    document.addEventListener('gesturestart', (e) => e.preventDefault());
}
