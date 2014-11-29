<?php
/* Usage: <img src="thisfile.php"> */
$server = "localhost"; // camera server
$port = 8080; // camera server port
$fp = fsockopen($server, $port, $errno, $errstr, 30);
$query = $_SERVER['QUERY_STRING'];
$url = "";

parse_str($query, $output);
$url = "/?action=snapshot&n=".$output['n']; // url on camera server

/*echo "$url\n";*/


if( !$fp ){
    echo "$errstr ($errno)<br />\n";
}else{
    $urlstring = "GET ".$url." HTTP/1.0\r\n\r\n";
    fwrite( $fp, $urlstring );
    while( $str = trim( fgets( $fp, 4096 ) ) )header( $str );
    fpassthru( $fp );
    fclose( $fp );
}
?>











