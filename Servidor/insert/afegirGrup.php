<?php
	require '../connectDB.php';
	header("Access-Control-Allow-Origin: *");

    $nomGrup = $_GET['nomGrup'];
    $tipus = $_GET['tipus'];
    $usuarisGrup = $_GET['usuarisGrup'];
    $temesGrup = $_GET['temesGrup'];

    $sql = "INSERT INTO grup (nom, tipus) VALUES ('$nomGrup', $tipus)"; //crear el grup
	if (mysqli_query($conn, $sql)) {
		$sql = "SELECT id FROM grup WHERE nom = '$nomGrup' AND tipus = $tipus"; //obtenir la id del nou grup;
        $result = mysqli_query($conn, $sql);

        if (mysqli_num_rows($result) > 0) {
            $row = mysqli_fetch_row($result);
            $idGrup = $row[0]; 
            
            $usuarisGrup = explode("," , $usuarisGrup);
            $idUsuari = $usuarisGrup[0]; //id del usuari que serà afegit; el primer ets tu i estas com a admin;
            $sql = "INSERT INTO usuari_grup (idUsuari, idGrup, admin) VALUES ($idUsuari, $idGrup, 1)";
            mysqli_query($conn, $sql);

            $e = 1; //variable que envia el echo;
            for ($i = 1; $i < count($usuarisGrup); $i++) { //afegir tots els usuaris si t'han acceptat com a contacte;
                $idUsuariAfegir = $usuarisGrup[$i];
                $sql = "SELECT acceptat FROM usuari_contacte WHERE idUsuari1 = $idUsuari AND idUsuari2 = $idUsuariAfegir";
                $result = mysqli_query($conn, $sql);
                $row = mysqli_fetch_row($result);
                if ($row[0] == 1) {
                    $sql = "INSERT INTO usuari_grup (idUsuari, idGrup) VALUES ($idUsuariAfegir, $idGrup)";
                    mysqli_query($conn, $sql);
                }
                else {
                    $e = 3; //3 = no s'han afegit tots els usuaris al grup;
                }
            }

            $temesGrup = explode(",", $temesGrup);
            for ($i = 0; $i < count($temesGrup); $i++) { //afegir tots els likes;
                $idLike = $temesGrup[$i];
                $sql = "INSERT INTO grup_tema (idGrup, idTema) VALUES ($idGrup, $idLike)";
                mysqli_query($conn, $sql);
            }
            echo json_encode($e);
        }
        else {
            echo 2;
        }
	}
	else {
		echo 0;
	}
    mysqli_close($conn);


?>