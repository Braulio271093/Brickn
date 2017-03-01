require(['Clases/Grup' , 'Clases/Publicacio', 'Clases/Comentari' , 'Clases/Camera'], function () {
    
    var $_GET = Utils.getVariablesHtml();
    var idGrup = $_GET['idGrup'];
    var publicacions = [];

    usuari.actualitzarUltimAcces(idGrup); //set ultim access al grup del usuari;

    //Cargar les opcions del admin si ho és;
    usuari.isAdmin(idGrup, function(isAdmin) {
        if (isAdmin) {
            $('.opcioAdmin').show();
        }
    });

    //obtenir les publicacions del grup; al obtenir-les executar mostrarPagina;
    Grup.getDadesGrup(idGrup, publicacions, mostrarPagina); //obtenir les publicacions del grup i altres;
    getMembres(idGrup);
    updateFotoGrup(idGrup);
    /**
     * Quan s'han cargat les publicacions, exevutar aquesta funcio;
     */
    function mostrarPagina() {
         
        //Afegir les publicacions en pantalla
        for (var i = 0; i < publicacions.length && i < 5; i++) {
            var p = publicacions[i];
            $('.publicacions').append(p.publicacioToHtml());
        }
        if (publicacions.length >= 5) { //afegir boto mostrar mes publicacions;
            $('.publicacions .publicacio').last().css('margin-bottom', '0px');
            $('body').append(Grup.buttonMesToHtml());
        }        
        $('body').fadeIn();

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
        });
        $('#endDAte').datetimepicker({
            language: 'es',
            inline: true,
            weekStart: 1,
            todayHighlight: 1,
        });
           

        $(document).ready(function () {
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
                       $('div').find('[data-id="' + p.id + '"]').css('margin-bottom', '80px');
                    }
                }
            }); 

            $('#buttonPublicar').click(function () {
                var publicacio = $('#inputPublicar').val();
                if (publicacio != "") {
                   Publicacio.afegirPublicacio(idGrup, usuari.idUsuari, publicacio, 0);
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

            //Mostrar mes comentaris (mes de 5);
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

            $('#buttonBackToGrup').click(function() {
                $('#infoGrup').hide();
                $('#grup').fadeIn();
            });

            //Opcions disponibles;
            $('.buttonMenuOpcions').click(function() {
                var opcio = $(this).data('id');
                switch (opcio) {
                    case 1: //info del grup;
                        $('#grup').hide();
                        $('#infoGrup').fadeIn();
                        break;
                }
            });
            $('#buttonAddUsuariGrup').click(function() {
                $('#infoGrup').hide();
                $('.contactesUsuari').empty();
                usuari.getContactes(function() {
                    for (var i = 0; i < usuari.contactes.length; i++) {
                        $('.contactesUsuari').append("<div class='contacteUsuari'>" + usuari.contactes[i] + "</div>");
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
            $('#buttonAfegirContactes').click(function() {
                Grup.afegirUsuarisGrup(usuari.idUsuari, nousUsuaris, idGrup, function(data) {
                    getMembres(idGrup);
                    $('#btnBackToGrup').trigger('click');
                })
            });

            $('#btnBackToGrup').click(function() {
                nousUsuaris = [];
                $('#listContactesAfegir').hide();
                $('#grup').fadeIn();
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
})


function getMembres(idGrup) {
    //obtenir els membres del grup;
    Grup.getMembresGrup(idGrup, function(membres) {
         $('#participantsGrupDiv').find('ul').empty();
         for (var i = 0; i < membres.length; i++) {
             $('#participantsGrupDiv').find('ul').append('<li>' +
                 '<img src="' + urlServer + membres[i].fotoUsuari + '" class="img-circle fotoPublicadorImg" width="50px" height="50px" style="margin-right: 10px">' +
                 membres[i].nomUsuari +
                 '</li>');
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