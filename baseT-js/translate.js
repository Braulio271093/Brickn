/**
 * @author pau
 */

/**
 * Per traduir un string:
 * afegir a la tag del html la clase 'translate';
 * afegir a la mateixa tag del html el text {{idDelString}}';
 * crear en la funcio traduccio un nou string (copiar i pegar, cuidado les comes);
 */

/**
 * On estan tots els strings; al crear un nou afegir la , despres del ultim ];
 */
 var traduccions =
 '{' + 
 '"stringCambiarContrasenya" : [' + 
 	'{ "cat" : "Cambiar Contrasenya" },' + 
 	'{ "es"  : "Cambiar contraseña" },' + 
	'{ "en"  : "Change password"}' + 
 '],' + 
'"stringIntroduirNovaContrasenya" : [' + 
 	'{ "cat" : "Introdueix la nova contrasenya" },' + 
 	'{ "es"  : "Introduce la nueva contraseña" },' + 
	'{ "en"  : "Enter the new password"}' + 
 '],' + 
'"stringIntroduirAntigaContrasenya" : [' + 
 	'{ "cat" : "Introdueix la teva contrasenya actual" },' + 
 	'{ "es"  : "Introduce tu contraseña actual" },' + 
	'{ "en"  : "Enter your current password"}' + 
 '],' + 
'"stringModificar" : [' + 
 	'{ "cat" : "Modificar" },' + 
 	'{ "es"  : "Modificar" },' + 
	'{ "en"  : "Change"}' + 
 '],' + 
'"stringCambiarEmail" : [' + 
 	'{ "cat" : "Cambiar e-mail" },' + 
 	'{ "es"  : "Cambiar e-mail" },' + 
	'{ "en"  : "Change e-mail" }' + 
 '],' + 
'"stringIntroduirNouEmail" : [' + 
 	'{ "cat" : "Introdueix el nou e-mail" },' + 
 	'{ "es"  : "Introduce el nuevo e-mail" },' + 
	'{ "en"  : "Enter the new e-mail"}' + 
 '],' + 
'"stringIntroduirContrasenya" : [' + 
 	'{ "cat" : "Introdueix la teva contrasenya" },' + 
 	'{ "es"  : "Introduce tu contrasenya" },' + 
	'{ "en"  : "Enter your password"}' + 
 '],' + 
'"stringCambiarNomUsuari" : [' + 
 	'{ "cat" : "Cambiar nom usuari" },' + 
 	'{ "es"  : "Cambiar nombre de usuario" },' + 
	'{ "en"  : "Change username"}' + 
 '],' + 
'"stringIntroduirNomUsuari" : [' + 
 	'{ "cat" : "Introdueix el nom usuari" },' + 
 	'{ "es"  : "Introduce el nombre de usuario" },' + 
	'{ "en"  : "Enter the username"}' + 
 '],' + 
'"stringCrearGrup" : [' + 
 	'{ "cat" : "Crear grup" },' + 
 	'{ "es"  : "Crear grupo" },' + 
	'{ "en"  : "Create group"}' + 
 '],' + 
'"stringNomGrup" : [' + 
 	'{ "cat" : "Nom del grup" },' + 
 	'{ "es"  : "Nombre del grupo" },' + 
	'{ "en"  : "Group name"}' + 
 '],' + 
'"stringTipusGrup" : [' + 
 	'{ "cat" : "Tipus de grup" },' + 
 	'{ "es"  : "Tipo de grupo" },' + 
	'{ "en"  : "Group Type"}' + 
 '],' + 
'"stringPrivat" : [' + 
 	'{ "cat" : "Privat" },' + 
 	'{ "es"  : "Privado" },' + 
	'{ "en"  : "Private"}' + 
 '],' + 
'"stringPublic" : [' + 
 	'{ "cat" : "Public" },' + 
 	'{ "es"  : "Público" },' + 
	'{ "en"  : "Public"}' + 
 '],' + 
