$(document).ready(function() {
    var idGo; //id de la pestanya a la que vols anar;

    $('.btnBack').click(function() { 
        if ($('#listOpcions').is(":visible")) {
            cambiPag("index.html");      
        }
        else {
            $('#subOpcions').find('div.' + idGo).hide();
            $('#subOpcions').hide();
            $('#listOpcions').show();
        }
    })

    $('.elementOpcions').click(function() { //al apretar una opcio;
        idGo = $(this).data('id'); //obtenir quina opcio s'ha apretat;
        $('#listOpcions').hide(); //ocultar el div de les opcions;
        $('#subOpcions').show(); //mostrar el div on està el contigut de les opcions;
        $('#subOpcions').find('div.' + idGo).show(); //mostrar el div corresponen a la opcio seleccionada;
    })

    $('#eliminarCompte').click(function() {
        cambiPag("eliminarCompte.html");
    });
    
    $('#cambiarNomUsuari').click(function() {
        cambiPag("cambiarNomUsuari.html");
    });

    $('#cambiarContrasenya').click(function() {
        cambiPag("cambiarContrasenya.html");
    });

    $('#guardarLoca').click(function() {
        var local = $('#localitzacio').val();
        var lat = $('#lat').val();
        var lon = $('#long').val();
        usuari.setLocalitzacio(local, lat, lon, function() {
            cambiPag('index.html');
        });
    });
})
