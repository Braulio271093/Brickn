class Event {
    constructor(id, publicador, dataPublicacio, publicacio, tipus, numComentaris, imgPublicador, numPersones, dateStart, dateEnd, nomEvent, descripcioEvent) {
        this.id             = id;
        this.publicador     = publicador;
        this.dataPublicacio = dataPublicacio;
        this.publicacio     = publicacio;
        this.tipus          = tipus;
        this.numComentaris  = numComentaris;
        this.imgPublicador  = imgPublicador;
        this.numPersones    = numPersones;
        this.dateStart      = dateStart;
        this.dateEnd        = dateEnd;
        this.nomEvent       = nomEvent;
        this.descripcioEvent= descripcioEvent;
    }

    toHtml() {
        var body = this.publicacio;
        let str = ''; 
        
        body = "<div><strong>Evento: </strong><br>-" + this.nomEvent;
        body += "<p style='margin-left: 80px; margin-bottom: 0px;'>-de: " + Publicacio.dateEvent(this.dateStart) + " hasta: " + Publicacio.dateEvent(this.dateEnd) + "</p>";
        body += "<p style='rgba(0,0,0,0.5); margin-left: 80px; margin-top: 0px;'>-" + this.descripcioEvent + "</p>";
        body += "</div>";

        str += "<div class='publicacio' data-id='" + this.id + "'>";
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
        if (this.numPersones > 0) str +='<span class="badge" style="z-index: 1; position: relative; bottom: 15px; left: -10px; background-color: #D51C1C;">' + this.numComentaris + '</span>';
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
}