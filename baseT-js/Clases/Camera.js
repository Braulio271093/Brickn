/**
 * Capturar un foto i retornar-la com a FILE_URI
 */
function capturePhoto(onSuccess) {
    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        destinationType: destinationType.FILE_URI
    });
}

/**
 * Capturar un foto i permetre retocar-la;
 */
function capturePhotoEdit() {
    // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
        quality: 20,
        allowEdit: true,
        destinationType: destinationType.DATA_URL
    });
}

/**
 * Obtenir una foto de la llibreria
 */
function getPhoto(source, onSuccess) {
    // Retrieve image file location from specified source
    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        destinationType: destinationType.FILE_URI,
        sourceType: source
    });
}

/**
 * Callback dels error
 */
function onFail(message) {
    console.log('Failed because: ' + message);
}

/**
 * Pujar una foto d'una publicacio al servidor;
 */
function uploadPhoto(imageURI, onSuccess) {
    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";
    console.log(options.fileName);
    var params = new Object();
    params.value1 = "test";
    params.value2 = "param";
    options.params = params;
    options.chunkedMode = false;

    var ft = new FileTransfer();
    ft.upload(imageURI, urlServer + "/funcions/pujarFoto.php", function (result) {
            console.log(JSON.stringify(result));
            onSuccess(options.fileName);
        },
        function (error) {
            console.log(JSON.stringify(error));
        },
        options);
}

/**
 * Pujar una foto de perfil al servidor
 */
function uploadPhotoUsuari(imageURI, idUsuari, onSuccess) {
    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";
    console.log(options.fileName);
    var params = new Object();
    params.value1 = "test";
    params.value2 = "param";
    options.params = params;
    options.chunkedMode = false;

    var ft = new FileTransfer();
    ft.upload(imageURI, urlServer + "/funcions/pujarFotoUsuari.php?idUsuari=" + idUsuari, function (result) {
            console.log(JSON.stringify(result));
            onSuccess(options.fileName);
        },
        function (error) {
            console.log(JSON.stringify(error));
        },
        options);
}