/** 
 * Script comú en totes les pàgines.
 */

/**
 *  CONFIGURACIÓ
 *  Per canviar la configuracio de la base de dades anar al script connectDB.php;
 */
var urlServer = "http://bris.ddns.net" //url del servidor; http://pro1234brik.sytes.net"
var debug = true;
var storage = window.localStorage; //base de dades local;
var idioma = storage.getItem("idioma");
if (idioma == null) {
    idioma = navigator.language;
    storage.setItem("idioma", idioma);
}
var usuari;
//---------------

//Apis de apache cordova
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;
}
require(['translate', 'Clases/Utils' ,'Clases/Usuari'], function () {
    
    if (location.href != 'login_reg.html') {
        usuari = new Usuari(storage.getItem('idUsuari'), storage.getItem('nomUsuari'));
    }

    $(document).ready(function () { 

        $('.ocult').hide(); //ocultem tots els div que tenen la clase ocult;
        $('body').fadeIn('fast');

        $('#btnBackToOpcions').click(function () {
            cambiPag("opcions.html");
        });  
      
        $('#btnBackToIndex').click(function () {
            cambiPag('index.html');                                
        });

        $('.idioma').click(function() { //selector d'idiomes; Present en opcions.html i login_reg.html
            var idioma = $(this).data('id');
            storage.setItem("idioma", idioma);
            location.reload();
        });

        $('.pagInfoButton').click(function() {
            $('#modalInfo').modal();
        });
    });
});


/**
 * Funcio per cambiar de pagina;
 * @param nextPage ruta de la pagina;
 */
function cambiPag(nextPage) {
    nFolder = nextPage.substring(0,nextPage.indexOf('.'));
    nextPage = "../" + nFolder + "/" + nextPage; 
    $('body').fadeOut(100, function () {
        location.href = nextPage;
    });
}


function noEnrere() { //funcio que bloqueja el boto de anar enrere;
    window.location.hash = "no-back-button";
    window.location.hash = "Again-No-back-button" //chrome
    window.onhashchange = function () {
        window.location.hash = "no-back-button";
    }
}
