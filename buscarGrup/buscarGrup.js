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
                        var g = Grup.toHtmlForBuscar(data[i].idGrup, data[i].nomGrup);
                        $('#resultats').append(g);
                    }
                });
            }
            if (tema != '') {
               Grup.buscarGrupByTema(tema, usuari.idUsuari, function(data) {
                   for (var i = 0; i < data.length && i < 5; i++) {
                       var g = Grup.toHtmlForBuscar(data[i].idGrup, data[i].nomGrup);
                       $('#resultats').append(g);
                   }
               }) 
            }
        });

        $(document).on('click', '.grup', function() {
            $(this).addClass('grupSelected');
            var ids = $(this).data('id');
            grups.push(ids);
        });

        $('#buttonUnirse').click(function() {
            usuari.afegirseGrup(grups, function() {
                location.reload();
            });
        });
    });
});
