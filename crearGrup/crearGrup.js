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


        $(document).on('click', '.contacteUsuari', function() {
            var nom = $(this).text();
            Utils.getIdByNom(nom, function(id) {
                if (!Utils.inArray(usuarisGrup, id)) {
                    usuarisGrup.push(id);
                    $('.contactesGrup').append("<div><button class='buttonNoStyle removeContacte'><span class='glyphicon glyphicon-remove-circle'></span></button>" + nom + "</div>")
                }
            })
        });

        $(document).on('click', '.tema', function() {
            var nom = $(this).text();
            Utils.getIdByNomTema(nom, function(id) {
                if (!Utils.inArray(temesGrup, id)) {
                    temesGrup.push(id);
                    $('.temasGrup').append("<div><button class='buttonNoStyle removeTema'><span class='glyphicon glyphicon-remove-circle'></span></button>" + nom + "</div>")
                }
            })
        });

        $(document).on('click', '.removeContacte', function() {
            Utils.deleteFromArray(usuarisGrup, $(this).parent().text());
            $(this).parent().remove();
        });

        $(document).on('click', '.removeTema', function() {
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
            $('#passGrupPublicDiv').hide();
        });

        $("#radioButtonPublic").click(function () {
            $('#btnContactesGrup').hide();
            $('#passGrupPublicDiv').fadeIn();
            $('#inputPassGrupPublic').val('');
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

        $('#checkboxGrupWithPass').click(function() {
            if ($(this).is(':checked')) {
                $('.passFormDiv').fadeIn();
            }
            else {
                $('.passFormDiv').hide();
                $('#inputPassGrupPublic').val('');
            }
        });

        $('#btnCrearGrup').click(function () {
            var nomGrup = document.getElementById("inputNomGrup").value;;
            if (nomGrup == "") {
                $('#modalError .modal-content .modal-body').text(__('{{stringNomGrupEnBlanc}}'));
                $('#modalError').modal();
            } 
            else {
                var tipus = 0;
                if ($("#radioButtonPrivat").is(':checked')) {
                    tipus = 1; //grup privat
                }

                if (temesGrup.length == 0 && tipus == 0) {
                    $('#modalError .modal-content .modal-body').text(__('{{stringGrupPublicNoTemas}}'));
                    $('#modalError').modal();
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
                                    if ($("#checkboxGrupWithPass").is(':checked')) {
                                        var pass = $('#inputPassGrupPublic').val();
                                        if (pass == '') {
                                            alert("No password");
                                        }
                                        else {
                                            Grup.crearGrup(nomGrup, tipus, usuarisGrup, temesGrup, pass);
                                        }
                                    }
                                    else {
                                        Grup.crearGrup(nomGrup, tipus, usuarisGrup, temesGrup, 0);
                                    }
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
                       Grup.crearGrup(nomGrup, tipus, usuarisGrup, temesGrup, 0); 
                    }
                }
            }
        });
    });
});