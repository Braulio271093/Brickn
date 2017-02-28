require(['Clases/Error', 'Clases/Usuari'], function () {
    $(document).ready(function () {
        var usuario;

        $('#buttonAceptarUsuari').click(function () {
            usuario = document.getElementById("inputUsuario").value;
            var url = urlServer + "/funcions/recuperarContrasenya.php?funcio=1&nomUsuari=" + usuario;

            if (usuario == "") {
                $('.errorShow').text(__("{{stringNomUsuariEnBlanc}}"));
            }
            else {
                $('.errorShow').hide();
                $.ajax({
                    type: "POST",
                    url: url,
                    cache: false,
                    success: function (data) {
                        if (data == 1) {
                            $('#divNomUsuari').hide();
                            $('#divPregunta').fadeIn();
                        }
                        else if (data == 0) {
                            $('.errorShow').show();
                            $('.errorShow').text(__("{{stringNomUsuariNoExisteix}}"));

                        }
                    },
                    error: function () { //si hi ha un error al connectar-se al servidor;
                        $('.errorShow').show();
                        $('.errorShow').text(__("{{errorServerOut}}"));
                    }
                });
            }
        });

        $('#buttonAceptarPregunta').click(function () {
            var resposta = document.getElementById("inputPregunta").value;
            var url = urlServer + "/funcions/recuperarContrasenya.php?funcio=2&nomUsuari=" + usuario + "&resposta=" + resposta;
            if (resposta == "") {
                $('.errorShow').text(__("{{stringRespostaEnBlanc}}"));
            }
            else {
                $('.errorShow').hide();
                $.ajax({
                    type: "POST",
                    url: url,
                    cache: false,
                    success: function (data) {
                        if (data == 1) {
                            $('#divPregunta').hide();
                            $('#divNovaContrasenya').fadeIn();
                        }
                        else if (data == 2) {
                            $('.errorShow').show();
                            $('.errorShow').text(__("{{stringRespostaIncorrecta}}"));

                        }
                    },
                    error: function () { //si hi ha un error al connectar-se al servidor;
                        $('.errorShow').show();
                        $('.errorShow').text(__("{{errorServerOut}}"));
                    }

                });
            }
        });

        $('#buttonAceptarNovaContrasenya').click(function () {
            var passw = document.getElementById("inputPasswordNueva").value;
            var passw2 = document.getElementById("inputPasswordNueva2").value;

            if (passw == "" || passw2 == "") {
                $('.errorShow').text(__("{{stringContrasenyaEnBlanc}}"));
            }
            else if (passw != passw2) {
                $('.errorShow').text(__("{{stringContrasenyaDiferents}}"));
            }
            else {
                var url = urlServer + "/funcions/recuperarContrasenya.php?funcio=3&nomUsuari=" + usuario + "&password=" + passw;
                $('.errorShow').hide();
                $.ajax({
                    type: "POST",
                    url: url,
                    cache: false,
                    success: function (data) {
                        if (data == 1) {
                            alert(__('{{stringContrasenyaCanviada}}'));
                            cambiPag("login_reg.html");
                        } 
                        else if (data == 0) {
                            alert(__('{{stringErrorCambiarContrasenya}}'));
                        }
                    },
                    error: function () { //si hi ha un error al connectar-se al servidor;
                        $('.errorShow').show();
                        $('.errorShow').text(__("{{errorServerOut}}"));
                    }
                });
            }
        });
    });
});