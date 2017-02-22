require(['Clases/Error', 'Clases/Grup', 'Clases/Usuari'], function () {
    $(document).ready(function () {
        var usuarisGrup = []; // array on es guarden els usuaris (les id) del nou grup;
        var temesGrup = [] //array on es guarden els temes (les id del like) del nou grup;

        usuarisGrup[0] = usuari.idUsuari;
        usuari.getContactes(function() {
            for (var i = 0; i < usuari.contactes.length; i++) {
                $('.contactesUsuari').append("<div class='contacteUsuari'>" + usuari.contactes[i] + "</div>");
            }
        });

        usuari.getTemas(function() {
             for (var i = 0; i < usuari.temas.length; i++) {
                $('.temasUsuari').append("<div class='tema'>" + usuari.temas[i] + "</div>");
            }
        })


        $('div').on('click', '.contacteUsuari', function() {
            var nom = $(this).text();
            Utils.getIdByNom(nom, function(id) {
                if (!Utils.inArray(usuarisGrup, id)) {
                    usuarisGrup.push(id);
                    $('.contactesGrup').append("<div><button class='buttonNoStyle removeContacte'><span class='glyphicon glyphicon-remove-circle'></span></button>" + nom + "</div>")
                }
            })
        });

        $('div').on('click', '.tema', function() {
            var nom = $(this).text();
            Utils.getIdByNomTema(nom, function(id) {
                if (!Utils.inArray(temesGrup, id)) {
                    temesGrup.push(id);
                    $('.temasGrup').append("<div><button class='buttonNoStyle removeTema'><span class='glyphicon glyphicon-remove-circle'></span></button>" + nom + "</div>")
                }
            })
        });

        $('div').on('click', '.removeContacte', function() {
            Utils.deleteFromArray(usuarisGrup, $(this).parent().text());
            $(this).parent().remove();
        });

        $('div').on('click', '.removeTema', function() {
            Utils.deleteFromArray(temesGrup, $(this).parent().text());
            $(this).parent().remove();
        });


        $('.buttonNext').click(function() {
            if ($('.seleccionarContactesDiv').is(':visible')) {
                $('.seleccionarContactesDiv').hide();
                $('.crearGrup').fadeIn();
            }
            else if ($('.seleccionarTemasDiv').is(':visible')) {
                $('.seleccionarTemasDiv').hide();
                $('.crearGrup').fadeIn();
            }
        });

        $('#btnTemasGrup').click(function() {
            $('.crearGrup').hide(); 
            $('.seleccionarTemasDiv').fadeIn();
        });

        $('#btnContactesGrup').click(function() {
            $('.crearGrup').hide(); 
            $('.seleccionarContactesDiv').fadeIn();
        });

        $("#radioButtonPrivat").click(function () {
            $('#btnContactesGrup').fadeIn();
        });

        $("#radioButtonPublic").click(function () {
            $('#btnContactesGrup').hide();
            usuarisGrup = [];
            usuarisGrup[0] = usuari.idUsuari;
        });

        $('.buttonInfo').click(function () {
            var idButtonInfo = $(this).data('id');
            var text; //text que es mostrarà en el modal;
            switch (idButtonInfo) {
                case 1:
                    text = "Omplir aixo amb la funcio __()"
                    break;
                case 2:
                    text = "";
                    break;
                case 3:
                    text = "";
                    break;
            }
            $('#modalInfo').find('.modal-body').text(text);
            $('#modalInfo').modal('show');
        });

        $('#btnCrearGrup').click(function () {
            var nomGrup = document.getElementById("inputNomGrup").value;;
            if (nomGrup == "") {
                //Error.showError("Error al conectar-se al servidor."); xxxx;
            } else {
                var tipus = 0;
                if ($("#radioButtonPrivat").is(':checked')) {
                    tipus = 1; //grup privat
                }
                if (temesGrup.length == 0 && tipus == 0) {
                    Error.showError(__("temesLength"));
                } 
                else {
                    if(tipus == 0) { //grup public
                         $.ajax({ //comprovar que no existeix un grup public amb el mateix nom;
                            type: "POST",
                            url: urlServer + "/buscar/buscarGrupByNom2.php?q=" + nomGrup,
                            dataType: 'json',
                            cache: false,
                            success: function (data) {
                                if(data == 0) {  //no existeix, crear-lo;
                                    $.ajax({
                                        type: "POST",
                                        url: urlServer + "/insert/afegirGrup.php?nomGrup=" + nomGrup + "&tipus=" + tipus + "&usuarisGrup=" + usuarisGrup + "&temesGrup=" + temesGrup,
                                        dataType: 'json',
                                        cache: false,
                                        success: function (data) {
                                            cambiPag('index.html');
                                        },
                                        error: function (xhr, status, error) {
                                            Error.showError(__("errorServerOut"));
                                        }
                                    });
                                }
                                else {
                                    $('.errorLogin').text(__("errorGrupExist"));
                                }
                            },
                            error: function (xhr, status, error) {
                                Error.showError(__("errorServerOut"));
                            }
                        });
                    }
                    else { //grup privat;
                       $.ajax({
                            type: "POST",
                            url: urlServer + "/insert/afegirGrup.php?nomGrup=" + nomGrup + "&tipus=" + tipus + "&usuarisGrup=" + usuarisGrup + "&temesGrup=" + temesGrup,
                            dataType: 'json',
                            cache: false,
                            success: function (data) {
                                if (data == 3) {
                                   alert(__('stringUsuarisNoAfegits')); 
                                }
                                cambiPag('index.html');
                            },
                            error: function (xhr, status, error) {
                                Error.showError(__("errorServerOut"));
                            }
                        }); 
                    }
                }
            }
        });
    });
});