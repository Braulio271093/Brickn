class Utils {

    /**
     * Provar si es pot connectar al servidor
     * @return true/false
     */
    static tryConexio() {
        var conexio;
        $('#modalLoading').modal('show');
        $.ajax({
                type: "POST",
                url: urlServer + "/funcions/testConexio.php",
                dataType: 'json',
                cache: false,
                async: false, /* -- */
                success: function (data) {
                    conexio = true;
                },
                error: function (er) {
                    conexio = false;
                }
            });
       
        return conexio;
    }


    /**
     * NO ES FA SERVIR (substituida per el require);
     * Funció que fa de include ja que javascript no té
     * @param file ruta del document;
     */
    static include(file) {
        var script = document.createElement('script');
        script.src = file;
        script.type = 'text/javascript';
        script.defer = true;

        var x = document.getElementById('pageScript');
        document.body.insertBefore(script, x);
    }


    /**
     * Obtenir en un array associatiu els parametres passats per html
     * @return array amb els parametres
     */
    static getVariablesHtml () {
        var $_GET = {};
        var args = location.search.substr(1).split(/&/); //url de on estas;
        for (var i = 0; i < args.length; ++i) {
            var tmp = args[i].split(/=/);
            if (tmp[0] != "") {
                $_GET[decodeURIComponent(tmp[0])] = decodeURIComponent(tmp.slice(1).join("").replace("+", " "));
            }
        }
        return $_GET;
    }
    /**
     * Borrar un element d'un array;
     * @param array
     * @param element a buscar;
     */
    static deleteFromArray(array, aux) {
        var index = array.indexOf(aux);
        array.splice(index, 1);
        return array;
    }

    /**
     * Buscar si un element esta en el array;
     * @param array
     * @param aux element a buscar
     * @return true/false
     */
    static inArray(array , aux) {
        var i = 0;
        var t = false;
        while (t == false && i < array.length) {
            if (array[i] == aux) {
                t = true;
            }
            i++;
        }
        return t;
    }

    /**
     * Obtenir la id d'un usuari per el nom;
     */
    static getIdByNom(nom, onSuccess) {
        $.ajax({
            type: "POST",
            url: urlServer + "/get/getIdContactByNom.php?nom=" + nom, //primer obtenir la id de l'usuari amb el nom;
            dataType: 'json',
            cache: false,
            success: function (data) {
                onSuccess(data.idUsuari);
            },
            error: function () {
                Error.showError(__("errorServerOut"));
            }
        });
    }

    static getIdByNomTema(nom, onSuccess) {
        $.ajax({
            type: "POST",
            url: urlServer + "/get/getIdTemaByNom.php?nom=" + nom, //primer obtenir la id de l'usuari amb el nom;
            dataType: 'json',
            cache: false,
            success: function (data) {
                onSuccess(data.idGust);
            },
            error: function () {
                Error.showError(__("errorServerOut"));
            }
        });
    }

    /**
     * Retornar amb html la li d'una solcitut
     */
    static solicitutContacteToHtml(idUsuari, nomUsuari) {
        return "<li data-id='" + idUsuari + "'>" +
                    '<div style="float: left; font-size: 20px;">' + nomUsuari + '</div>'+
                    '<button style="float: right; margin-left: 10px; font-size: 10px;" class="btn btn-danger buttonDeclineContacte">'+
                        '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>'+
                    '</button>'+
                    '<button style="float: right; margin-left: 10px; font-size: 10px;" class="btn btn-danger buttonAcceptarContacte">'+
                        '<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>'+
                    '</button>'+
               ' </li>'
    }

    /**
     * Opcions d'un administrador dintre un grup;
     */
    static opcionsAdmin() {
        var opcions = [
            ''
        ]
        return opcions;
    }

    static transfromDate(startDate) {
        var day  = startDate.getDate();
        var month = startDate.getMonth() + 1;             
        var year =  startDate.getFullYear();
        var hour = startDate.getHours();
        var min = startDate.getMinutes();
        var dataInicial =   year +"-"+ 
                                month +"-"+
                                day +" "+
                                hour +":"+
                                min; 
        return dataInicial;    
    }
}