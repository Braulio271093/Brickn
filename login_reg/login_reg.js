
$(document).ready(function() {
     noEnrere(); //no poder anar enrere;
    //Funcions del buttons;
    $('#btnLoginDiv').click(function() {
        $('.buttons').hide();
        $('.log').fadeIn();
    });

    $('#btnRegistrarDiv').click(function() {
        $('.buttons').hide();
        $('.reg').fadeIn(); 
    });

    $('.btnBack').click(function() {
        $('.animated').removeClass("animated");
        $('.reg').hide();
        $('.log').hide();
        $('.buttons').fadeIn();
        $('.errorLogin').text(""); 
    });

    $('#btnRecuperarContrasenya').click(function() {
        cambiPag('recuperarContrasenya.html');
    });

    //-----------------

    //Boto entrar
    $('#btnEntrar').click(function() {
        $('.loadingImg').fadeIn();
        $('.errorLogin').text(""); 
        var nomUsuari = document.getElementById("inputEmailLogin").value; //nom d'usuari;
        var password = document.getElementById("inputPasswordLogin").value; // el password,
        var url = urlServer + '/funcions/entrar.php?nomUsuari=' + nomUsuari + '&password=' + password; //juntem tota la url, pro1234bri.wow64.net == direccio global de la meva raspberry, si esta oberta es conectarà.
        $.ajax
        ({
            type: "POST",
            url: url,
            dataType: 'json',
            cache: false,
            success: function(data)
            {
                //alert(data.errorDades + " " + data.idUsuari + " " + data.nomUsuari + " " + data.password);
                if (data.errorDades == "1") { //hi ha un error amb les dades;
                    $('.loadingImg').hide();
                    $('.errorLogin').text(__("{{stringDadesIncorrectes}}"));
                }
                else {
                    storage.setItem("idUsuari", data.idUsuari);
                    storage.setItem("nomUsuari", data.nomUsuari);
                    location.href = "../index/index.html";
                }
            },
            error: function(xhr, status, error) { //si hi ha un error al connectar-se al servidor;
                $('.loadingImg').hide();
                $('.errorLogin').text(__("{{errorServerOut}}")); 
            }
        }); 

    });
    //----------

    //Recollir el text per modificar el titol superior.
    $(".preguntaSecreta").click(function(){
        var aux = $(this).text();
        $("#textPregunta").text(aux);   
    });
                                
                            
    //Boto registrar
    $('#btnRegistrar').click(function() {
        $('.errorLogin').text(""); 
        var nomUsuari = document.getElementById("inputNomUsuari").value;
        var password = document.getElementById("inputPassword").value;
        var resposta  = document.getElementById("inputPregunta").value;
        if (nomUsuari == "" || password == "" || resposta == "") { //comprovar que no hi hagi dades en blanc
            $('.errorLogin').text("Hi ha dades en blanc");
            if(nomUsuari == ""){
                $('#divNom').addClass('has-error');
            }else{
                $('#divNom').removeClass('has-error');
            }
            if(password == ""){
                $('#divPass').addClass('has-error');
            }else{
                $('#divPass').removeClass('has-error');
            }
            if(resposta == ""){
                $('#divPregunta').addClass('has-error');
            }else{
                $('#divPregunta').removeClass('has-error');
            }
            
        }
        else {
             $('.loadingImg').fadeIn();
            var url = urlServer + "/funcions/registrar.php?nomUsuari=" + nomUsuari + "&password=" + password + "&resposta=" + resposta;
            $.ajax
            ({
                type: "POST",
                url: url,
                success: function(data)
                {
                    if (data == 1) {
                        $('.loadingImg').hide();
                        $('.errorLogin').text(__("stringUsuariCreat")); 
                    }
                    else {
                        $('.loadingImg').hide();
                        $('.errorLogin').text(__("stringUsuariNoCreat"));
                        $('#divEmail').addClass('has-error');
                    }
                },
                error: function() {
                    $('.loadingImg').hide();
                    $('.errorLogin').text(__("errorServerOut")); 
                }
            });
        }
    });
});
