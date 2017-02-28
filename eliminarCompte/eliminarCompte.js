require(['Clases/Error', 'Clases/Usuari'], function () {
    $(document).ready(function () {

        $('#buttonEliminar').click(function () {
            $('.errorShow').text("");
            $('.loadingImg').show();
            var password = document.getElementById("inputPassword").value;
            var url = urlServer + "/delete/deleteCompte.php?idUsuari=" + usuari.idUsuari + "&password=" + password;
            $.ajax({
                type: "POST",
                url: url,
                cache: false,
                success: function (data) {
                    if (data == 1) {
                        alert("Usuari borrat");
                        storage.removeItem("idUsuari");
                        storage.removeItem("nomUsuari");
                        location.href = "login_reg.html";
                    } else if (data == 2) {
                        $('.loadingImg').hide();
                        $('.errorShow').text(__("{{stringContrasenyaIncorrecte}}"))
                    } else {
                        $('.loadingImg').hide();
                        $('.errorShow').text(__("{{stringErrorBorrarUsuari}}"))
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