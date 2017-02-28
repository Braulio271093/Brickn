<?php
    require '../connectDB.php';
    header("Access-Control-Allow-Origin: *");

    $q = $_GET['q'];
    $sql = "SELECT grup.nom FROM grup WHERE grup.tipus = 0 
            AND grup.nom = '$q'";

    $resultat = mysqli_query($conn, $sql);


	if (mysqli_num_rows($resultat) > 0) 
    {
		echo 1;
	}
	else 
    {
		echo 0;
	}
     mysqli_close($conn); 
?>
