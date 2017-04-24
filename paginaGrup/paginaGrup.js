require(['Clases/Grup' , 'Clases/Publicacio', 'Clases/PublicacioEvent', 'Clases/Comentari' , 'Clases/Camera', 'Clases/Error'], function () {
    
    var $_GET = Utils.getVariablesHtml();
    var idGrup = $_GET['idGrup'];
    var publicacions = [];
    var isAdmin; //si el usuari es admin;
    var membresGrup; //noms dels membres del grupp;

    //Cargar les opcions del admin si ho és;
    usuari.isAdmin(idGrup, function(a) {
        isAdmin = a;
        if (isAdmin) {
            $('.opcioAdmin').show();
        }
    });

    //obtenir les publicacions del grup; al obtenir-les executar mostrarPagina;
    Grup.getDadesGrup(idGrup, publicacions, mostrarPagina); //obtenir les publicacions del grup i altres i omplir el array publicacions;
    getMembres(idGrup);
    updateFotoGrup(idGrup);
    usuari.actualitzarUltimAcces(idGrup); //set ultim access al grup del usuari;
    
    /**
     * Quan s'han cargat les publicacions, exevutar aquesta funcio;
     */
    function mostrarPagina() {
        //Afegir les publicacions en pantalla
        for (var i = 0; i < publicacions.length && i < 5; i++) {
            var p = publicacions[i];
            if (p.tipus != 2) {
                $('.publicacions').append(p.publicacioToHtml());            
            }
            else { //la publicacio es un event;
                var event = new PublicacioEvent(p.id, p.publicador, p.dataPublicacio, p.tipus, p.numComentaris, p.imgPublicador, p.numPersones, p.dateStart, p.dateEnd, p.nomEvent, p.descripcioEvent, p.numPersonesDec);
                $('.publicacions').append(event.toHtml());
            }
            $('div [data-id="'+ p.id + '"]').fadeIn();
        }
        if (publicacions.length >= 5) { //afegir boto mostrar mes publicacions;
            $('.publicacions .publicacio').last().css('margin-bottom', '0px');
            $('body').append(Grup.buttonMesToHtml());
        }        
    

        $('#buttonPublicarFoto').popover({ //popover per seleccionar/fer fotos;
            container: 'body',
            placement: 'top',
            trigger: 'manual',
            html: true,
            content: '<div style="float: left; margin: 5px 5px 15px 5px;">' +
            '<button type="button" class="btn btn-danger" id="photoFromCamera">' +
                '<span class="glyphicon glyphicon-camera" aria-hidden="true"></span>' +
            '</button>' +
            '</div>' +
            '<div style="float: right; margin: 5px 5px 15px 5px">' +
            '<button type="button" class="btn btn-danger" id="photoFromLibrary">' +
                '<span class="glyphicon glyphicon-picture" aria-hidden="true"></span>' +
            '</button>' +
            '</div>'
        });
        $('#startDate').datetimepicker({ //datepickers del events
            language: 'es',
            inline: true,
            todayBtn: 1,
            weekStart: 1,
            todayHighlight: 1,
            format: 'yyyy-mm-dd hh:ii',
        });
        $('#endDate').datetimepicker({
            language: 'es',
            inline: true,
            weekStart: 1,
            todayHighlight: 1,
            format: 'yyyy-mm-dd hh:ii',
        });
        
        //event amb localitzacio;
        $(document).on('click', '#iconoCheck', function() {
            if ($(this).is(':checked')) {
                $('#divIconos').fadeIn();
            }
            else {
                $('#divIconos').hide();
                $('#inputLocEvent').val('');
            }
        });

       //para crear el evento
        $('#submitEvento').click(function() {
            //date format: YYYY-MM-dd HH:mm
            var dataInicial = Utils.transfromDate($("#startDate").datetimepicker('getDate'));              
            var dataFinal =  Utils.transfromDate($("#endDate").datetimepicker('getDate'));

            var nombre = $("#inputNombre").val();
            var descripcio = $("#inputDescripcion").val();
            var idUsuari = usuari.idUsuari;
            var lat = $("#lat").val();
            var long = $("#long").val();
            var ico = $('input[name=radioIcono]:checked', '#form').val();
            if (long == '') long = 0;
            if (lat == '') lat = 0;
            if (ico == 'undefined') ico = '0';
            var url = urlServer + '/insert/afegirEvent.php?nombre=' + nombre + '&descripcion=' + descripcio ; 
                url += '&startDate='+ dataInicial + '&endDate=' + dataFinal + '&idUsuari=' + idUsuari + '&idGrup=' + idGrup
                url += '&lat=' + lat + '&long=' + long + "&icono="+ ico;
            if (nombre != '' && descripcio != '') {
                $('#modalEvento').modal('hide');
                $.ajax ({
                    type: "POST",
                    url: url,
                    dataType: 'json',
                    cache: false,
                    success: function(data)
                    {
                        $("#inputNombre").val("");
                        $("#inputDescripcion").val("");
                        $("#eventCreat").show();
                        setTimeout(function() {
                            $('#eventCreat').fadeOut('slow');
                        }, 5000);
                        Grup.getUtimEvent(idGrup, function(p) {
                           var event = new PublicacioEvent(p.id, p.publicador, p.dataPublicacio, p.tipus, 0, p.imgPublicador, 0, p.dateStart, p.dateEnd, p.nomEvent, p.descripcioEvent, 0);
                           $('.publicacions').prepend(event.toHtml());
                       });
                    },
                    error: function(xhr, status, error) { //si hi ha un error al connectar-se al servidor;
                        
                    }
                });
            } 
        });           

        $(document).ready(function () {

            //id, publicador, dataPublicacio, publicacio, tipus, numComentaris, imgPublicador
           setInterval(function() { //obtenir la ultima publicació ;
               var lastId = $('.publicacions').find('.publicacio').first().data('id');
                Grup.getUltimaPublicacio(idGrup, function(publicacio) { 
                    if (lastId != publicacio.id) {
                        var a = new Publicacio(publicacio.id, publicacio.publicador, publicacio.dataPublicacio, publicacio.publicacio, publicacio.tipus, 0, publicacio.imgPublicador);
                        $('.publicacions').prepend(a.publicacioToHtml());
                    }
                });
            }, 5000 * 1);


            $('#btnBackToIndex').click(function () {
                cambiPag('index.html');
            });

            $(document).on('click', '.fotoPublicadorImg', function() {
                var imgSrc = $(this).attr('src');
                $('#modalImgSrc').attr('src', imgSrc);
                $('#modalImg').modal('show');
            });

            $('.buttonMesPublicacions').click(function() {
                $(this).remove();
                for (var i = 5; i < publicacions.length && i < 10; i++) {
                    var p = publicacions[i];
                    $('.publicacions').append(p.publicacioToHtml());
                    if (i == publicacions.length - 1)  {
                       $('div .publicacio').find('[data-id="' + p.id + '"]').css('margin-bottom', '80px');
                    }
                }
            }); 

            $('#buttonPublicar').click(function () {
                var publicacio = $('#inputPublicar').val();
                if (publicacio != "") {
                   Publicacio.afegirPublicacio(idGrup, usuari.idUsuari, publicacio, 0, function() {
                       $('#inputPublicar').val('');
                       Grup.getUltimaPublicacio(idGrup, function(publicacio) {
                           var p = new Publicacio(publicacio.id, publicacio.publicador, publicacio.dataPublicacio, publicacio.publicacio, publicacio.tipus, 0, publicacio.imgPublicador)
                           $('.publicacions').prepend(p.publicacioToHtml());
                       });
                   });
                }
            });

            $(document).on('click', '.buttonComentar', function() {
                var idPublicacio = $(this).parent().parent().parent().parent().data('id');
                var text = $(this).parent().parent().find('.inputPublicarComentari').val();
                Publicacio.afegirComentari(idPublicacio, usuari.idUsuari, text);
                $(this).parent().parent().find('.inputPublicarComentari').val('');
            });

            $('#buttonPublicarFoto').click(function() {
                $(this).popover('toggle');
            });

            //Publicar una foto;
            $(document).on('click', "#photoFromLibrary", function() {
                getPhoto(pictureSource.PHOTOLIBRARY ,function(imageUri) {
                    uploadPhoto(imageUri, function(nomFoto) {
                        Publicacio.afegirPublicacio(idGrup, usuari.idUsuari, "/imgServer/" + nomFoto, 1);
                    });
                });
            });

            $(document).on('click', '#photoFromCamera', function() {
                capturePhoto(function(imageUri) {
                    uploadPhoto(imageUri, function(nomFoto) {
                        Publicacio.afegirPublicacio(idGrup, usuari.idUsuari, "/imgServer/" + nomFoto, 1);
                    })
                })
            });


            $(document).on('focus','.inputPublicarComentari', function() {
                $('.bottomBar').hide();
            });
            
            //Ocultar el input de les publicacions al apretar un de comentar;
            $(document).click(function() {
                if (!$('.bottomBar').is(':visible') && !$('.inputPublicarComentari').is(':focus')) {
                    $('.bottomBar').fadeIn();
                }
            });

            //Bloq. si la publicacio te més de 300 chars.
            $('.inputPublicarComentari').on('keyup', function(e) {
                if ($(this).val().length >= 300) {
                    //no mes caracters
                }
                else if ($(this).hasClass() && $(this).val().length < 300) {
                    //treure lo de no mes caracters;
                }
            })

            //Mostrar els comentaris d'una publicacio;
            $(document).on('click', '.buttonMostrarComentaris',function() {
                var x = $(this).parent().parent().find('.comentarisPublicacio');
                var idPublicacio = $(this).parent().parent().data('id');
                $(this).parent().parent().toggleClass('withBorderBottom');
                if ($(x).is(':visible')) {
                    $(x).hide();
                    $('body').find('[data-id="' + idPublicacio + '"]').find('.comentariPublicacio').remove();
                }
                else {
                    $(x).fadeIn();
                    Publicacio.obtenirComentaris(idPublicacio, function(comentaris) {
                        var p = $(this).parent().parent().find('.comentarisPublicacio');
                        for (var i = 0; i < comentaris.length && i < 5; i++) { //es mostren els 5 ultims comentaris;
                            var c = new Comentari(comentaris[i].idUsuari, comentaris[i].comentari, comentaris[i].dataComentari);
                            var html = c.toHtml();
                            $('body').find('[data-id="' + idPublicacio + '"]').find('.comentarisPublicacio').append(html);
                        }
                        if (comentaris.length >= 5) {
                            $('body').find('[data-id="' + idPublicacio + '"]').find('.comentarisPublicacio').append(Comentari.buttonMesToHtml());
                        }
                    });
                }
            });
            //Mostrar mes comentaris d'una publicacio (més de 5);
            $(document).on('click', '.buttonMesComentaris', function() {
                $(this).hide();
                var idPublicacio = $(this).parent().parent().parent().data('id');
                Publicacio.obtenirComentaris(idPublicacio, function(comentaris) {
                    var p = $(this).parent();
                    for (var i = 5; i < comentaris.length; i++) { //es mostren tots els altres comentaris;
                        var c = new Comentari(comentaris[i].idUsuari, comentaris[i].comentari, comentaris[i].dataComentari);
                        var html = c.toHtml();
                        $('body').find('[data-id="' + idPublicacio + '"]').find('.comentarisPublicacio').append(html);
                    }
                });
            });

            //Acceptar anar a un event;
            $(document).on('click', '.buttonAcceptarEvent', function() {
                var idPublicacio = $(this).parent().parent().data('id');
                var x = $(this);
                PublicacioEvent.acceptarEvent(usuari.idUsuari, idPublicacio, 1,  function(data) {
                    location.reload();
                });
            });
            //Declinar anar a un event
            $(document).on('click', '.buttonDeclinarEvent', function() {
                var idPublicacio = $(this).parent().parent().data('id');
                PublicacioEvent.acceptarEvent(usuari.idUsuari, idPublicacio, 0, function(data) {
                    location.reload();
                });
            });

            $('#buttonBackToGrup').click(function() {
                $('#infoGrup').hide();
                $('#grup').fadeIn();
                $('.buttonMesPublicacions').show();
            });

            //Opcions disponibles d'intre un grup;;
            $('.buttonMenuOpcions').click(function() {
                var opcio = $(this).data('id');
                $('.buttonMesPublicacions').hide();
                switch (opcio) {
                    case 1: //info del grup;
                        $('#grup').hide();
                        $('#infoGrup').fadeIn();
                        break;
                }
            });
            //Mostrar la pantalla per afegir usuaris al grup si ets admin;
            $('#buttonAddUsuariGrup').click(function() { 
                $('#infoGrup').hide();
                $('.contactesUsuari').find('div').remove(); //no funciona, s'ha de borrar els divs;
                $('.contactesGrup').find('div').remove();
                usuari.getContactes(function() { //actualitzar llista de contactes del usuari;
                    for (var i = 0; i < usuari.contactes.length; i++) {
                        if (!Utils.inArray(membresGrup, usuari.contactes[i])) { //perque no es vegin els usuaris que ja estan al grup;
                            $('.contactesUsuari').append("<div class='contacteUsuari'>" + usuari.contactes[i] + "</div>");
                        }
                    }
                    $('#listContactesAfegir').fadeIn();
                });   
            });

            //Afegir nous usuaris al grup (només si ets admin);
            var nousUsuaris = [];
            $(document).on('click', '.contacteUsuari', function() {
                var nom = $(this).text();
                Utils.getIdByNom(nom, function(id) {
                if (!Utils.inArray(nousUsuaris, id)) {
                    nousUsuaris.push(id);
                    $('.contactesGrup').append("<div><button class='buttonNoStyle removeContacte'><span class='glyphicon glyphicon-remove-circle'></span></button>" + nom + "</div>")
                    }
                })
            });
            $(document).on('click', '.removeContacte', function() {
                Utils.deleteFromArray(nousUsuaris, $(this).parent().text());
                $(this).parent().remove();
            });

            $('#buttonAfegirContactes').click(function() { //afegir un usuari al grup si ets admin
                Grup.afegirUsuarisGrup(usuari.idUsuari, nousUsuaris, idGrup, function(data) {
                    getMembres(idGrup);
                    $('#btnBackToGrup').trigger('click');
                })
            });

            $(document).on('click', '.eliminarUsuariGrup', function() { //eliminar un usuari del grup si ets admin;
                var ids = $(this).parent().parent().data('id');
                Grup.eliminarContacteGrup(ids, idGrup, function() {
                    getMembres(idGrup);
                });
            });

            $('#btnBackToGrup').click(function() {
                nousUsuaris = [];
                $('#listContactesAfegir').hide();
                $('#grup').fadeIn();
            });

            //Borrar el grup;
            $('#buttonBorrarGrup').click(function() {
                Grup.borrarGrup(idGrup, function() {
                    cambiPag('index.html');
                });
            });

            //Sortir del grup
            $('#buttonSortirGrup').click(function() {
                usuari.eliminarseGrup(idGrup);
            });

            //Cambiar foto
            $('#buttonChangeFotoGrup').click(function() {
                getPhoto(pictureSource.PHOTOLIBRARY ,function(imageUri) {
                   uploadPhotoGrup(imageUri, idGrup, function(nomFoto) {
                        Grup.setFotoGrup(idGrup, nomFoto, function() {
                            updateFotoGrup(idGrup);
                        });
                   });
                });
            });
        });
    }


function getMembres() {
    //obtenir els membres del grup;
    Grup.getMembresGrup(idGrup, function(membres) {
        membresGrup = [];
         $('#participantsGrupDiv').find('ul').empty();
         for (var i = 0; i < membres.length; i++) {
             var str;
             if (membres[i].admin == 1) {
                str = '<li style="border-bottom: 1px solid rgba(0,0,0,0.125);" data-id="' + membres[i].idUsuari + '">' +
                        '<img src="' + urlServer + membres[i].fotoUsuari + '" class="img-circle fotoPublicadorImg" width="50px" height="50px" style="margin-right: 10px">' +
                            membres[i].nomUsuari +
                        '<p style="float: right; z-index: 1; font-size: 14px; border: 1px solid; color: #D51C1C; padding: 5px; margin-top: 10px; border-radius: 5px">Admin</p>'
                        '</li>';
             }
             else {
                if (isAdmin) {
                    str = '<li style="border-bottom: 1px solid rgba(0,0,0,0.125);" data-id="' + membres[i].idUsuari + '">' +
                                '<img src="' + urlServer + membres[i].fotoUsuari + '" class="img-circle fotoPublicadorImg" width="50px" height="50px" style="margin-right: 10px">' +
                                membres[i].nomUsuari +
                                '<p style="float: right; color: black; margin-right: 15px; margin-top: 10px;"> <button type="button" class="buttonNoStyle eliminarUsuariGrup" aria-label="Left Align"> <span class="glyphicon glyphicon-remove-circle" aria-hidden="true"></span></button></p>'
                            '</li>';
                }
                else {
                    str = '<li style="border-bottom: 1px solid rgba(0,0,0,0.125);" data-id="' + membres[i].idUsuari + '">' +
                        '<img src="' + urlServer + membres[i].fotoUsuari + '" class="img-circle fotoPublicadorImg" width="50px" height="50px" style="margin-right: 10px">' +
                        membres[i].nomUsuari +
                        '</li>';
                }
             }
             membresGrup.push(membres[i].nomUsuari);
             $('#participantsGrupDiv').find('ul').append(str);
        }
    });
}


/**
 * Cambiar el src de la imatge del grup per la que hi ha a la bd;
 */
function updateFotoGrup(idGrup) {
    Grup.getRutaFoto(idGrup, function(ruta) {
        if (ruta != 0) {
            $('#imgGrup').attr('src', urlServer + ruta);    
        }
    })
}

})


