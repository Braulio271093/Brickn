class Publicacio {

    constructor(id, publicador, dataPublicacio, publicacio, tipus) {
        this.id             = id;
        this.publicador     = publicador;
        this.dataPublicacio = dataPublicacio;
        this.publicacio     = publicacio;
        this.tipus = tipus;
    }

    /**
     * Obtenir la publicacio amb html;
     */
    publicacioToHtml() {
        var body = this.publicacio;
        if (this.tipus == 1) {
            var rutaFoto = this.publicacio;
            rutaFoto += '.jpg';
            body = "<img class='imatgePublicacio' src=" + urlServer + rutaFoto + ">";
        }
        return "<div class='publicacio' data-id='" + this.id + "' style='display: none'>" +
                "<div class='fotoPublicador' style='float: left'><img class='img-circle fotoPublicadorImg' src='" + urlServer + "/imgServer/fotosPerfil/nofoto.png" + "'></div>" +
                "<div class='titolPublicacio'>" +
                    "<p>" + this.publicador + "</p>" +
                    "<p>" + this.convertirData(this.dataPublicacio) + "</p>" +
                "</div>" +
                "<div class='bodyPublicacio'>" +
                    body +
                "</div>" +
                "<div class='buttonComentaris' style='margin-top: 20px; font-size: 16px'>" +
                    "<button class='buttonNoStyle buttonMostrarComentaris' style='font-size: 20px'>" +
                        "<span class='glyphicon glyphicon-comment' aria-hidden='true'></span>" +
                    "</button>" +
                "</div>" +
                "<div class='comentarisPublicacio' style='display: none'>" +
                    "<div class='input-group inputComentar' style='margin-top: 5px; margin-bottom: 5px'>" +
                        "<input type='text' class='form-control inputPublicarComentari' placeholder='Escriu algo...'>" +
                        "<span class='input-group-btn'>" +
                            "<button class='btn btn-danger buttonComentar' type='button'>Comentar</button>" +
                        "</span>" +
                    "</div>" +
                "</div>" +
            "</div>";
    }

    static cargarImatgesPublicador(idPublicacio, publicador) {
        Usuari.getIdByNom(publicador, function(idUsuari) {
            $.ajax({
                type: "POST",
                url: urlServer + "/get/getFotoUsuari.php?idUsuari=" + idUsuari,
                dataType: 'json',
                cache: false,
                success: function (data) {
                    $('.publicacio').attr('id', idPublicacio).find('.fotoPublicador').find('img').attr('src', urlServer + data);
                },
                error: function (xhr, status, error) {

                }
            });
        });
    }
    
    /**
     * Convertir la data de publicacio;
     * @param data de la publicacio;
     */
    convertirData(date) {
        var ret = "";

        var t = date.split(/[- :]/); //YYYY, MM, DD, HH, mm, ss
        date = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]); //date de la bd;
        var dateNow = new Date(); //data d'ara;
        if (dateNow.getDay() == date.getDay() && dateNow.getFullYear() == date.getFullYear()
            && dateNow.getMonth() == date.getMonth()) { //la publicacio s'ha fet en el mateix dia;
            if (date.getHours() == dateNow.getHours()) {
                ret = (dateNow.getMinutes() - date.getMinutes()) + 'm ' + __('stringAbans');
            }
            else {
                ret = (dateNow.getHours() - date.getHours()) + "h " + __('stringAbans');
            }
        }
        else {
            var i = storage.getItem("idioma");
            if (date.getDay() + 1 == dateNow.getDay() && date.getFullYear() == dateNow.getFullYear() && date.getMonth() == dateNow.getMonth()) {
                ret = __('stringAhir');
            }
            else {
                if (i == 'en') { //any-mes-dia
                    ret = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay();
                }
                else { //dia-mes-any
                    ret = date.getDay() + "-" + date.getMonth() + "-" + date.getFullYear();
                }
            }
        }        
        return ret;
    }

    /**
     * Afegir una publicacio al grup; al afegirse es recarrega la pagina;
     * @param idGrup 
     * @param idUsuari
     * @param publicacio;
     */
    static afegirPublicacio(idGrup, idUsuari, publicacio, tipus) {
        $.ajax({
            type: "POST",
            url: urlServer + "/insert/afegirPublicacio.php?idGrup=" + idGrup + "&idUsuari=" + idUsuari + "&publicacio=" + publicacio + "&tipus=" + tipus,
            dataType: 'json',
            cache: false,
            success: function (data) {
                if (data == 1) {
                    location.href = window.location;
                }
            },
            error: function (xhr, status, error) {
                alert("error: " + error);
            }
        });
    }

    /**
     * Afegir comentari a la publicacio;
     * @param idPublicacio
     * @param idUsuari
     * @param text (text del comentari)
     */
    static afegirComentari(idPublicacio,idUsuari, text) {
        $.ajax({
            type: "POST",
            url: urlServer + "/insert/afegirComentari.php?idPublicacio=" + idPublicacio + "&idUsuari=" + idUsuari + "&comentari=" + text,
            dataType: 'json',
            cache: false,
            success: function (data) {
                if (data == 1) {
                    Publicacio.obtenirComentaris(idPublicacio, function(comentaris) { //mostrar el ultim comentari sense recargar la pagina;
                        var c = new Comentari(comentaris[0].idUsuari, comentaris[0].comentari, comentaris[0].dataComentari);
                        $('body').find('[data-id="' + idPublicacio + '"]').find('.inputComentar').after(c.toHtml());
                    });
                }
            },
            error: function () { //si hi ha un error al connectar-se al servidor;
                console.log("Error al cargar els contactes del usuari");
            }
        });
    }

    /**
     * Obtenrir tots els comentaris;
     * @param idPublicacio
     * @param onSuccess
     */
    static obtenirComentaris(idPublicacio, onSuccess) {
        $.ajax({
            type: "POST",
            url: urlServer + "/get/getComentaris.php?idPublicacio=" + idPublicacio,
            dataType: 'json',
            cache: false,
            success: function (data) {
                if (data != 0) {
                    onSuccess(data);                
                }
            },
            error: function () { //si hi ha un error al connectar-se al servidor;
               console.log("Error al cargar els contactes del usuari");
            }
        });
    }
}


/**
 *             <div class='publicacio'>
                    <div class='titolPublicacio'>
                        <p>de pau</p>
                        <p>2123-21-12</p>
                    </div>
                <div class='bodyPublicacio'>
                    HOLA HOLA HOLA HOLA                    
                </div>
                <div class='buttonComentaris'>
                    <button class='buttonNoStyle buttonMostrarComentaris' style='font-size: 20px'>
                          <span class='glyphicon glyphicon-comment' aria-hidden='true'></span>
                    </button>
                </div>
                <div class='comentarisPublicacio ocult'>
                    <div class='input-group' style='margin-top: 5px'>
                        <input type='text' class='form-control' id='inputPublicarComentari' placeholder='Escriu algo...'>
                        <span class='input-group-btn'>
                            <button class='btn btn-danger' type='button' id='buttonPublicar'>Publicar</button>
                        </span>
                    </div>
                     <!--<div class='comentariPublicacio'>
                        <div>
                            de pau:
                        </div>
                        <div>
                            HOLA HOLA
                        </div>
                    </div> --> 
                </div>
            </div>
 */