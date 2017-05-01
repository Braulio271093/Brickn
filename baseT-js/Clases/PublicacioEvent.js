class PublicacioEvent {
    constructor(id, publicador, dataPublicacio, tipus, numComentaris, imgPublicador, numPersones, dateStart, dateEnd, nomEvent, descripcioEvent, numPersonesDec) {
        this.id             = id;
        this.publicador     = publicador;
        this.dataPublicacio = dataPublicacio;
        this.tipus          = tipus;
        this.numComentaris  = numComentaris;
        this.imgPublicador  = imgPublicador;
        this.numPersones    = numPersones;
        this.dateStart      = dateStart;
        this.dateEnd        = dateEnd;
        this.nomEvent       = nomEvent;
        this.descripcioEvent= descripcioEvent;
        this.numPersonesDec = numPersonesDec;
    }

    toHtml() {
        var body = this.publicacio;
        let str = ''; 
        
        body = "<div><strong>Evento: </strong><br>-" + this.nomEvent;
        body += "<p style='margin-left: 80px; margin-bottom: 0px;'>-de: " + Publicacio.dateEvent(this.dateStart) + " hasta: " + Publicacio.dateEvent(this.dateEnd) + "</p>";
        body += "<p style='rgba(0,0,0,0.5); margin-left: 80px; margin-top: 0px;'>-" + this.descripcioEvent + "</p>";
        body += "</div>";

        str += "<div class='publicacio event animated swing' data-id='" + this.id + "'>";
        str +=   "<div class='fotoPublicador' style='float: left'><img class='img-circle fotoPublicadorImg' src='" + urlServer + this.imgPublicador + "'></div>";
        str +=   "<div class='titolPublicacio'>";
        str +=       "<p>" + this.publicador + "</p>"; 
        str +=       "<p>" + Publicacio.convertirData(this.dataPublicacio) + "</p>"; 
        str +=   "</div>"; 
        str +=   "<div class='bodyPublicacio'>";
        str +=       body;
        str +=   "</div>";
        str +=   "<div style='margin-top: 25px; padding-left: 15px;'>";
        str +=      "<button class='buttonNoStyle buttonMostrarComentaris' style='font-size: 20px;'>";
        str +=          "<span class='glyphicon glyphicon-comment' aria-hidden='true'></span>";
        if (this.numComentaris > 0) str +='<span class="badge" style="z-index: 1; position: relative; bottom: 15px; left: -10px; background-color: #D51C1C;">' + this.numComentaris + '</span>';
        str +=      "</button>";
        str +=      "<button class='buttonNoStyle buttonAcceptarEvent' style='font-size: 20px;'>";
        str +=          "<span class='glyphicon glyphicon-hand-up' aria-hidden='true'></span>";
        str +=          '<span class="badge spanNumPersonesAcceptat" style="z-index: 1; position: relative; bottom: 15px; left: -7px; background-color: #D51C1C;" >' + this.numPersones + '</span>';
        str +=      "</button>";
        str +=      "<button class='buttonNoStyle buttonDeclinarEvent' style='font-size: 20px;'>";
        str +=          "<span class='glyphicon glyphicon-hand-down' aria-hidden='true'></span>";
        str +=          '<span class="badge spanNumPersonesDeclinat" style="z-index: 1; position: relative; bottom: 15px; left: -7px; background-color: #D51C1C;">' + this.numPersonesDec + '</span>';
        str +=      "</button>";
        str +=   "</div>";
        str +=   "<div class='comentarisPublicacio' style='display: none;'>";
        str +=       "<div class='input-group inputComentar' style='margin-top: 5px; margin-bottom: 5px'>";
        str +=          "<input type='text' class='form-control inputPublicarComentari' placeholder='....'>";
        str +=              "<span class='input-group-btn'>";
        str +=                  "<button class='btn btn-danger buttonComentar' type='button'>" + __('stringComentar') + "</button>";
        str +=                "</span>";
        str +=            "</div>";
        str +=        "</div>"; 
        str +=    "</div>";
        return str;
    }

    static acceptarEvent(idUsuari, idEvent, acceptat,  onSuccess) {
        if (acceptat == true) acceptat = 1;
        if (acceptat == false) acceptat = 0;
        $.ajax({
            type: "POST",
            url: urlServer + "/insert/afegirUsuariEvent.php?idUsuari=" + idUsuari + "&idEvent=" + idEvent + "&acceptat=" + acceptat,
            dataType: 'json',
            cache: false,
            success: function (data) {
                onSuccess(data);
            },
            error: function (xhr, status, error) {

            }
        });
    }
    static toText(data) {
        var t = "<div style='font-size: 14px'>";
            t += "<p><strong>" + __("{{stringDadesDelEvent}}") + "</strong></p>";
            t += "<p>" + __("{{stringNom}}") + ": " + data.nomEvent + "</p>";
            t += "<p>" + __("{{stringPublicatPer}}") + ": " + data.publicador + "</p>";
            t += "<p>" + __("{{stringDesde}}") + ": " + data.dateStart +  " " + __("{{stringFins}}") + ": " + data.dateEnd + "</p>";
            t += "</div>";
        return t;
    }
}