'"stringAfegirTemas" : [' + 
 	'{ "cat" : "Afegir Temas: " },' + 
 	'{ "es"  : "Añadir Temas: " },' + 
	'{ "en"  : "Add topics: "}' + 
 '],' + 
'"stringAfegirContacteGrup" : [' + 
 	'{ "cat" : "Afegir contactes al grup: " },' + 
 	'{ "es"  : "Añadir contactos al grupo: " },' + 
	'{ "en"  : "Add contacts to group: "}' + 
 '],' + 
'"stringEliminarCompte" : [' + 
 	'{ "cat" : "Eliminar compte" },' + 
 	'{ "es"  : "Eliminar cuenta" },' + 
	'{ "en"  : "Delete account"}' + 
 '],' + 
'"stringEliminar" : [' + 
 	'{ "cat" : "Eliminar" },' + 
 	'{ "es"  : "Eliminar" },' + 
	'{ "en"  : "Delete"}' + 
 '],' + 
'"stringNomApp" : [' + 
 	'{ "cat" : "Brskin Cat" },' + 
 	'{ "es"  : "Brskin Es" },' + 
	'{ "en"  : "Brskin En"}' + 
 '],' + 
'"stringPerfil" : [' + 
 	'{ "cat" : "Perfil" },' + 
 	'{ "es"  : "Perfil" },' + 
	'{ "en"  : "Profile"}' + 
 '],' + 
'"stringOpcions" : [' + 
 	'{ "cat" : "Opcions" },' + 
 	'{ "es"  : "Opciones" },' + 
	'{ "en"  : "Options"}' + 
 '],' + 
'"stringSortir" : [' + 
 	'{ "cat" : "Sortir" },' + 
 	'{ "es"  : "Salir" },' + 
	'{ "en"  : "Log Out"}' + 
 '],' + 
'"stringResum" : [' + 
 	'{ "cat" : "MUR" },' + 
 	'{ "es"  : "MURO" },' + 
	'{ "en"  : "WALL"}' + 
 '],' + 
'"stringGrups" : [' + 
 	'{ "cat" : "GRUPS" },' + 
 	'{ "es"  : "GRUPOS" },' + 
	'{ "en"  : "GROUPS"}' + 
 '],' + 
'"stringMon" : [' + 
 	'{ "cat" : "MÓN" },' + 
 	'{ "es"  : "MUNDO" },' + 
	'{ "en"  : "WORLD"}' + 
 '],' + 
'"stringRegistrarse" : [' + 
 	'{ "cat" : "Registrar-se" },' + 
 	'{ "es"  : "Registrarse" },' + 
	'{ "en"  : "Sign up"}' + 
 '],' + 
'"stringEntrar" : [' + 
 	'{ "cat" : "Entrar" },' + 
 	'{ "es"  : "Entrar" },' + 
	'{ "en"  : "Sign in"}' + 
 '],' + 
'"stringNomUsuari" : [' + 
 	'{ "cat" : "Nom usuari" },' + 
 	'{ "es"  : "Nombre de usuario" },' + 
	'{ "en"  : "Username"}' + 
 '],' + 
'"stringPassword" : [' + 
 	'{ "cat" : "Contrasenya" },' + 
 	'{ "es"  : "Contraseña" },' + 
	'{ "en"  : "Password"}' + 
 '],' + 
'"stringPreguntaDeRecuperacio" : [' + 
 	'{ "cat" : "Pregunta de recuperació" },' + 
 	'{ "es"  : "Pregunta de recuperación" },' + 
	'{ "en"  : "Recovery question"}' + 
 '],' + 
'"stringNomPrimerMascota" : [' + 
 	'{ "cat" : "Nom de la teva primeta mascota" },' + 
 	'{ "es"  : "Nombre de tu primera mascota" },' + 
	'{ "en"  : "Name of your first pet"}' + 
 '],' + 
'"stringCiutatMare" : [' + 
 	'{ "cat" : "Ciutat de neixament de la teva mare" },' + 
 	'{ "es"  : "Ciudad de nacimiento de tu madre" },' + 
	'{ "en"  : "Birthplace of your mother"}' + 
 '],' + 
