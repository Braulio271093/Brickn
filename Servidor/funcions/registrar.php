<?php
    require '../connectDB.php';
    require 'encriptar.php';
    header("Access-Control-Allow-Origin: *");

    $password = $_GET['password']; //el password;
    $nomUsuari = $_GET['nomUsuari'];
    $pregunta = $_GET['resposta'];

    $sql = "SELECT nomUsuari FROM usuari WHERE nomUsuari = '$nomUsuari'";
    if ($result = mysqli_query($conn, $sql)) {
         if (mysqli_num_rows($result) > 0) {
             echo 2; //ja existeix un usuari amb aquest nom;
         }
         else {
            $clau = crearClau($password);
            $passwordEncriptada = encriptar($clau,$password);
            
            $sql = "INSERT INTO usuari (nomUsuari, pass, clau, respostaPregunta) VALUES ('$nomUsuari' , '$passwordEncriptada', '$clau', '$pregunta')";

            if (mysqli_query($conn, $sql)) {
                echo 1;
            } 
            else {
                echo 0;
            }         
         }
    } 
    else {
        echo 0;
    }
    
    mysqli_close($conn);
?>
