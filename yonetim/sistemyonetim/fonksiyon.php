<?php

require_once 'baglan.php';

function post($parametre, $kosul = false){
    if( $kosul == false ){
        $sonuc = strip_tags(trim($_POST[$parametre]));
    }elseif( $kosul == true ){
        $sonuc = strip_tags(trim(addslashes($_POST[$parametre])));
    }
    return $sonuc;
}

function get($parametre, $kosul = false){
    if( $kosul == false ){
        $sonuc = strip_tags(trim($_GET[$parametre]));
    }elseif( $kosul == true ){
        $sonuc = strip_tags(trim(addslashes($_GET[$parametre])));
    }
    return $sonuc;
}


function IP(){

    if(getenv("HTTP_CLIENT_IP")){
        $ip = getenv("HTTP_CLIENT_IP");
    }elseif(getenv("HTTP_X_FORWARDED_FOR")){
        $ip = getenv("HTTP_X_FORWARDED_FOR");
        if (strstr($ip, ',')) {
            $tmp = explode (',', $ip);
            $ip = trim($tmp[0]);
        }
    }else{
        $ip = getenv("REMOTE_ADDR");
    }
    return $ip;
}




function pagination($s, $ptotal, $url){
    global $yonetim;

    $forlimit = 3;
    if($ptotal < 2){
        null;
    }else{

        if($s > 4){
            $prev  = $s - 1;
            echo '<li class="page-item"><a class="page-link" href="'.$yonetim.'/'.$url.'1" ><i class="fa fa-angle-left"></i></a></li>';
            echo '<li class="page-item"><a class="page-link" href="'.$yonetim.'/'.$url.($s-1).'" ><</a></li>';
        }

        for($i = $s - $forlimit; $i < $s + $forlimit + 1; $i++){
            if($i > 0 && $i <= $ptotal){
                if($i == $s){
                    echo '<li class="page-item active"><a class="page-link"  href="#">'.$i.'</a></li>';
                }else{
                    echo '<li class="page-item"><a class="page-link" href="'.$yonetim.'/'.$url.$i.'" >'.$i.'</a></li>';
                }
            }
        }

        if($s <= $ptotal - 4){
            $next  = $s + 1;
            echo '<li class="page-item"><a class="page-link" href="'.$yonetim.'/'.$url.$next.'" > <i class="fa fa-angle-right"></i></a></li>';
            echo '<li class="page-item"><a class="page-link" href="'.$yonetim.'/'.$url.$ptotal.'" >»</a></li>';
        }
    }

}




function sef_link($str){
    $preg = array('Ç', 'Ş', 'Ğ', 'Ü', 'İ', 'Ö', 'ç', 'ş', 'ğ', 'ü', 'ö', 'ı', '+', '#', '.');
    $match = array('c', 's', 'g', 'u', 'i', 'o', 'c', 's', 'g', 'u', 'o', 'i', 'plus', 'sharp', '');
    $perma = strtolower(str_replace($preg, $match, $str));
    $perma = preg_replace("@[^A-Za-z0-9\-_\.\+]@i", ' ', $perma);
    $perma = trim(preg_replace('/\s+/', ' ', $perma));
    $perma = str_replace(' ', '-', $perma);
    return $perma;
}




function say($tablo, $sutun = false, $deger = false ,$iz = '='){
    global $db;
    $sql = "SELECT * FROM $tablo";
    
    if($sutun || $deger){
        
        $sql .= " WHERE $sutun $iz :$sutun";
        $query = $db->prepare($sql);
        $query->execute([":$sutun" => $deger]);
        return $query->rowCount();
        
    }else{
        
        $query = $db->prepare($sql);
        $query->execute();
        return $query->rowCount();
    }
    
}


function loc(){
    $loc = 'http';
    if (array_key_exists('HTTPS', $_SERVER) && $_SERVER["HTTPS"] == "on") {$pageURL .= "s";}
    $loc .= "://";
    if ($_SERVER["SERVER_PORT"] != "80") {
        $loc .= $_SERVER["SERVER_NAME"].":".$_SERVER["SERVER_PORT"].$_SERVER["REQUEST_URI"];
    } else {
        $loc .= $_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"];
    }
    return $loc;
}

?>