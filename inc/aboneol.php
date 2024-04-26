<?php
    require_once '../sistem/fonksiyon.php';
    if($_POST){
        $eposta = post('eposta');
        if(!$eposta){
            echo "bos";
        }else{
            if(!filter_var($eposta, FILTER_VALIDATE_EMAIL)){
                echo "format";
            }else{
                $varmi = $db->prepare("SELECT abone_mail FROM aboneler WHERE abone_mail=:mail");
                $varmi->execute([':mail' => $eposta]);
                if($varmi->rowCount()){
                    echo "var";
                }else{
                    $aboneol = $db->prepare("INSERT INTO aboneler SET abone_mail=:m,abone_ip=:i");
                    $aboneol->execute([':m' => $eposta, ':i' => IP()]);
                    if($aboneol){
                        echo 'basarili';
                    }else{
                        echo 'hata';
                    }
                }
            }
        }
    }
?>