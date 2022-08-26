$(document).ready(
    function () {
        // LEAFLET MAP
        $.ajax(
            {
                url: "http://api.open-notify.org/iss-now.json",
                type: "get"
            })
            .done((data) => {
                let map = L.map('map').setView([data.iss_position.latitude, data.iss_position.longitude], 5);

                L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
                    maxZoom: 19,
                    attribution: '© OpenStreetMap'
                }).addTo(map);
                let markers = L.layerGroup();
                map.addLayer(markers);
                setInterval(() => {
                        $.ajax(
                            {
                                url: "http://api.open-notify.org/iss-now.json",
                                type: "get"
                            })
                            .done((data) => {
                                $("#lat-display").text(data.iss_position.latitude);
                                $("#long-display").text(data.iss_position.longitude);
                                let myIcon = L.icon({
                                    iconUrl: 'assets/images/satelite.png',
                                    iconSize: [64, 64],
                                    iconAnchor: [32, 32],
                                    popupAnchor: [-3, -76]
                                });
                                markers.clearLayers();
                                markers.addLayer(L.marker([data.iss_position.latitude, data.iss_position.longitude], {icon: myIcon}).addTo(map));
                                map.setView([data.iss_position.latitude, data.iss_position.longitude]);
                            });
                    }
                    , TIMER_INTERVAL);
            });
        // API CALL
        const TIMER_INTERVAL = 1000;
    }// Eo main function
);// Eo ready