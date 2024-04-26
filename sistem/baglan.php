<?php

ob_start();

try{
    $db = new PDO("mysql:host=localhost;dbname=blogscript;charset=utf8;", username:"root", password: "");
    $db->query("SET CHARACTER SET UTF8");
    $db->query("SET NAMES UTF8");
}catch(PDOException $Hata){
    echo $Hata->getMessage(); 
}

## Ayarlar tablosuna bağlanıyoruz...
$Ayarlar = $db->prepare("SELECT * FROM ayarlar");
$Ayarlar->execute();
$arow = $Ayarlar->fetch(PDO::FETCH_OBJ);
$site = $arow->site_url;
$sitebaslik = $arow->site_baslik;
$logo = $arow->site_logo;
$sitekeyw = $arow->site_keyw;
$sitedesc = $arow->site_desc;

if($arow->site_durum != 1){
    header('location:bakimmodu.php');
}
?>