var map;
function myMap() {
    var mapProp = {
        center: new google.maps.LatLng(41.388595, 2.172810),
        zoom: 19,
    };

    map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

    var lat = 41.386996;
    var long = 2.170059;
    var image;
    var tematica = "skateIcon"
    if (tematica == "musica") {
        image = '../baseT-css/img/musicIcon.ico';
    } 
    else {
        image = '../baseT-css/img/musicIcon.ico';
    }
    var long2 = 2.172259;
    var marker2 = new google.maps.Marker({
        position: new google.maps.LatLng(lat, long2),
        map: map,
        icon: '../baseT-css/img/musicIcon.ico',
        title: "Evento de skate"
    });
    marker2.setMap(map);

    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, long),
        map: map,
        icon: image,
        title: "Evento de musica"
    });
    marker.setMap(map);
}

function newLocation(newLat, newLng) {
    map.setCenter({
        lat: newLat,
        lng: newLng
    });
}

/**
 * Set els markers del mapa
 * @param idUsuari
 */
function setMarkers(idUsuari) {
    $.ajax ({
        type: "POST",
        url: urlServer + "/get/getEventsUsuari.php?idUsuari=" + idUsuari,
        dataType: 'json',
        cache: false,
        success: function (data) {
            for (i = 0; i < data.length; i++) {
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(data[i].coordX, data[i].coordY),
                    map: map,
                    icon: data[i].icon,
                    title: "Evento de musica"
                });
                marker.setMap(map);
            }
        },
    });
}

