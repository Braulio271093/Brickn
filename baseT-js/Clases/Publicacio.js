class Publicacio {

    constructor(id, publicador, dataPublicacio, publicacio, tipus, numComentaris) {
        this.id             = id;
        this.publicador     = publicador;
        this.dataPublicacio = dataPublicacio;
        this.publicacio     = publicacio;
        this.tipus          = tipus;
        this.numComentaris  = numComentaris;
    }
    
    /**
     * Obtenir la publicacio amb html;
     */
    publicacioToHtml() {
        var body = this.publicacio;
        let str = ''; 
        if (this.tipus == 1) {
            var rutaFoto = this.publicacio;
            rutaFoto += '.jpg';
            body = "<img class='imatgePublicacio' src=" + urlServer + rutaFoto + ">";
        }
        str += "<div class='publicacio' data-id='" + this.id + "'>";
        str +=   "<div class='fotoPublicador' style='float: left'><img class='img-circle fotoPublicadorImg' src='" + urlServer + "/imgServer/fotosPerfil/nofoto.png" + "'></div>";
        str +=   "<div class='titolPublicacio'>";
        str +=       "<p>" + this.publicador + "</p>"; 
        str +=       "<p>" + Publicacio.convertirData(this.dataPublicacio) + "</p>"; 
        str +=   "</div>"; 
        str +=   "<div class='bodyPublicacio'>";
        str +=       body;
        str +=  "</div>";
        str +=  "<div class='buttonComentaris' style='margin-top: 20px; font-size: 16px; position: relative'>";
        if (this.numComentaris > 0) str +='<span class="badge" style="z-index: 1; position: absolute; bottom: 22px; left: 33px; background-color: #D51C1C;">' + this.numComentaris + '</span>';
        str +=            "<button class='buttonNoStyle buttonMostrarComentaris' style='font-size: 20px'>";
        str +=                "<span class='glyphicon glyphicon-comment' aria-hidden='true'></span>";
        str +=            "</button>";
        str +=        "</div>";
        str +=        "<div class='comentarisPublicacio' style='display: none'>";
        str +=            "<div class='input-group inputComentar' style='margin-top: 5px; margin-bottom: 5px'>";
        str +=                "<input type='text' class='form-control inputPublicarComentari' placeholder='....'>";
        str +=                "<span class='input-group-btn'>";
        str +=                   "<button class='btn btn-danger buttonComentar' type='button'>" + __('stringComentar') + "</button>";
        str +=                "</span>";
        str +=            "</div>";
        str +=        "</div>";
        str +=    "</div>";
        return str;
    }

    static toHtmlForIndex(nomPublicador, nomGrup, publicacio, tipus, idGrup, dataPublicacio) {
        var str;
        if (tipus == 0) {
            str = '<div class="publicacioMur" data-id="' + idGrup + '">'+
                    '<p class="publicacioMurHeader">'+
                       '<p>De <strong>' + nomPublicador + "</strong> desde <strong>" + nomGrup + '</strong>:</p>' +
                       '<p style="float: right; position: relative; bottom: 33px; color: gray; font-size: 14px">' +  Publicacio.convertirData(dataPublicacio) +'</p>'  +   
                    '</p>' +
                    '<p class="publicacioMurBody">'+
                        publicacio +
                    '</p>' +
                '</div>';
        }
        else if (tipus == 1) {

        }
        return str;
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
    static convertirData(date) {
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
    static afegirPublicacio(idGrup, idUsuari, publicacio, tipus, onSuccess) {
        $.ajax({
            type: "POST",
            url: urlServer + "/insert/afegirPublicacio.php?idGrup=" + idGrup + "&idUsuari=" + idUsuari + "&publicacio=" + publicacio + "&tipus=" + tipus,
            dataType: 'json',
            cache: false,
            success: function (data) {
                if (data == 1) {
                    onSuccess();
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