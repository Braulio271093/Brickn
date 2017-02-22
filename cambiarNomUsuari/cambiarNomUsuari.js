require(['Clases/Error', 'Clases/Usuari'], function () {
    $(document).ready(function () {

        $('#buttonModificar').click(function () {
            $('.errorShow').text("");
            $('.loadingImg').show();
            var password = document.getElementById("inputPassword").value;
            var nouNom = document.getElementById("inputNomUsuari").value;
            var url = urlServer + "/update/cambiarNomUsuari.php?idUsuari=" + usuari.idUsuari + "&password=" + password + "&nouNom=" + nouNom;
            $.ajax({
                type: "POST",
                url: url,
                cache: false,
                success: function (data) {
                    if (data == 1) {
                        storage.setItem("nomUsuari", nouNom);
                        $('.loadingImg').hide();
                        $('.errorShow').text(__("{{stringNomUsuariModificat}}"));
                    } else if (data == 2) {
                        $('.loadingImg').hide();
                        $('.errorShow').text(__("{{stringContrasenyaIncorrecte}}"));
                    } else if (data == 0) {
                        $('.loadingImg').hide();
                        $('.errorShow').text(__("{{stringNomUsuariExisteix}}"));
                    } else {
                        $('.loadingImg').hide();
                         $('.errorShow').text(__("{{stringErrorCambiarNomUsuari}}"));
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