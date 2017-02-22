require(['Clases/Error', 'Clases/Usuari', 'Clases/Camera'], function () {
    $(document).ready(function a() {
      
        usuari.getTemas(function () {
            usuari.actualitzarLikes('mostrarLikes');
        });
        usuari.getContactes(function () {
            usuari.actualitzarContactes('mostrarContactes', 'removeContacte');
        });

        usuari.getFotoPerfil(function(ruta) {
            $('.fotoPerfil').attr('src', urlServer + ruta);
        });

        $('#nomUsuari').text(usuari.nomUsuari);

        $('#btnBackToIndex').click(function () {
            cambiPag("index.html");
        });

        $('.fotoPerfil').click(function () {
            var imgSrc = $(this).attr('src');
            $('#modalImgGrup').attr('src', imgSrc);
            $('#modalImg').modal('show'); //mostar el quadrat on es mostrarà la imatge;
        });

        $('#buttonCambiFoto').click(function () {
            getPhoto(pictureSource.PHOTOLIBRARY ,function(imageUri) { //pictureSource.SAVEDPHOTOALBUM
                uploadPhotoUsuari(imageUri, usuari.idUsuari, function(nomFoto) {
                    usuari.actualitzarFotoPerfil(nomFoto);
                    cambiPag('perfil.html');
                });
            });
        });

        $('.buttonExpand').click(function () { //expandir 
            var target = $(this).data('target');
            $('#' + target).toggle("fast");;
            $(this).find('span').toggleClass("glyphicon-triangle-bottom");
        });

        $('.tabButton').click(function () {
            if (!$(this).hasClass('selected')) {
                var tabGo = $(this).data('id');
                var thisTab = $(this).parent().find('.selected').data('id');
                $(this).parent().find('.selected').removeClass('selected');
                $(this).addClass('selected');
                $('#' + thisTab).hide();
                $('#' + tabGo).fadeIn();
            }
        });

        $(".body").hammer().on("swiperight", function () {
            $('.tabNav').find('p').toggleClass('selected');
            $('#mostrarLikes').hide();
            $('#mostrarContactes').fadeIn();
        });

        $(".body").hammer().on("swipeleft", function () {
            $('.tabNav').find('p').toggleClass('selected');
            $('#mostrarContactes').hide();
            $('#mostrarLikes').fadeIn();
        });


        $('#inputBuscador').keyup(function () {
            var text = $(this).val();
            if (text != "") {
                $('#resBuscador').dropdown();
                var type = $('.tabNav').find('.selected').data('buscar');
                if (type == "contacte") {
                    buscarContacte(text);
                } else if (type == "tema") {
                    buscarTema(text);
                }
            } else {
                $('#resBuscador').find('li').remove();
                $('#resBuscador').hide();
            }
        });


        $('.buttonAdd').click(function () { //buscar/afegir
            if ($(this).parent().parent().find('.buscador').is(":visible")) {
                $(this).parent().parent().find('.buscador').hide();
                $(this).parent().parent().parent().find('.resultatBuscar').hide();
            } else {
                $(this).parent().parent().find('.buscador').show();
            }
        });

        $('.body').click(function () {
            $('#inputBuscador').val('');
            $('#resBuscador').hide();
        });

        //Contactes ------
        function buscarContacte(text) {
            $.ajax({
                type: "POST",
                url: urlServer + "/buscar/buscarContacte.php?nom=" + text + "&idUsuari=" + usuari.idUsuari,
                dataType: 'json',
                cache: false,
                success: function (data) {
                    $('#resBuscador').find('li').remove();
                    $('#resBuscador').show();
                    if (data != 0) {
                        for (i = 0; i < data.length; i++) {
                            if (data[i] != nomUsuari && !Utils.inArray(usuari.contactes, data[i])) {
                                $('#resBuscador').append("<li class='contacte'><button class='buttonNoStyle addContacte'><span class='glyphicon glyphicon-ok-circle'></span></button>" + data[i] + "</li>");
                            } else {
                                $('#resBuscador').append("<li>" + __("{{stringNoResultats}}") + "</li>");
                            }
                        }
                    } else {
                        $('#resBuscador').append("<li>" + __("{{stringNoResultats}}") + "</li>");
                    }

                },
                error: function () { //si hi ha un error al connectar-se al servidor;
                    $('#resBuscador').append("<li>" + __("{{errorServerOut}}") + "</li>");
                }
            });
        }

        //afegir contacte
        $('ul').on('click', '.addContacte', function () {
            var text = $(this).parent().text(); //nom del contacte;
            Utils.getIdByNom(text, function (id) {
                $('#resBuscador').find('li').remove();
                $('#inputBuscador').val('');
                usuari.contactes = [];
                usuari.afegirContacte(id);
                $('#resBuscador').hide();
            })
        });

        //quan fem click al element (contacte) de la llista de contactes mostrada (a dalt la mostrem) s'elimina aquest contacte
        $('ul').on('click', '.removeContacte', function () {
            var text = $(this).parent().text(); //nom del contacte;
            Utils.getIdByNom(text, function (id) {
                $.ajax({
                    type: "POST",
                    url: urlServer + "/delete/deleteContacte.php?idUsu1=" + usuari.idUsuari + "&idUsu2=" + id,
                    dataType: 'json',
                    cache: false,
                    success: function (data) {
                        usuari.contactes = Utils.deleteFromArray(usuari.contactes, text);
                        usuari.actualitzarContactes('mostrarContactes', 'removeContacte');
                    },
                    error: function () {
                        Error.showError(__("{{errorServerOut}}"));
                    }
                });
            });
        })


        //Likes ------
        $('ul').on('click', '.addNewLike', function () {
            var text = document.getElementById("inputBuscador").value; //nom del like
            $.ajax({
                type: "POST",
                url: urlServer + "/insert/crearLike.php?nom=" + text, 
                dataType: 'json',
                cache: false,
                success: function (data) { //afegir el like al usuari, data = id del nou like;;
                    $('#resBuscador').find('li').remove();
                    $('#inputBuscador').val('');
                    $('#resBuscador').hide();
                    usuari.afegirLike(data); //amb el id del usuari i la id del like, son insertats a la taula usuari_gust;
                },
                error: function () { //si hi ha un error al connectar-se al servidor;
                    $('#resBuscador').append("<li>" + __("{{errorServerOut}}") + "</li>");
                }
            });
        });

        $('ul').on('click', '.addLike', function () {
            var text = $(this).parent().text(); //nom del like;
            Utils.getIdByNomTema(text, function (id) {
                $('#resBuscador').find('li').remove();
                $('#inputBuscador').val('');
                $('#resBuscador').hide();
                usuari.afegirLike(id);
            });
        });

        $('ul').on('click', '.removeLike', function () {
            var text = $(this).parent().text(); //nom del like;
            Utils.getIdByNomTema(text, function (id) {
                $.ajax({
                    type: "POST",
                    url: urlServer + "/delete/deleteLike.php?idUsuari=" + usuari.idUsuari + "&idGust=" + id,
                    dataType: 'json',
                    cache: false,
                    success: function (data) {
                        usuari.temas = Utils.deleteFromArray(usuari.temas, text);
                        usuari.actualitzarLikes('mostrarLikes');
                    },
                    error: function () {
                        Error.showError(__("{{errorServerOut}}"));
                    }
                });
            })
        })

        function buscarTema(text) {
            $.ajax({
                type: "POST",
                url: urlServer + "/buscar/buscarLike.php?nom=" + text, //retorna tots els gustos amb el nom indicat;
                dataType: 'json',
                cache: false,
                success: function (data) {
                    $('#resBuscador').find('li').remove();
                    $('#resBuscador').show();
                    if (data != 0) {
                        for (i = 0; i < data.length; i++) {
                            if (!Utils.inArray(usuari.temas, data[i])) {
                                $('#resBuscador').append("<li><button class='buttonNoStyle addLike'><span class='glyphicon glyphicon-ok-circle'></span></button>" + data[i] + "</li>");
                            }
                            if (text != data[i] && i == data.length - 1) {
                                $('#resBuscador').append('<li role="separator" class="divider"></li>');
                                $('#resBuscador').append("<li><button class='buttonNoStyle addNewLike'><span class='glyphicon glyphicon-ok-circle'></span></button>Afegir " + text + "</li>");
                            }
                        }
                    } else {
                        $('#resBuscador').find('li').remove();
                        $('#resBuscador').append("<li><button class='buttonNoStyle addNewLike'><span class='glyphicon glyphicon-ok-circle'></span></button>Afegir " + text + "</li>");
                    }

                },
                error: function () { //si hi ha un error al connectar-se al servidor;
                    $('#resBuscador').append("<li>" + __("{{errorServerOut}}") + "</li>");
                }
            });
        }
    });
});