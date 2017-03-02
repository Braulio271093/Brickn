<?php
    //script per connectar-se a la base de dades del mysql;
    $servername = "localhost"; //direccio de ip del server
    $username = "root"; //usuari, no hauria de ser root...
    $password = "pau123456"; //contrasenya
    $dbname = "projecte"; //nom de la base de dades;
    
    // Crear conneccio
    $conn = mysqli_connect($servername, $username, $password, $dbname); //nova connexio, la @ al principi que no mostrara els errors;
    
    // Comprovar la connexio;
    if (!$conn) {
        die("No s'ha pogut connectar amb el servidor.");
    }
   

?>
