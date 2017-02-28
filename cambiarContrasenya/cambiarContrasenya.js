require(['Clases/Error', 'Clases/Usuari'], function () {
    $(document).ready(function () {

        $('#buttonModificar').click(function () {
            $('.errorShow').text("");
            $('.loadingImg').show();
            var password = document.getElementById("inputPassword").value;
            var nouContra = document.getElementById("inputPasswordNueva").value;
            var url = urlServer + "/update/cambiarContrasenya.php?idUsuari=" + usuari.idUsuari + "&password=" + password + "&novaContra=" + nouContra;
            $.ajax({
                type: "POST",
                url: url,
                cache: false,
                success: function (data) {
                    if (data == 1) {
                        $('.loadingImg').hide();
                        $('.errorShow').text(__("{{stringContrasenyaModificada}}"));
                    } else if (data == 2) {
                        $('.loadingImg').hide();
                        $('.errorShow').text(__("{{stringContrasenyaIncorrecte}}"));
                    } else {
                        $('.loadingImg').hide();
                        $('.errorShow').text(__("{{stringErrorCambiarContrasenya}}"));
                    }
                },
                error: function () { //si hi ha un error al connectar-se al servidor;
                    $('.loadingImg').hide();
                    $('.errorShow').text(__("{{errorServerOut}}"));
                }
            });
        });
    });
});