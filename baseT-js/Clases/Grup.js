class Grup {

    constructor(idGrup, nomGrup, fotoGrup, usuaris, notificacions) {
        this.idGrup = idGrup;
        this.nomGrup = nomGrup;
        this.fotoGrup = fotoGrup;
        this.usuaris = usuaris; //també temas;
        this.notificacions = notificacions;
    }

    toHtml() {
        var str = '<div class="grup" data-id="' + this.idGrup + '">';
        str += '<div class="grupPhoto" style="position: relative">';
        if (this.notificacions > 0) {
            str += '<span class="badge" style="float: right; z-index: 1; position: absolute; margin-top: 5px; margin-left: 50px; background-color: #D51C1C;">' + this.notificacions + '</span>'
        }
        str += '<img src="' + urlServer + this.fotoGrup + '" class="img-circle imgGrup">';
        str += '</div>';
        str += '<div class="grupNom">';
        str += '<strong>' + this.nomGrup + '</strong>';
        str += '</br>';
        if (this.usuaris.length <= 3) {
            for (var j = 0; j < this.usuaris.length; j++) {
                var aux;
                if (this.usuaris[j] == usuari.nomUsuari) aux = 'tu';
                else aux = this.usuaris[j];
                if (j == 1 || j == 2) {
                    str += ', ';
                    str += aux;
                }
                else {
                    str += aux;
                }
            }
        }
        else {
            for (var j = 0; j < 3; j++) {
                var aux;
                if (this.usuaris[j] == usuari.nomUsuari) aux = 'tu';
                else aux = this.usuaris[j];
                str += aux + ', ';
            }
            str += '...';
        }
        str += '</div></div>';
        return str;
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
                $('#nomGrupTitle').text(data[0].nomGrup + " - " + __('stringMur'));
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
                if (data == 3) {
                    alert('No s\'han afegit tots els usuaris');
                }
                cambiPag('index.html');
            },
            error: function (xhr, status, error) {
                Error.showError(__("errorServerOut"));
            }
        });
    }

    static getMembresGrup(idGrup, onSucces) {
        $.ajax({
            type: "POST",
            url: urlServer + "/get/getMembresGrup.php?idGrup=" + idGrup,
            dataType: 'json',
            cache: false,
            success: function (data) {
                onSucces(data);
            },
            error: function (xhr, status, error) {
                Error.showError(__("errorServerOut"));
            }
        });
    }

    static afegirUsuarisGrup(idUsuari, usuarisGrup, idGrup, onSucces) {
        $.ajax({
            type: "POST",
            url: urlServer + "/insert/afegirUsuarisGrup.php?idGrup=" + idGrup + "&idUsuari=" + idUsuari + "&usuarisGrup=" + usuarisGrup,
            dataType: 'json',
            cache: false,
            success: function (data) {
                if (data == 3) {
                    alert('No usuaris afegits etc etc');
                }
                onSucces(data);
            },
            error: function (xhr, status, error) {
                Error.showError(__("errorServerOut"));
            }
        });
    }

    static setFotoGrup(idGrup, nomFoto, onSucces) {
        var ruta = "/imgServer/fotosGrup/" + nomFoto + "_" + idGrup + ".jpg";
        $.ajax({
            type: "POST",
            url: urlServer + "/update/updateFotoGrup.php?idGrup=" + idGrup + "&ruta=" + ruta,
            dataType: 'json',
            cache: false,
            success: function (data) {
                onSucces(data);
            },
            error: function (xhr, status, error) {
                Error.showError(__("errorServerOut"));
            }
        });
    }

    static getRutaFoto(idGrup, onSucces) {
        $.ajax({
            type: "POST",
            url: urlServer + "/get/getFotoGrup.php?idGrup=" + idGrup,
            dataType: 'json',
            cache: false,
            success: function (data) {
                onSucces(data);
            },
            error: function (xhr, status, error) {
                Error.showError(__("errorServerOut"));
            }
        });
    }
 }

