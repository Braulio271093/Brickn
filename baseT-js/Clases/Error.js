class Error {
    /**
     * Mostrar misatge d'error
     */
    static showError(msg) {
        if (msg == "" || msg == null) {
            msg = "Error.";
        }
        console.log(msg);
    }
    static showErrorType(type) {
        var msg;
        switch (type) {
            case "conectar":
                msg = "No es pot conectar al servidor.";
                break;
            default:
                msg = "Error";
                break;
        }
        console.log(msg);
    }
}