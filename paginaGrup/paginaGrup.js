require(['Clases/Grup' , 'Clases/Publicacio', 'Clases/Comentari' , 'Clases/Camera'], function () {
    
    var $_GET = Utils.getVariablesHtml();
    var idGrup = $_GET['idGrup'];
    var publicacions = [];

    usuari.actualitzarUltimAcces(idGrup);

    
    Grup.getDadesGrup(idGrup, publicacions, mostrarPagina); //obtenir les publicacions del grup i altres;

    /**
     * Quan s'han cargat les publicacions, exevutar aquesta funcio;
     */
    function mostrarPagina() {

        //Afegir les publicacions en pantalla
        for (var i = 0; i < publicacions.length && i < 5; i++) {
            var p = publicacions[i];
            $('.publicacions').append(p.publicacioToHtml());
        }
        if (publicacions.length >= 5) {
            var p = publicacions[4];
            $('div').find('[data-id="' + p.id + '"]').css('margin-bottom', '0px');
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

        $(document).ready(function () {
            $('#btnBackToIndex').click(function () {
                cambiPag('index.html');
            });

            /*
            $('.publicacio').each(function() { //cargar imatge del publicador, s'ha de millorar el codi; fer que no fagi tantes conexions;
                var id = $(this).attr('id');
                var publicador = $(this).find('.titolPublicacio').find('p:first').text();
                Publicacio.cargarImatgesPublicador(id, publicador);
            });*/

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
            
            $(document).click(function() {
                if (!$('.bottomBar').is(':visible') && !$('.inputPublicarComentari').is(':focus')) {
                    $('.bottomBar').fadeIn();
                }
            });

            $('.inputPublicarComentari').on('keyup', function(e) {
                if ($(this).val().length >= 300) {
                    //no mes caracters
                }
                else if ($(this).hasClass() && $(this).val().length < 300) {
                    //treure lo de no mes caracters;
                }
            })


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
        });
    }
})