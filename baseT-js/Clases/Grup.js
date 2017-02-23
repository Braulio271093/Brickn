class Grup {

    /**
     * Afegir al index els grups privats del usuari;
     * @param idGrup
     * @param nomGrup
     * @param idUsuari;
     */
    static appendGrupPrivats(idGrup, nomGrup, idUsuari) {
        $.ajax({
            type: "POST",
            url: urlServer + "/get/getMembresGrupPrivat.php?idUsuari=" + idUsuari + "&idGrup=" + idGrup,
            dataType: 'json',
            cache: false,
            success: function (data) {
               Grup.onSuccesGrupPrivat(idGrup, nomGrup, idUsuari, data);
            },
            error: function (xhr, status, error) {
                Error.showError("error: " + error);
            }
        });
    }

    /**
     * Callback dels grups privats;
     * @param idGrup
     * @param nomGrup
     * @param idUsuari;
     */
    static onSuccesGrupPrivat(idGrup, nomGrup, idUsuari, data) {
        Grup.obtenirNotificacions(idGrup, idUsuari, function(num) {
            var membres = [];
            var str = '<div class="grup" data-id="' + idGrup + '">';
            str += '<div class="grupPhoto" style="position: relative">';
            if (num > 0) {
                str += '<span class="badge" style="float: right; z-index: 1; position: absolute; margin-top: 5px; margin-left: 50px; background-color: #D51C1C;">' + num + '</span>'
            }
            str += '<img src="../baseT-css/img/nofoto.png" alt="..." class="img-circle imgGrup">';
            str += '</div>';
            str += '<div class="grupNom">';
            str += '<strong>' + nomGrup + '</strong>';
            str += '</br>'; //aqui van els integrants del grup;
            if (data.length < 3) {
                for (var j = 0; j < data.length; j++) {
                    if (j == 1) {
                        str += ', ';
                        str += data[j].nomUsuari;
                    }
                    else {
                        str += data[j].nomUsuari;
                    }
                }
            }
            else {
                for (var j = 0; j < 3; j++) {
                    str += data[j].nomUsuari + ', ';
                }
                str += '...';
            }
            str += '</div></div>';
            $('#teusGrups').append(str);
            $('#teusGrups').find('.grup [data-id="' + idGrup + '"]').fadeIn('fast');
        });
    }

    static appendGrupPublic (idGrup, nomGrup) {
        $.ajax({
            type: "POST",
            url: urlServer + "/get/getTemasGrupPublic.php?idGrup=" + idGrup,
            dataType: 'json',
            cache: false,
            success: function (data) {
                Grup.onSuccesGrupPublic(idGrup, nomGrup, data);
            },
            error: function (xhr, status, error) {
                Error.showError("Error: " + error);
            }
        });
    }

    /**
     * Callback grups publics
     */
    static onSuccesGrupPublic(idGrup, nomGrup, data) {
        var str = Grup.toHtml(idGrup, nomGrup, data);
        $('#mon').append(str);
    }

    /**
     * Convertir les dades d0un grup a html per el buscador de grups (elimina paddings, margins, width)
     * @param idGrup
     * @param nomGrup
     */
    static toHtmlForBuscar(idGrup, nomGrup, pass) {
        var str = '<div class="grup grupBuscar" data-id="' + idGrup + '" data-pass="' + pass + '">';
        str += '<div class="grupPhoto" style="position: relative">';
        if (pass != 0) {
            str += '<span class="badge" style="float: right; z-index: 1; position: absolute; margin-top: 5px; margin-left: 50px; background-color: #D51C1C; height: 20px;">' ;
            str += '<span class="glyphicon glyphicon-lock" aria-hidden="true"></span>';
            str += '</span>';
        }
        str += '<img src="../baseT-css/img/nofoto.png" alt="..." class="img-circle imgGrup" height="60px" width="60px">';
        str += '</div>';
        str += '<div class="grupNom">';
        str += '<strong>' + nomGrup + '</strong>';
        str += '</br>';
        str += '</div></div>';
        return str;
    }

    static toHtmlForBuscarWithTema(idGrup, nomGrup, tema) {
        var str = '<div class="grup grupBuscar" data-id="' + idGrup + '">';
        str += '<div class="grupPhoto">';
        str += '<img src="../baseT-css/img/nofoto.png" alt="..." class="img-circle imgGrup" height="60px" width="60px">';
        str += '</div>';
        str += '<div class="grupNom">';
        str += '<strong>' + nomGrup + '</strong>';
        str += '</br>';
        str += tema;
        str += '</div></div>';
        return str;
    }

    /**
     * Dades d'un grup a html;
     * @param idGrup;
     * @param nomGrup;
     * @param data (els temes que son retornats amb ajax);
     */
    static toHtml(idGrup, nomGrup, data) {
        var str = '<div class="grup" data-id="' + idGrup + '">';
        str += '<div class="grupPhoto" style="position: relative">';
        str +=      '<img src="../baseT-css/img/nofoto.png" alt="..." class="img-circle imgGrup">';
        str += '</div>';
        str += '<div class="grupNom">';
        str += '<strong>' + nomGrup + '</strong>';
        str += '</br>';
        if (data.length < 3) {
            for (var j = 0; j < data.length; j++) {
                if (j == 1) {
                    str += ', ';
                    str += data[j].tema;
                }
                else {
                    str += data[j].tema;
                }
            }
        }
        else {
            for (var j = 0; j < 3; j++) {
                str += data[j].tema + ', ';
            }
            str += '...';
        }
        str += '</div></div>';
        return str;
    }
    /**
     * Obtenir les dades del grup i crear les publicacions;
     * @param idGrup id del grup;
     * @param publicacions array;
     * @param onSucces funcio que es fa al obtenir les dades;
     */
    static getDadesGrup(idGrup, publicacions, onSucces) {
        $.ajax({
            type: "POST",
            url: urlServer + "/get/getDadesGrup.php?idGrup=" + idGrup,
            dataType: 'json',
            cache: false,
            success: function (data) {
                $('.miniHeaderLeftTitle').text(data[0].nomGrup + " - Mur");
                for (var i = 2; i <= data[1].numPublicacions + 1; i++) {
                    var p = new Publicacio(data[i].publicacio.id, data[i].publicacio.publicador, data[i].publicacio.dataPublicacio, data[i].publicacio.publicacio, data[i].publicacio.tipus);
                    publicacions.push(p);
                }
                onSucces();
            },
            error: function (xhr, status, error) {
                alert("error: " + error);
            }
        });
    }

    /**
     * Buscar grups per el nom on al que l'usuari no estigui unit;
     */
    static buscarGrupByNom(nom, idUsuari, onSucces) {
        $.ajax({
            type: "POST",
            url: urlServer + "/buscar/buscarGrupByNom.php?q=" + nom + "&idUsuari=" + idUsuari,
            dataType: 'json',
            cache: false,
            success: function (data) {
                onSucces(data);
            },
            error: function (xhr, status, error) {
                Error.showError("Error: " + error);
            }
        });
    }

    /**
     * Buscar un grup per el temea on el usuari no estiugi unit;
     */
    static buscarGrupByTema(tema,idUsuari, onSucces) {
        $.ajax({
            type: "POST",
            url: urlServer + "/buscar/buscarGrupByTema.php?q=" + tema + "&idUsuari=" + idUsuari,
            dataType: 'json',
            cache: false,
            success: function (data) {
                onSucces(data);
            },
            error: function (xhr, status, error) {
                Error.showError("Error: " + error);
            }
        });
    }

    /**
     * Obtenir el numero de publicacions que s'han fet en un grup desde l'ultim access del usuari;
     * @param idGrup
     * @param idUsuari;
     * @param onSucces
     */
    static obtenirNotificacions(idGrup, idUsuari, onSucces) {
        $.ajax({
            type: "POST",
            url: urlServer + "/get/getNotificacions.php?idGrup=" + idGrup + "&idUsuari=" + idUsuari,
            dataType: 'json',
            cache: false,
            success: function (data) {
                onSucces(data);
            },
            error: function (xhr, status, error) {
                Error.showError("Error: " + error);
            }
        });
    }


    static buttonMesToHtml() {
        return "<div class='buttonMesPublicacionsDiv'>" +
            '<button type="button" class="buttonNoStyle buttonMesPublicacions" aria-label="Left Align">' +
                '<span class="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span>' +
            '</button></div>'
    }

    /**
     * Afegir un grup a la base de dades;
     * @param nomGrup
     * @param tipus
     * @param usuarisGrup
     * @param temesGrup
     * @param pass
     */
    static crearGrup(nomGrup, tipus, usuarisGrup, temesGrup, pass) {
        $.ajax({
            type: "POST",
            url: urlServer + "/insert/afegirGrup.php?nomGrup=" + nomGrup + "&tipus=" + tipus + "&usuarisGrup=" + usuarisGrup + "&temesGrup=" + temesGrup + "&pass=" + pass,
            dataType: 'json',
            cache: false,
            success: function (data) {
                cambiPag('index.html');
            },
            error: function (xhr, status, error) {
                Error.showError(__("errorServerOut"));
            }
        });
    }
 }

