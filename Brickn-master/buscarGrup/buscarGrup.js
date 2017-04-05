require(['Clases/Grup'], function() {
    $(document).ready(function() {

        let grups = []; //ids dels grups al que l'usuari es vol unir;
        let buscarPerNom = true;
        let temasUsuari; 
        usuari.getTemas(function () {
           temasUsuari = usuari.temas;
        });

        $('.tabSelector').click(function() {
            $('.tabSelector').removeClass('selected');
            $(this).addClass('selected');
            var tab = $(this).data('tab');
            if (tab == 'resultatsNom') {
                $('#resultatsTema').hide();
                $('#buttonBuscarTeusTemas').hide();
                $('#' + tab).fadeIn();
                buscarPerNom = true;
            }
            else {
                $('#resultatsNom').hide();
                $('#buttonBuscarTeusTemas').fadeIn();
                $('#' + tab).fadeIn();
                buscarPerNom = false;
            }
        });

        $('.body').hammer().on("swipeleft", function () {
            $('.tabNav').find('p').toggleClass('selected');
            $('#resultatsNom').hide();
            $('#resultatsTema').fadeIn();
            $('#buttonBuscarTeusTemas').fadeIn();
            buscarPerNom = false;
        });

        $('.body').hammer().on("swiperight", function () {
            $('.tabNav').find('p').toggleClass('selected');
            $('#resultatsTema').hide();
            $('#resultatsNom').fadeIn();
            $('#buttonBuscarTeusTemas').hide();
            buscarPerNom = true;
        });

        $('#buttonBuscar').click(function() {
            var buscar = $('#inputBuscar').val();
            if (buscar != '') {
                if (buscarPerNom) {
                    $('#resultatsNom').empty();
                    Grup.buscarGrupByNom(buscar, usuari.idUsuari, function(data) {
                        for (var i = 0; i < data.length && i < 5; i++) {
                            var g = Grup.toHtmlForBuscar(data[i].idGrup, data[i].nomGrup, data[i].pass, data[i].foto);
                            $('#resultatsNom').append(g);
                        }
                        if (data == 0) {
                            noResultats('resultatsNom');
                        }
                    });
                }
                else {
                    $('#resultatsTema').empty();
                    Grup.buscarGrupByTema(buscar, usuari.idUsuari, function (data) {
                        for (var i = 0; i < data.length && i < 5; i++) {
                            var g = Grup.toHtmlForBuscar(data[i].idGrup, data[i].nomGrup, data[i].pass, data[i].foto);
                            $('#resultatsTema').append(g);
                        }
                        if (data == 0) {
                            noResultats('resultatsTema');
                        }
                    });
                }
            }
        });

        $('#buttonBuscarTeusTemas').click(function() {
            usuari.getGrupsTema(function(data) {
                $('#resultatsTema').empty();
               for (var i = 0; i < data.length && i < 5; i++) {
                   var g = Grup.toHtmlForBuscar(data[i].idGrup, data[i].nomGrup, data[i].pass, data[i].foto);
                   $('#resultatsTema').append(g);
               }
               if (data == 0) {
                   noResultats('resultatsTema');
               }
            });
        });

        $(document).on('click', '.grup', function() {
            var ids = $(this).data('id');
            if ($(this).hasClass('grupSelected')) {
                $(this).removeClass('grupSelected');
                Utils.deleteFromArray(grups, ids);
            }
            else {
                var pass = $(this).data('pass');
                if (pass != 0) {
                    $('#modalPassword').data('grup', ids);
                    $('#modalPassword').data('pass', pass);
                    $('#modalPassword').modal('show');
                }
                else {
                    $(this).addClass('grupSelected');
                    grups.push(ids);
                }
            }
        });

        $('#buttonAcceptarPasswordGrup').click(function() {
            var pass = $('#modalPassword').data('pass');
            var ids = $('#modalPassword').data('grup');
            var inputPass = $('#inputPassword').val();
            if (inputPass == pass) {
                $('#modalPassword').modal('hide');
                $(document).find('.grup[data-id="' + ids + '"]').addClass('grupSelected');
                grups.push(ids);
                $('#modalPassTitle').text(__('stringIntroduirPasswordGrup'));
                $('#modalPassword').val('');
            }
            else {
                $('#modalPassTitle').text(__('stringPasswordIncorrecte'));
                $('#inputPassword').focus();
            }
        });

        $('#buttonUnirse').click(function() {
            usuari.afegirseGrup(grups, function() {
                location.reload();
            });
        });
        /* PER FER....
        $('#inputBuscar').keyup(function() {
            if (!buscarPerNom) { //mostrar dropdown dels teus temas
                let t = $(this).val();
                $('#resBuscador').dropdown();
                if (t != "") {
                     $.ajax({
                        type: "POST",
                        url: urlServer + "/buscar/buscarLike.php?nom=" + t, //retorna tots els gustos amb el nom indicat;
                        dataType: 'json',
                        cache: false,
                        success: function (data) {
                            $('#resBuscador').append("<li>text</li>");
                        }
                    });
                }
                else {
                    $('#resBuscador').find('li').remove();
                    $('#resBuscador').hide();
                }
            }
        });*/

    });
});


function noResultats(tag) {
    $('#' + tag).append('<p style="font-size 14px; margin-top: 5px">' + __('stringNoResultats') + '<p>')
}