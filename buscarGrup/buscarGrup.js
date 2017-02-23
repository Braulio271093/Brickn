require(['Clases/Grup'], function() {
    $(document).ready(function() {

        var grups = []; //ids dels grups al que l'usuari es vol unir;

        $('#buttonBuscar').click(function() {
            $('#resultats').empty();
            var nom = $('#inputNomGrup').val();
            var tema = $('#inputTemaGrup').val();
            if (nom != '') {
                Grup.buscarGrupByNom(nom, usuari.idUsuari, function(data) {
                    for (var i = 0; i < data.length && i < 5; i++) {
                        var g = Grup.toHtmlForBuscar(data[i].idGrup, data[i].nomGrup, data[i].pass);
                        $('#resultats').append(g);
                    }
                });
            }
            if (tema != '') {
               Grup.buscarGrupByTema(tema, usuari.idUsuari, function(data) {
                   for (var i = 0; i < data.length && i < 5; i++) {
                       var g = Grup.toHtmlForBuscar(data[i].idGrup, data[i].nomGrup, data[i].pass);
                       $('#resultats').append(g);
                   }
               }) 
            }
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
    });
});
