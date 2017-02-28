class Comentari {
    constructor (nomUsuari, text, data) {
        this.nomUsuari = nomUsuari;
        this.text = text;
        this.data = data;
    }

    toHtml() {
        return "<div class='comentariPublicacio'>" +
                        "<div>" +
                            this.nomUsuari + ": " +
                        "</div>" +
                        "<div>" +
                            this.text +
                        "</div>" +
                    "</div>";
    }

    /**
     * El boto que es veu per mostrar mes comentaris;
     */
    static buttonMesToHtml() {
        return "<div class='buttonMesComentarisDiv'>" +
            '<button type="button" class="buttonNoStyle buttonMesComentaris" aria-label="Left Align">' +
                '<span class="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span>' +
            '</button></div>'
    }
}