'"stringMarcaVehicle" : [' + 
 	'{ "cat" : "Marca del teu vehicle" },' + 
 	'{ "es"  : "Marca de tu vehiculo" },' + 
	'{ "en"  : "Brand of your vehicle"}' + 
 '],' + 
'"stringContrasenyaOlvidada" : [' + 
 	'{ "cat" : "Contrasenya olvidada?" },' + 
 	'{ "es"  : "¿Contraseña olvidada?" },' + 
	'{ "en"  : "Forgotten password?"}' + 
 '],' + 
'"stringCompte" : [' + 
 	'{ "cat" : "Compte" },' + 
 	'{ "es"  : "Cuenta" },' + 
	'{ "en"  : "Account"}' + 
 '],' + 
'"stringInformacióAjuda" : [' + 
 	'{ "cat" : "Informació i ajuda" },' + 
 	'{ "es"  : "Información y ayuda" },' + 
	'{ "en"  : "Information and help"}' + 
 '],' + 
'"stringElimnarContrasenya" : [' + 
 	'{ "cat" : "Eliminar compte" },' + 
 	'{ "es"  : "Eliminar cuenta" },' + 
	'{ "en"  : "Delete account"}' + 
 '],' + 
'"stringContactes" : [' + 
 	'{ "cat" : "Contactes" },' + 
 	'{ "es"  : "Contactos" },' + 
	'{ "en"  : "Contacts"}' + 
 '],' + 
'"stringTemas" : [' + 
 	'{ "cat" : "Temas" },' + 
 	'{ "es"  : "Temas" },' + 
	'{ "en"  : "Likes"}' + 
 '],' + 
 '"stringContrasenyaModificada" : [' + 
 	'{ "cat" : "Contrasenya modificada" },' + 
 	'{ "es"  : "Contraseña modificada" },' + 
	'{ "en"  : "Password changed"}' + 
 '],' + 
'"stringContrasenyaIncorrecte" : [' + 
 	'{ "cat" : "Contrasenya incorrecte" },' + 
 	'{ "es"  : "Contraseña incorrecta" },' + 
	'{ "en"  : "Incorrect password"}' + 
 '],' + 
'"stringErrorCambiarContrasenya" : [' + 
 	'{ "cat" : "Error al cambiar la contrasenya" },' + 
 	'{ "es"  : "Error al cambiar la contraseña" },' + 
	'{ "en"  : "Error"}' + 
 '],' + 
'"errorServerOut" : [' + 
 	'{ "cat" : "No es pot conectar al servidor" },' + 
 	'{ "es"  : "No se puede conectar al servidor" },' + 
	'{ "en"  : "Can not connect to server"}' + 
 '],' + 
'"stringEmailModificat" : [' + 
 	'{ "cat" : "E-mail modificat" },' + 
 	'{ "es"  : "E-mail modificado" },' + 
	'{ "en"  : "E-mail changed"}' + 
 '],' + 
'"stringErrorCambiarMail" : [' + 
 	'{ "cat" : "Error al cambiar el mail" },' + 
 	'{ "es"  : "Error al cambiar el e-mail" },' + 
	'{ "en"  : "Error email"}' + 
 '],' + 
'"stringNomUsuariModificat" : [' + 
 	'{ "cat" : "Nom d usuari modificat" },' + 
 	'{ "es"  : "Nombre de usuario modificado" },' + 
	'{ "en"  : "Username changed"}' + 
 '],' + 
'"stringNomUsuariExisteix" : [' + 
 	'{ "cat" : "El nom d usuari introduit ja existeix" },' + 
 	'{ "es"  : "El nombre de usuario introducido ya existe" },' + 
	'{ "en"  : "This username already exists"}' + 
 '],' + 
'"stringErrorCambiarNomUsuari" : [' + 
 	'{ "cat" : "Error al cambiar el nom d usuari" },' + 
 	'{ "es"  : "Error al cambiar el nombre de usuario" },' + 
	'{ "en"  : "Error al cambiar nom usuari"}' + 
 '],' + 
