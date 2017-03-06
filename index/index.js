require(['Clases/Grup', 'Clases/Error', 'Clases/Usuari', 'Clases/Utils', 'Clases/Publicacio'], function () {
    $(document).ready(function () {
        noEnrere(); //deshabilitar el boto de tornar enrere;
        
        usuari.getGrupsPrivats(function(grups) { //afegir els grups privats
            for (var i = 0; i < grups.length; i++) {
                var g = new Grup(grups[i].idGrup, grups[i].nomGrup, grups[i].fotoGrup, grups[i].usuaris, grups[i].notificacions);
                $('#teusGrups').append(g.toHtml());
            }
        });

        usuari.getGrupsPublics(function(grups) { //afegir els grups publics;
            for (var i = 0; i < grups.length; i++) {
                var g = new Grup(grups[i].idGrup, grups[i].nomGrup, grups[i].fotoGrup, grups[i].usuaris, grups[i].notificacions);
                $('#mon').append(g.toHtml());
            }
        });

        usuari.getUltimesPublicacions(function(ultimesPublicacions) {
            for (var i = 0; i < ultimesPublicacions.length; i++) {
                var p = Publicacio.toHtmlForIndex(ultimesPublicacions[i].nomPublicador, ultimesPublicacions[i].nomGrup, ultimesPublicacions[i].publicacio, ultimesPublicacions[i].tipus, ultimesPublicacions[i].idGrup);
                $('.resum').append(p);
            }
        });
        $(document).on('click', '.publicacioMur', function() {
            var ids = $(this).data('id');
            cambiPag('paginaGrup.html?idGrup=' + ids);  
        });

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
                    $('.teusGrups').removeClass('invisible');
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
                cambiPag('index.html');
            }
        })

        $('.headerBottomPart').click(function () { //al apreatar un buto de la header;
            var previousTab = $('.headerBottom').find('.SelectedTab').data('id');
            $('.body').find('div.' + previousTab).hide();
            $('.headerBottom').find('.SelectedTab').toggleClass('SelectedTab');
            $(this).addClass('SelectedTab');
            var idGo = $(this).data('id');
            $('.body').find('div.' + idGo).removeClass("invisible");
            $('.body').find('div.' + idGo).fadeIn();
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
                if (start != 0) {
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
                cambiPag('paginaGrup.html?idGrup=' + ids);  
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