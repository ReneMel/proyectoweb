<?php
    try{
    
        if ($dbconn2 = pg_connect("host=localhost port=5432 dbname=ucasoft user=renemel password=***..")){
            echo "me gusta";
        }else 
        {
            throw new Exception ('Unable to connect');
        }
    }
    catch(Exception $e){
        
    }
?>