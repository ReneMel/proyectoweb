<?php
    //DB
    $dbHost = 'localhost';
    $dbUser = 'pipo';
    $dbPass = 'Dumbo';
    $dbName = 'reserva_lab';

    $db = new mysqli($dbHost,$dbUser,$dbPass,$dbName);

    if($db->connect_error) {
        die("Unable to connect database: " . $db->connect_error);
    }
?>