'"stringNoResultats" : [' + 
 	'{ "cat" : "Cap resultat" },' + 
 	'{ "es"  : "Ningun resultado" },' + 
	'{ "en"  : "No results"}' + 
 '],' + 
'"stringErrorBorrarUsuari" : [' + 
 	'{ "cat" : "Error al borrar l usuari" },' + 
 	'{ "es"  : "Error al borrar el usuario" },' + 
	'{ "en"  : "Error borrar usuari"}' + 
 '],' + 
'"stringDadesIncorrectes" : [' + 
 	'{ "cat" : "Dades incorrectes" },' + 
 	'{ "es"  : "Datos incorrectos" },' + 
	'{ "en"  : "Incorrect username or password"}' + 
 '],' + 
'"idDelString" : [' + 
 	'{ "cat" : "iddelstring" },' + 
 	'{ "es"  : "iddelstring" },' + 
	'{ "en"  : "iddelstring"}' + 
 '],' + 
 '"stringNoContactesAfegits" : [' + 
 	'{ "cat" : "Cap contacte afegit" },' + 
 	'{ "es"  : "Ningun contacto añadido" },' + 
	'{ "en"  : "No contacts"}' + 
 '],' + 
'"stringNoTemesAfegits" : [' + 
 	'{ "cat" : "Cap tema afegit" },' + 
 	'{ "es"  : "Ningun tema añadido" },' + 
	'{ "en"  : "No likes"}' + 
 '],' + 
'"stringCambiarIdioma" : [' + 
 	'{ "cat" : "Cambiar idioma" },' + 
 	'{ "es"  : "Cambiar idioma" },' + 
	'{ "en"  : "Change language"}' + 
 '],' + 
'"stringUsuariCreat" : [' + 
 	'{ "cat" : "Usuari creat" },' + 
 	'{ "es"  : "Usuario creado" },' + 
	'{ "en"  : "User created"}' + 
 '],' + 
'"stringUsuariNoCreat" : [' + 
 	'{ "cat" : "Error al crear l\'usuari" },' + 
 	'{ "es"  : "Error al crear el usuario" },' + 
	'{ "en"  : "Error create user"}' + 
 '],' + 
 '"errorTraduccio" : [' + 
 	'{ "cat" : "Error traducció" },' + 
 	'{ "es"  : "Error de traducción" },' + 
	'{ "en"  : "Traduction error"}' + 
 '],' + 
 '"stringAfegirContactes" : [' + 
 	'{ "cat" : "Afegir contactes " },' + 
 	'{ "es"  : "Añadir contactos " },' + 
	'{ "en"  : "Add friends "}' + 
 '],' + 
 '"stringRecuperarContrasenya" : [' + 
 	'{ "cat" : "Recuperar contrasenya" },' + 
 	'{ "es"  : "Recuperar contraseña" },' + 
	'{ "en"  : "Reset your password"}' + 
 '],' + 
'"stringIntroduceUsuario" : [' + 
 	'{ "cat" : "Introdueix el nom d usuari" },' + 
 	'{ "es"  : "Introduce el nombre de usuario" },' + 
	'{ "en"  : "Enter your username"}' + 
 '],' + 
'"stringContinuar" : [' + 
 	'{ "cat" : "Continuar" },' + 
 	'{ "es"  : "Continuar" },' + 
	'{ "en"  : "Continue"}' + 
 '],' + 
 '"stringNomUsuariEnBlanc" : [' + 
 	'{ "cat" : "Nom d usuari en blanc" },' + 
 	'{ "es"  : "Nombre de usuario en blanco" },' + 
	'{ "en"  : "No username "}' + 
 '],' + 
'"stringNomUsuariNoExisteix" : [' + 
 	'{ "cat" : "No existeix cap usuari" },' + 
 	'{ "es"  : "No existe ningun usuario" },' + 
	'{ "en"  : "Do not exists"}' + 
 '],' + 
 '"stringRespostaEnBlanc" : [' + 
 	'{ "cat" : "La resposta en blanc" },' + 
 	'{ "es"  : "La respuesta esta en blanco" },' + 
	'{ "en"  : "No answer"}' + 
 '],' + 
