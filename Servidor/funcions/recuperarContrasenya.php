<?php
    header("Access-Control-Allow-Origin: *");
    require '../connectDB.php';
    require 'encriptar.php';   


    $funcio = $_GET['funcio'];

    switch ($funcio) {
        case 1:
            comprovarNomUsuari($conn);
            break;
        case 2:
            comprovarResposta($conn);
            break;
        case 3:
            canviarContrasenya($conn);
            break;
    }

function comprovarNomUsuari($conn) {
    
    $nomUsuari = $_GET['nomUsuari'];
    
    $sql = "SELECT nomUsuari FROM usuari WHERE nomUsuari = '$nomUsuari'";
    
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
		$row = mysqli_fetch_row($result);
        echo "1";
	}
    else {
        echo "0";
    }
    
    mysqli_close($conn);
}


function comprovarResposta($conn) {
    
    $nomUsuari = $_GET['nomUsuari'];
    $resposta = $_GET['resposta'];
    
    $sql = "SELECT respostaPregunta FROM usuari WHERE nomUsuari = '$nomUsuari'";
    
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
		
        $row = mysqli_fetch_row($result);
        if($row[0] == $resposta)
        {            
            echo "1";
        }
        else
        {
            echo "2";
        }
	}
    
    mysqli_close($conn);
}


function canviarContrasenya($conn) {
    
    
    $nomUsuari = $_GET['nomUsuari'];
    $password = $_GET['password'];
    
    $clauNova = crearClau($password);
    $contrasenyaNova = encriptar($clauNova, $password);
    $sql = "UPDATE usuari SET pass = '$contrasenyaNova', clau='$clauNova' WHERE nomUsuari ='$nomUsuari'";


   if (mysqli_query($conn, $sql)) 
   {
	   echo 1;
	}
    else {
		echo 0;
	}
    
    mysqli_close($conn);
}


?>