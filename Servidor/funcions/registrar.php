<?php
    require '../connectDB.php';
    require 'encriptar.php';
    header("Access-Control-Allow-Origin: *");

    $password = $_GET['password']; //el password;
    $nomUsuari = $_GET['nomUsuari'];
    $clau = crearClau($password);
    $passwordEncriptada = encriptar($clau,$password);
    $pregunta = $_GET['resposta'];
    
    $sql = "INSERT INTO usuari (nomUsuari, pass, clau, respostaPregunta) VALUES ('$nomUsuari' , '$passwordEncriptada', '$clau', '$pregunta')";

    if (mysqli_query($conn, $sql)) {
        echo 1;
    } 
    else {
        echo 0;
    }
    mysqli_close($conn);
?>
