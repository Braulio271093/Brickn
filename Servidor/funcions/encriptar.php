<?php
    header("Access-Control-Allow-Origin: *");
    
    //genera la clau aleatoria
    function crearClau($pass){
        $contador = 0;
        $cuenta = strlen($pass);//longitud de la password        
        while($contador < $cuenta ){
        $aleatorio = rand(2,9);
        $clau[] = $aleatorio;
        $contador = $contador + 1;
        }
        return ClauString($clau);
    }
    
    //encripta la contra amb la clau que s'obte
    function encriptar($clau, $password){
    $contador = 0;
    $passWord = [];
    $cuenta = strlen($password);//longitud de la password
        
        //encriptem la contra
        while($contador < $cuenta ){
            $rest = ord (substr( $password , $contador));
            $resultat = $rest * $clau[$contador]; 
            $passWord[] = $resultat;
            $contador = $contador + 1;
        }
    return ClauString($passWord);   
    }
    
    function comprobarPassword($clau, $password ,$passwordEncriptada){
        $passPerEncriptar = encriptar($clau, $password);
        if($passPerEncriptar == $passwordEncriptada){
            return 1;
        }else{
            return 0;
        }
    }
    
    function toString($clau){
        $clauString = "";
        foreach($clau as &$clave){
            $clauString = $clauString . $clave . ",";
        }
        return $clauString;
    }
    function ClauString($clau){
        $clauString = "";
        foreach($clau as &$clave){
            $clauString = $clauString . $clave ;
        }
        return $clauString;
    }
    function ClautoArray($clau){
        return explode(",",$clau);  
    }
   

        
?> 