'"stringRespostaIncorrecta" : [' + 
 	'{ "cat" : "Resposta incorrecte" },' + 
 	'{ "es"  : "Respuesta incorrecta" },' + 
	'{ "en"  : "Wrong answer"}' + 
 '],' + 
'"stringContrasenyaEnBlanc" : [' + 
 	'{ "cat" : "Contrasenya en blanc" },' + 
 	'{ "es"  : "Contrasenya en blanc" },' + 
	'{ "en"  : "Contrasenya en blanc"}' + 
 '],' + 
'"stringContrasenyaDiferents" : [' + 
 	'{ "cat" : "Les contrasenyes no coincideixen" },' + 
 	'{ "es"  : "Les contraseñas no coinciden" },' + 
	'{ "en"  : "The passwords are not the same"}' + 
 '],' + 
'"stringContrasenyaCanviada" : [' + 
 	'{ "cat" : "Contrasenya canviada" },' + 
 	'{ "es"  : "Contraseña can" },' + 
	'{ "en"  : "Password changed"}' + 
 '],' + 
'"stringErrorCambiarContrasenya" : [' + 
 	'{ "cat" : "Error al cambiar la contrasenya" },' + 
 	'{ "es"  : "Error al cambiar la contraseña" },' + 
	'{ "en"  : "Error"}' + 
 '],' +
 '"stringTornarIntroduirNovaContrasenya" : [' + 
 	'{ "cat" : "Torna a introduir la contrasenya" },' + 
 	'{ "es"  : "Vuelve a introducir la contraseña" },' + 
	'{ "en"  : "Enter again the new password"}' + 
 '],' +
  '"stringBuscarGrup" : [' + 
 	'{ "cat" : "Buscar grup" },' + 
 	'{ "es"  : "Buscar grupo" },' + 
	'{ "en"  : "Search group"}' + 
 '],' + 
 '"stringBuscar" : [' + 
 	'{ "cat" : "Buscar" },' + 
 	'{ "es"  : "Buscar" },' + 
	'{ "en"  : "Search"}' + 
 '],' + 
'"stringBuscarPerNom" : [' + 
 	'{ "cat" : "Buscar per nom" },' + 
 	'{ "es"  : "Buscar por nombre" },' + 
	'{ "en"  : "Search by name"}' + 
 '],' + 
 '"stringBuscarPerTema" : [' + 
 	'{ "cat" : "Buscar per tema" },' + 
 	'{ "es"  : "Buscar por tema" },' + 
	'{ "en"  : "Search by like"}' + 
 '],' + 
 '"errorGrupExist" : [' + 
 	'{ "cat" : "Error. El nom del grup ja existeix" },' + 
 	'{ "es"  : "Error. El nombre del grupo ya existe" },' + 
	'{ "en"  : "Error. The group name already exists"}' + 
 '],' + 
  '"stringUsuarisNoAfegits" : [' + 
 	'{ "cat" : "Alguns usuaris no han sigut afegits perque no t\'han acceptat com a contacte." },' + 
 	'{ "es"  : "Alguns usuaris no han sigut afegits perque no t\'han acceptat com a contacte." },' + 
	'{ "en"  : "Alguns usuaris no han sigut afegits perque no t\'han acceptat com a contacte."}' + 
 '],' + 
'"stringUnirse" : [' + 
 	'{ "cat" : "Unir-se" },' + 
 	'{ "es"  : "Unirse" },' + 
	'{ "en"  : "Join"}' + 
 '],' +
 '"stringNoSolicitut" : [' + 
 	'{ "cat" : "Cap sol·licitut" },' + 
 	'{ "es"  : "Ninguna solicitud" },' + 
	'{ "en"  : "Any X"}' + 
 '],' +
  '"stringAcceptar" : [' + 
 	'{ "cat" : "Acceptar" },' + 
 	'{ "es"  : "Aceptar" },' + 
	'{ "en"  : "Accept"}' + 
 '],' +
  '"stringTancar" : [' + 
 	'{ "cat" : "Tancar" },' + 
 	'{ "es"  : "Cerrar" },' + 
	'{ "en"  : "Close"}' + 
 '],' +
  '"stringIntroduirPasswordGrup" : [' + 
 	'{ "cat" : "Introdueix la contrasenya daquest grup: " },' + 
 	'{ "es"  : "Introduce la contraseña de este grupo:  " },' + 
	'{ "en"  : "Enter the password of the group: "}' + 
 '],' +
