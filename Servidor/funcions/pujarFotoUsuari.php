<?php
header('Access-Control-Allow-Origin: *');
require '../connectDB.php';

$idUsuari = $_GET['idUsuari'];
$new_image_name = urldecode($_FILES["file"]["name"])."_$idUsuari.jpg";

move_uploaded_file($_FILES["file"]["tmp_name"], "../imgServer/fotosPerfil/".$new_image_name);

?>