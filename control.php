<?php
/* Usage: <img src="thisfile.php"> */
$server = "localhost"; // control server
$port = 3000; // control server port
$fp = fsockopen($server, $port, $errno, $errstr, 30);
$query = $_SERVER['QUERY_STRING'];
$url = "";

parse_str($query, $output);
$url = "/?".$query; // url on rt_http

/*echo $url;*/

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