'"stringBuscarTeusTemas" : [' + 
	'{ "cat" : "Mostrar per temes seleccionats" },' + 
 	'{ "es"  : "Mostrar por temas seleccionados" },' + 
	'{ "en"  : "Show groups by selected topics"}' + 
 '],' +
 '"stringAhir" : [' + 
	'{ "cat" : "Ahir" },' + 
 	'{ "es"  : "Ayer" },' + 
	'{ "en"  : "Yesterday"}' + 
 '],' +
  '"stringAbans" : [' + 
	'{ "cat" : "abans" },' + 
 	'{ "es"  : "antes" },' + 
	'{ "en"  : "ago"}' + 
 ']' +
'}';




/**
 * Obtenir totes les tags que tenen la clase translate i traduir el text;
 */
$(".translate").each(function () {
    var idString = $(this).text();
    idString = getIdString(idString);
    var string = getStringLan(idioma, idString);

	if ($(this).children('span').length > 0) { //si la tag conte un icon (span);
		var spanClass = $(this).find('span').attr('class');
		var spanTag = "<span class='" + spanClass + "' aria-hidden='true' style='margin-right: 10px'></span>";
		$(this).text(string);
		$(this).prepend(spanTag);
	}
	else if ($(this).children('input').length > 0) {
		var inputTag = $(this).find('input')[0].outerHTML;
		$(this).text(string);
		$(this).prepend(inputTag);
	}
	else {
		$(this).text(string);
	}

	if ($(this).is('label')) { //afegir el placeholder del input al que apunta;
		var x = $(this).attr('for'); //id del input
		$('#' + x).attr('placeholder', string);
	}
			
});

/**
 * Transformar el string;
 * @param idString 
 * @return id del String
 */
function getIdString(idString) {
    idString = idString.replace('{', "");
    idString = idString.replace('{', "");
    for (var i = 0; i < idString.length ; i++) {
        idString = idString.replace(' ', "");
    }
    idString = idString.replace('}', "");
    idString = idString.replace('}', "");
    idString = idString.replace(/[0-9]/g, '');
    idString = idString.replace('\n', '');
    return idString;
}

/**
 * Obtenir la id del idioma;
 * @returns id del idioma;
 */
function getLanId(lan) {
    var lanId;
	lan = lan.toLowerCase();
	lan = lan.substring(0,3);
	lan = lan.replace('-', '');
	lan = lan.replace(' ', '');
    switch (lan) {
        case 'cat':
            lanId = 0;
            break;
        case 'es':
            lanId = 1;
            break;
        case 'en':
            lanId = 2;
            break;
        default:
            lanId = 2;
            break;
    }
    return lanId;
}

/**
 * Obtenir el string traduit;
 * @param lan = idioma del usuari; definit en baseT;
 * @param idString = id del string a traduir;
 * @returns string traduit;
 */
function getStringLan(lan, idString) {
    var strings = traduccions;
	strings = JSON.parse(strings);
    var lanId = getLanId(lan);
	lan = lan.substring(0,3); //solució provisional; 
	lan = lan.replace('-', '');
	try {
		var y   = 'strings.' + idString + '[' + lanId + '].' + lan;
		var x = eval(y);
	}
	catch (e){
		var x = "no traduccio";
	}
    return x;
}


/**
 * Per poder traduir strings cridats desde scripts;
 * @param msg id del string per traduir;
 * @return string traduit;
 */
function __(msg) {
    var idString = msg;
    idString = getIdString(idString);
    var string = getStringLan(idioma, idString); ;
    return string;
}
