var mapCtrl = myApp.controller('mapCtrl', ['$scope', 'venuesService', 'forecastInfo', 'locationInfo', function($scope, venuesService, forecastInfo, locationInfo) {

    var latitude        = locationInfo.coords.lat
    var longitude       = locationInfo.coords.lng
    var searchRadius    = venuesService.searchRadius
    var resultsLimit    = venuesService.resultsLimit

    forecastInfo.getWeather(latitude, longitude)

        .then(function(response) {
            $scope.temperatureInfo     = response.data.main
            $scope.cityName            = response.data.name
        })

        .then(function() {

            venuesService.getVenues(latitude, longitude, searchRadius, resultsLimit)

                .then(function(response) {

                    var nearbyCoffeeShops = response.data.response.venues

                    var nearbyCoffeeShopsInfo = $scope.extractCoffeeShopsInfo(nearbyCoffeeShops)

                    $scope.initMap(latitude, longitude)

                    $scope.createMarkersForCoffeeShops(nearbyCoffeeShopsInfo)

                })
    })

    $scope.initMap = function(lat, lng) {

        var mapSection  = document.getElementById('map')

        var mapStyles = [
            {"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}
        ]

        var mapStylesTwo = [
            {
                "featureType": "administrative",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "lightness": "1"
                    },
                    {
                        "gamma": "1.67"
                    },
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "simplified"
                    },
                    {
                        "color": "#9acf59"
                    }
                ]
            },
            {
                "featureType": "administrative.province",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "administrative.locality",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "simplified"
                    },
                    {
                        "saturation": "-3"
                    },
                    {
                        "gamma": "1.60"
                    }
                ]
            },
            {
                "featureType": "administrative.neighborhood",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "color": "#ff0000"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "simplified"
                    },
                    {
                        "gamma": "0.94"
                    },
                    {
                        "weight": "0.87"
                    },
                    {
                        "lightness": "-4"
                    },
                    {
                        "saturation": "21"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "simplified"
                    },
                    {
                        "saturation": "-17"
                    },
                    {
                        "lightness": "15"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "saturation": "-82"
                    },
                    {
                        "lightness": "47"
                    },
                    {
                        "weight": "1.40"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "simplified"
                    },
                    {
                        "weight": "1.0"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "color": "#5d4627"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "saturation": "-29"
                    },
                    {
                        "lightness": "32"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "visibility": "simplified"
                    },
                    {
                        "weight": "1.01"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "lightness": "-7"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "lightness": "27"
                    },
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "saturation": "-16"
                    },
                    {
                        "lightness": "33"
                    },
                    {
                        "gamma": "1"
                    },
                    {
                        "weight": "1.0"
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
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#3f518c"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "simplified"
                    },
                    {
                        "color": "#84afa3"
                    },
                    {
                        "lightness": 52
                    }
                ]
            }
        ]

        var mapOptions  = {
            center: new google.maps.LatLng(lat, lng),
            zoom: 15,
            styles: mapStyles,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: false,
            panControl: false,
            streetViewControl: false,
            zoomControl: false
        }

        $scope.map      = new google.maps.Map(mapSection, mapOptions)

    }

    $scope.createMarkersForCoffeeShops = function functionName(coffeeShopsInfoArray) {

        var infoWindow = null

        coffeeShopsInfoArray.forEach(function (coffeeShop, index) {

            var markerLatLng    = new google.maps.LatLng(coffeeShop.lat, coffeeShop.lng)
            var marker       = new google.maps.Marker({

                position: markerLatLng,
                map: $scope.map,
                title: coffeeShop.name,
                animation: google.maps.Animation.DROP,
                icon: '/app/static/img/location2.svg'

            })

            marker.addListener('click', function() {

                if (infoWindow) {
                    infoWindow.close()
                }

                infoWindow = new google.maps.InfoWindow()
                infoWindow.setContent(

                    "<div class='venue-info'>" +

                        "<div class='venue-info__name'>" +
                            "<h1>" + coffeeShop.name + "</h1>" +
                        "</div>" +

                        "<address class='venue-info__location'>" +

                            "<ul>" +
                                "<li>" + coffeeShop.address  + "</li>" +
                                "<li>" + coffeeShop.postcode + "</li>" +
                                "<li>" + coffeeShop.phone    + "</li>" +
                                "<li>" + coffeeShop.twitter  + "</li>" +
                            "</ul>" +

                        "</address>" +


                    "</div>"
                )

                infoWindow.open($scope.map, marker)
                $scope.map.setCenter(infoWindow.getPosition())
            })

        })
    }

    $scope.extractCoffeeShopsInfo = function(coffeeShopsList) {

        var coffeeShopsInfo = []

        coffeeShopsList.forEach(function(coffeeShop) {

            coffeeShopsInfo.push({

                lat: coffeeShop.location.lat,
                lng: coffeeShop.location.lng,
                name: coffeeShop.name,
                phone: coffeeShop.contact.formattedPhone,
                twitter: coffeeShop.contact.twitter,
                postcode: coffeeShop.location.postalCode,
                address: coffeeShop.location.address

            })

        })

        return coffeeShopsInfo

    }

}])