require(['Clases/Grup', 'Clases/Error', 'Clases/Usuari', 'Clases/Utils', 'Clases/Publicacio', 'Clases/PublicacioEvent'], function () {
    $(document).ready(function () {
        noEnrere(); //deshabilitar el boto de tornar enrere;
        
        usuari.getGrupsPrivats(function(grups) { //afegir els grups privats
            for (var i = 0; i < grups.length; i++) {
                var g = new Grup(grups[i].idGrup, grups[i].nomGrup, grups[i].fotoGrup, grups[i].usuaris, grups[i].notificacions);
                $('#teusGrups').append(g.toHtml(true));
                if (grups[i].numEvents != 0) {
                    $('#mon').append(g.toHtmlEvent(true));
                }
            }
        });

        setMarkers(usuari.idUsuari);

        usuari.getGrupsPublics(function(grups) { //afegir els grups publics;
            for (var i = 0; i < grups.length; i++) {
                var g = new Grup(grups[i].idGrup, grups[i].nomGrup, grups[i].fotoGrup, grups[i].usuaris, grups[i].notificacions);
                $('#teusGrups').append(g.toHtml(false));
                if (grups[i].numEvents != 0) {
				    $('#mon').append(g.toHtmlEvent(false));
                }
            }
        });

        function getUltimesPublicacions() {
            $('.resum').empty();
            usuari.getUltimesPublicacions(function(ultimesPublicacions) {
                for (var i = 0; i < ultimesPublicacions.length; i++) {
                    var p = Publicacio.toHtmlForIndex(ultimesPublicacions[i].nomPublicador, ultimesPublicacions[i].nomGrup, ultimesPublicacions[i].publicacio, ultimesPublicacions[i].tipus, ultimesPublicacions[i].idGrup, ultimesPublicacions[i].dataPublicacio);
                    $('.resum').append(p);
                }
            });
        };
        getUltimesPublicacions();

         $(document).on('click', '.publicacioMur', function() {
            var ids = $(this).data('id');
                cambiPag('paginaGrup.html?idGrup=' + ids);
        });

        function getSolicitutsContacte() {
            $('.acceptarUsuarisUl').empty();
            usuari.getSolicitutsContacte(function(data) {
                if (data.length > 0) {
                    $('#numSolicitutsContacte').text(data.length);
                    for (var i = 0; i < data.length; i++) {
                        $('.acceptarUsuarisUl').append(Utils.solicitutContacteToHtml(data[i].idUsuari, data[i].nomUsuari));
                    }
                }
                else {
                    $('#numSolicitutsContacte').hide();
                    $('.acceptarUsuarisUl').append('<li><div style="float: left; font-size: 20px;">' + __('stringNoSolicitut') + '</div></li>')
                }
            });
        };
        getSolicitutsContacte();


        var buttonPressed = false; //per prevenir que el dropdown es tanqui;
        $(document).on('click', '.buttonAcceptarContacte', function() {
            var idContacte = $(this).parent().data('id');
            buttonPressed = true;
            usuari.acceptarContacte(idContacte, function() {
                usuari.afegirContacteAcceptat(idContacte);
                $('.acceptarUsuarisUl').find('li').remove();
                usuari.getSolicitutsContacte(function(data) {
                    if (data.length > 0) {
                        $('#numSolicitutsContacte').text(data.length);
                        for (var i = 0; i < data.length; i++) {
                            $('.acceptarUsuarisUl').append(Utils.solicitutContacteToHtml(data[i].idUsuari, data[i].nomUsuari));
                        }
                    }
                    else {
                        $('#numSolicitutsContacte').hide();
                        $('.acceptarUsuarisUl').append('<li><div style="float: left; font-size: 20px;">' + __('stringNoSolicitut') + '</div></li>')
                    }
                    buttonPressed = false;
                })
            });
        });

        $(document).on('click', '.buttonDeclineContacte', function() {
            var idContacte = $(this).parent().data('id');
            buttonPressed = true;
            usuari.declinarContacte(idContacte, function() {
                $('.acceptarUsuarisUl').find('li').remove();
                usuari.getSolicitutsContacte(function(data) {
                    if (data.length > 0) {
                        $('#numSolicitutsContacte').text(data.length);
                        for (var i = 0; i < data.length; i++) {
                            $('.acceptarUsuarisUl').append(Utils.solicitutContacteToHtml(data[i].idUsuari, data[i].nomUsuari));
                        }
                    }
                    else {
                        $('#numSolicitutsContacte').hide();
                        $('.acceptarUsuarisUl').append('<li><div style="float: left; font-size: 20px;">' + __('stringNoSolicitut') + '</div></li>')
                    }
                    buttonPressed = false;
                })
            });
        });
        
        $('#testDrop').on('hide.bs.dropdown', function(e) {
            if (buttonPressed) e.preventDefault();
        });
    


        $(".body").hammer().on("swiperight", function () { //funcio per quan mous el dit cap a la dreta es canvii la tab;
            var x = $('.headerBottom').find('.SelectedTab').data('id'); //tab on estas;
            switch (x) {
                case "teusGrups":
                    $('.headerBottom').find('.SelectedTab').toggleClass('SelectedTab');
                    $('#headerBottomResum').addClass('SelectedTab');
                    $('.teusGrups').hide();
                    $('.resum').removeClass('invisible');
                    $('.resum').fadeIn();
                    break;
                case "mon":
                    $('.headerBottom').find('.SelectedTab').toggleClass('SelectedTab');
                    $('#headerBottomGrups').addClass('SelectedTab');
                    $('.mon').hide();
                    $('.teusGrups').removeClass('ocult');
                    $('.teusGrups').fadeIn();            
                    break;
            }
        });

        $('.body').hammer().on("swipeleft", function () { //funcio per quan mous el dit cap a la esquerra es canvii la tab;
            var x = $('.headerBottom').find('.SelectedTab').data('id'); //tab on estas;
            switch (x) {
                case "teusGrups":
                    $('.headerBottom').find('.SelectedTab').toggleClass('SelectedTab');
                    $('#headerBottomMon').addClass('SelectedTab');
                    $('.teusGrups').hide();
                    $('.mon').removeClass('invisible');
                    $('.mon').fadeIn();
                    google.maps.event.trigger(map, 'resize');
                    break;
                case "resum":
                    $('.headerBottom').find('.SelectedTab').toggleClass('SelectedTab');
                    $('#headerBottomGrups').addClass('SelectedTab');
                    $('.resum').hide();
                    $('.teusGrups').removeClass('invisible');
                    $('.teusGrups').fadeIn();
                    break;
            }
        });


        $('.body').hammer().on('swipedown', function() {
            var conexio = Utils.tryConexio();
            if (conexio) {
                getSolicitutsContacte();
                getUltimesPublicacions();
                $('#modalLoading').modal('hide');
            }
            else {
                 
            }
    
        })

        $('.headerBottomPart').click(function () { //al apreatar un buto de la header;
            var previousTab = $('.headerBottom').find('.SelectedTab').data('id');
            $('.body').find('div.' + previousTab).hide();
            $('.headerBottom').find('.SelectedTab').toggleClass('SelectedTab');
            $(this).addClass('SelectedTab');
            var idGo = $(this).data('id');
            $('.body').find('div.' + idGo).removeClass("ocult");
            $('.body').find('div.' + idGo).fadeIn();
            google.maps.event.trigger(map, 'resize');
        });

        //Funcions dels buttons del menu
        $('#buttonMostrarVertical').click(function () { //boto per mostrar els grups en vertical o quadricula
            $(this).find('span').toggleClass("glyphicon-th-list");
            $('.grup').hide();
            $('.grup').toggleClass('grupLinia');
            $('.grupPhoto').toggleClass('enLinia');
            $('.grupNom').toggleClass('enLinia');
            $('.grup').fadeIn();
        });

        $('#buttonSortir').click(function () {
            storage.removeItem('idUsuari');
            storage.removeItem("nomUsuari");
            cambiPag("login_reg.html");
        
        });

        $('#buttonOutGrup').click(function () {
            usuari.eliminarseGrup(grupsBorrar);
        })

        $('#buttonAddGrup').click(function() {
             cambiPag("crearGrup.html");
        });

        $('#buttonSearchGroup').click(function() {
            cambiPag('buscarGrup.html');
        });
        //---------------


        //Entrar en un grup;
        var longpress = 250; //en milisegons, temps per seleccionar
        var start = 0; //si ha començat a apretar; 
        var grupsBorrar = [];
        $(document).on('mousedown', '.grup', function(e) {
            start = new Date().getTime();
            var x = $(this);
            setTimeout(function(e) {
                if (start != 0 && $(x).attr('name') == 'grupMostrar') {
                    if (!$(x).hasClass('grupSelected')) {
                        $(x).addClass('grupSelected');
                        var thisId = $(x).data('id');
                        grupsBorrar.push(thisId);
                    }
                    else {
                        $(x).removeClass('grupSelected');
                        var thisId = $(x).data('id');
                        var index = grupsBorrar.indexOf(thisId);
                        grupsBorrar.splice(index, 1);
                    }
                    if (grupsBorrar.length > 0) {
                        $('#buttonOutGrup').show();                   
                    }
                    else {
                        $('#buttonOutGrup').hide();                  
                    }
                    start = 0;
                    clearTimeout();
                }
            }, longpress);
        });
        $(document).on('mouseleave', '.grup' , function(){
            start = 0;
        });
        $(document).on('mouseup', '.grup', function() {
            if (new Date().getTime() <= (start + longpress)) {
                var ids = $(this).data('id');
                if($(this).attr("name") == "grupMostrar"){
					cambiPag('paginaGrup.html?idGrup=' + ids);
				}
				else {
                    let g = $(this);
					$.ajax({
                        type: "POST",
                        url: urlServer + "/get/getUltimEvent.php?idGrup="+ids,
                        dataType: 'json',
                        success: function (data) {
                            lat=data.coordX;
                            long=data.coordY;
                            var t = PublicacioEvent.toText(data);
                             $(g).popover({
                                content: t,
                                html: true,
                                title: "Event",
                                placement: 'top'
                            })
                            newLocation(parseFloat(lat),parseFloat(long)); 
                        },
                        error: function (xhr, status, error) {
                            Error.showError(__("{{errorServerOut}}"));
                        }
					});
				}
            }
        });
        
        
       

        /**
         * Mostrar la imatge del grup en gran;
         *//*
        $(document).on('click', '.imgGrup', function () {
            var imgSrc = $(this).attr('src');
            $('#modalImgGrup').attr('src', imgSrc);
            $('#modalImg').modal('show'); //mostar el quadrat on es mostrarà la imatge;
        });*/

    });

}) ;