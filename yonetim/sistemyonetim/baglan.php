<?php 
@session_start(); 
@ob_start();
@date_default_timezone_set("Europe/Istanbul");

require_once 'fonksiyon.php';

    try{
        $db = new PDO("mysql:host=localhost;dbname=blogscript;charset=utf8;", username:"root", password: "");
        $db->query("SET CHARACTER SET UTF8");
        $db->query("SET NAMES UTF8");
    }catch(PDOException $Hata){
        echo $Hata->getMessage(); 
    }


    if(@$_SESSION['oturum'] == sha1(md5(@$_SESSION['id'].IP()))){

        $yoneticibul = $db->prepare("SELECT * FROM yoneticiler WHERE id=:id");
        $yoneticibul->execute([':id' => $_SESSION['id']]);
        if($yoneticibul->rowCount()){
            $row    = $yoneticibul->fetch(PDO::FETCH_OBJ);
            $yid    = $row->id;
            $ykadi  = $row->kadi;
            $yposta = $row->eposta;
        }
    }


    $Ayarlar = $db->prepare("SELECT * FROM ayarlar");
    $Ayarlar->execute();
    $arow = $Ayarlar->fetch(PDO::FETCH_OBJ);
    $yonetim = $arow->site_url."/yonetim";
?>