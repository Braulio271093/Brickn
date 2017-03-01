/**
 * Clase usuari;
 */
class Usuari {
    constructor(idUsuari, nomUsuari) {
        this.idUsuari = idUsuari;
        this.nomUsuari = nomUsuari;
        this.contactes = [];
        this.temas = [];
    }
    /**
     * Afegir al index els grups privats del usuari;
     */
    mostrarGrupsPrivats() {
        var id = this.idUsuari;
        $.ajax({
            type: "POST",
            url: urlServer + "/get/getGrupsPrivatsUsuari.php?idUsuari=" + this.idUsuari,
            dataType: 'json',
            cache: false,
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    Grup.appendGrupPrivats(data[i].idGrup, data[i].nomGrup, id);
                }
            },
            error: function (xhr, status, error) {
                Error.showError(__("{{errorServerOut}}"));
            }
        });
    }

    /**
     * Afegir al index els grups publics del usuari;
     */
    mostrarGrupsPublics() {
        $.ajax({
            type: "POST",
            url: urlServer + "/get/getGrupsPublicsUsuari.php?idUsuari=" + this.idUsuari,
            dataType: 'json',
            cache: false,
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    Grup.appendGrupPublic(data[i].idGrup, data[i].nomGrup);
                }
            },
            error: function (xhr, status, error) {
                Error.showError(__("{{errorServerOut}}"));
            }
        });
    }

    /**
     * Obtenir els contactes del usuari;
     */
    getContactes() {
        $.ajax({
            type: "POST",
            url: urlServer + "/get/getContactesUsuari.php?idUsuari=" + this.idUsuari, //el script reotrna un array amb tots els contactes;
            dataType: 'json',
            cache: false,
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    usuari.contactes.push(data[i]);
                }
            },
            error: function () { //si hi ha un error al connectar-se al servidor;
                Error.showError("Error al cargar els contactes del usuari");
            }
        });
    }

    /**
     * Obtenir els contactes del usuari;
     * @param onSuccess funcio a executar al obtenir tots els contactes;
     */
    getContactes(onSuccess) {
        $.ajax({
            type: "POST",
            url: urlServer + "/get/getContactesUsuari.php?idUsuari=" + this.idUsuari, //el script reotrna un array amb tots els contactes;
            dataType: 'json',
            cache: false,
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    usuari.contactes.push(data[i]);
                }
                onSuccess();
            },
            error: function () { //si hi ha un error al connectar-se al servidor;
                Error.showError("Error al cargar els contactes del usuari");
            }
        });
    }
    /**
     * Mostrar en llista els usuaris;
     * @param ul els resultats es mostres en una llista, indicar-la;
     * @param liClass clase que tindra el element (removeContacte or addContacte);
     */
    actualitzarContactes(ul, liClass) {
        $('#' + ul).find('li').remove();
        var glyp = 'glyphicon-ok-circle'; //icono del element;
        if (liClass == 'removeContacte') {
            glyp = 'glyphicon glyphicon-remove-circle';
        }
        if (usuari.contactes.length != 0) {
            for (var i = 0; i < usuari.contactes.length; i++) {
                $('#' + ul).append("<li><button class='buttonNoStyle " + liClass + "'><span class='glyphicon " + glyp + "'></span></button>" + usuari.contactes[i] + "</li>");
            }
        }
        else {
            $('#' + ul).append("<li>" + __("{{stringNoContactesAfegits}}") + "</li>");
        }  
    }

    /**
     * Afegir al usuari un contacte;
     * @param idContacte id del contacte a agregar;
     */
    afegirContacte(idContacte) {
        $.ajax({
            type: "POST",
            url: urlServer + "/insert/afegirContacte.php?idUsuari=" + this.idUsuari + "&idUsuari2=" + idContacte + "&acceptat=0",
            dataType: 'json',
            cache: false,
            success: function (data) {
                usuari.getContactes(function() {
                    usuari.actualitzarContactes('mostrarContactes', 'removeContacte')
                });
            },
            error: function () {
                Error.showError(__("{{errorServerOut}}"));
            }
        });
    }

    /**
     * Afegir al usuari un contacte amb el cap acceptat a 1;
     */
    afegirContacteAcceptat(idContacte) {
         $.ajax({
            type: "POST",
            url: urlServer + "/insert/afegirContacte.php?idUsuari=" + this.idUsuari + "&idUsuari2=" + idContacte + "&acceptat=1",
            dataType: 'json',
            cache: false,
            success: function (data) {
                
            },
            error: function () {
                Error.showError(__("{{errorServerOut}}"));
            }
        });
    }


    /**
     * Obtenir els temas del usuari
     */
    getTemas() {
        usuari.temas = [];
        $.ajax({
            type: "POST",
            url: urlServer + "/get/getTemasUsuari.php?idUsuari=" + this.idUsuari, //el script reotrna un array amb tots els contactes;
            dataType: 'json',
            cache: false,
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    usuari.temas.push(data[i]);
                }
            },
            error: function () { //si hi ha un error al connectar-se al servidor;
                Error.showError("Error al cargar els contactes del usuari");
            }
        });
    }

    /**
     * Obtenir els temas del usuari
     * @param onSuccess function;
     */
    getTemas(onSuccess) {
        usuari.temas = [];
        $.ajax({
            type: "POST",
            url: urlServer + "/get/getTemasUsuari.php?idUsuari=" + this.idUsuari, //el script reotrna un array amb tots els contactes;
            dataType: 'json',
            cache: false,
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    usuari.temas.push(data[i]);
                }
                onSuccess();
            },
            error: function () { //si hi ha un error al connectar-se al servidor;
                Error.showError("Error al cargar els contactes del usuari");
            }
        });
    }

    /**
     * actualitzar Likes del usuari;
     * @param ul els resultats es mostres en una llista, indicar-la;
     */
    actualitzarLikes(ul) {
        $('#' + ul).find('li').remove();
        if (usuari.temas.length != 0) {
            for (var i = 0; i < usuari.temas.length; i++) {
                $('#' + ul).append("<li><button class='buttonNoStyle removeLike'><span class='glyphicon glyphicon-remove-circle'></span></button>" + usuari.temas[i] + "</li>");
            }
        }
        else {
            $('#' + ul).append("<li>" + __("{{stringNoTemesAfegits}}") + "</li>");
        }
    }

    /**
     * Afegir a la taula usuari_gust la id del usuari i la id del like, es a dir, afegir al usuari un nou like;
     * @param idLike id del like a agregar
     */
    afegirLike(idLike) {
        $.ajax({
            type: "POST",
            url: urlServer + "/insert/afegirTema.php?idUsuari=" + this.idUsuari + "&idGust=" + idLike,
            dataType: 'json',
            cache: false,
            success: function (data) {
                usuari.getTemas(function() {
                    usuari.actualitzarLikes('mostrarLikes');
                });    
            },
            error: function () {
                Error.showError(__("{{errorServerOut}}"));
            }
        });
    }

    /**
     * Elimar usuari d'un grup;
     * @param grupsBorrar ids dels grups que es borrarà;
     */
    eliminarseGrup(grupsBorrar) {
        $.ajax({
            type: "POST",
            url: urlServer + "/delete/deleteUsuariGrup.php?idUsuari=" + this.idUsuari + "&idGrup=" + grupsBorrar,
            dataType: 'json',
            cache: false,
            success: function (data) {
                cambiPag("index.html");
            },
            error: function (xhr, status, error) {
                Error.showError(error);
            }
        });
    }

    /**
     * Obtenir un nom per la id del usuari;
     * @param idUsuari;
     * @param onSucces
     */
    static getNomById(idUsuari, onSuccess) {
        $.ajax({
            type: "POST",
            url: urlServer + "/get/getNomById.php?idUsuari=" + idUsuari,
            dataType: 'json',
            cache: false,
            success: function (data) {
                onSucces(data);
            },
            error: function (xhr, status, error) {
                Error.showError(error);
            }
        });
    }

    /**
     * Obtenir la id d'un usuari per el seu nom;
     * @param nomUsuari;
     * @param onSucces;
     */
    static getIdByNom(nomUsuari, onSucces) {
         $.ajax({
            type: "POST",
            url: urlServer + "/get/getIdContactByNom.php?nom=" + nomUsuari,
            dataType: 'json',
            cache: false,
            success: function (data) {
                onSucces(data.idUsuari);
            },
            error: function (xhr, status, error) {
                Error.showError(error);
            }
        });
    }

    /**
     * Actualitzar a la BD el ultim acces a un grup;
     * @param idGrup
     */
    actualitzarUltimAcces(idGrup) {
        $.ajax({
            type: "POST",
            url: urlServer + "/update/updateUltimAcces.php?idUsuari=" + this.idUsuari + "&idGrup=" + idGrup,
            dataType: 'json',
            cache: false,
            success: function (data) {
                console.log('ultim acces actualitzar');
            },
            error: function (xhr, status, error) {
                Error.showError(error);
            }
        });
    }

    /**
     * Actualitzar a la bd la foto de perfil del usuari;
     */
    actualitzarFotoPerfil(nomFoto) {
        var ruta = "/imgServer/fotosPerfil/" + nomFoto + "_" + this.idUsuari + ".jpg";
        $.ajax({
            type: "POST",
            url: urlServer + "/update/updateFotoUsuari.php?idUsuari=" + this.idUsuari + "&ruta=" + ruta,
            dataType: 'json',
            cache: false,
            success: function (data) {
                console.log('foto actualitzada');
            },
            error: function (xhr, status, error) {
                Error.showError(error);
            }
        });
    }

    /**
     * Obtenir de la bd la foto de perfil del usuari;
     */
    getFotoPerfil(onSucces) {
        $.ajax({
            type: "POST",
            url: urlServer + "/get/getFotoUsuari.php?idUsuari=" + this.idUsuari,
            dataType: 'json',
            cache: false,
            success: function (data) {
                onSucces(data);
            },
            error: function (xhr, status, error) {
                Error.showError(error);
            }
        });
    }

    /**
     * Obtenir les ultimes publicacions de cada grup
     * i afegirles a la tab resum;
     */
    mostrarUltimesPublicacions() {
        /*$.ajax({
            type: "POST",
            url: urlServer + "/funcions/.php?idUsuari=" + this.idUsuari,
            dataType: 'json',
            cache: false,
            success: function (data) {
                
            },
            error: function (xhr, status, error) {
                Error.showError(error);
            }
        });*/
    }

    /**
     * Obtenir quins usuaris volen agregar-te; la functio php retorna les id + nom dels usuaris
     */
    getSolicitutsContacte(onSucces) {
        $.ajax({
            type: "POST",
            url: urlServer + "/get/getSolicitutsContacte.php?idUsuari=" + this.idUsuari,
            dataType: 'json',
            cache: false,
            success: function (data) {
                onSucces(data);
            },
            error: function (xhr, status, error) {
                Error.showError(error);
            }
        });
    }

    /**
     * Acceptar un contacte
     * @param idContacte
     * @param onSucces
     */
    acceptarContacte(idContacte, onSucces) {
         $.ajax({
            type: "POST",
            url: urlServer + "/update/acceptarContacte.php?idUsuari=" + this.idUsuari + "&idContacte=" + idContacte,
            dataType: 'json',
            cache: false,
            success: function (data) {
                if (data == 1) {
                    onSucces();
                }
            },
            error: function (xhr, status, error) {
                Error.showError(error);
            }
        });
    }

    /**
     * Declinar un contacte, es a dir, de la taula usuari_contacte borrar el registre;
     * @param idContacte
     * @param onSucces
     */
    declinarContacte(idContacte, onSucces) {
        $.ajax({
            type: "POST",
            url: urlServer + "/delete/declinarContacte.php?idUsuari=" + this.idUsuari + "&idContacte=" + idContacte,
            dataType: 'json',
            cache: false,
            success: function (data) {
                if (data == 1) {
                    onSucces();
                }
            },
            error: function (xhr, status, error) {
                Error.showError(error);
            }
        });
    }

    /**
     * Afegirse a un grup;
     * @param idsGrup;
     * @param onSuccess;
     */
    afegirseGrup(idsGrups, onSucces) {
        $.ajax({
            type: "POST",
            url: urlServer + "/insert/afegirUsuariGrup.php?idUsuari=" + this.idUsuari + "&idsGrups=" + idsGrups,
            dataType: 'json',
            cache: false,
            success: function (data) {
                if (data == 1) {
                    onSucces();
                }
                else {
                    alert("Error");
                }
            },
            error: function (xhr, status, error) {
                Error.showError(error);
            }
        });
    }

    /**
     * Comprovar si l'usuari es admin d'un grup;
     * @param idGrup
     */
    isAdmin(idGrup, onSucces) {
        $.ajax({
            type: "POST",
            url: urlServer + "/get/usuariIsAdmin.php?idUsuari=" + this.idUsuari + "&idGrup=" + idGrup,
            dataType: 'json',
            cache: false,
            success: function (data) {
                onSucces(data);
            },
            error: function (xhr, status, error) {
                Error.showError(error);
            }
        });
    }

    /**
     * Obtenir tots els grups dels temes que te selecionat el usuari; es fa servir en el buscador;
     * @param onSucces
     */
    getGrupsTema(onSucces) {
        $.ajax({
            type: "POST",
            url: urlServer + "/get/getGrupsByTemasUsuari.php?idUsuari=" + this.idUsuari,
            dataType: 'json',
            cache: false,
            success: function (data) {
                onSucces(data);
            },
            error: function (xhr, status, error) {
                Error.showError(error);
            }
        });
    }
}