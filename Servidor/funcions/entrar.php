<?php 
    require '../connectDB.php';
    require 'encriptar.php';
    header("Access-Control-Allow-Origin: *"); //permetre conexxions desde fora del servidor;
    

    $nomUsuari = $_GET['nomUsuari']; //obtenim el mail;
    $password = $_GET['password']; //el password;
    $clau; //la clau;

    $sql = "SELECT clau FROM usuari WHERE nomUsuari = '$nomUsuari'";
    $result = mysqli_query($conn, $sql);
    if (mysqli_num_rows($result) > 0) {
		$row = mysqli_fetch_row($result);
		$clau = $row[0]; 
	}
    $passwordEncriptada = encriptar($clau, $password);

    $sql = "SELECT id, nomUsuari, pass FROM usuari WHERE nomUsuari = '$nomUsuari' AND pass = '$passwordEncriptada'" ;
    $result = mysqli_query($conn, $sql);
    
    if (mysqli_num_rows($result) > 0) { //si el resultat de la consulta és més gran que 0;
        $row =  mysqli_fetch_row($result); //aixi obtenim el resultat de la consulta en un array $row i es pot convertir a string per poder pasarlo amb json, en cas de voler obtenir més dades;;
        echo json_encode(array("errorDades" => "0", "idUsuari" => $row[0], "nomUsuari" => $row[1]));
    } 
    else {
        echo json_encode(array("errorDades" => "1"));
    }
    mysqli_close($conn);
?>
