<?php
    require_once '../sistem/fonksiyon.php';

    if($_POST){
        
        $ad = post('ad');
        $eposta = post('eposta');
        $konu = post('konu');
        $mesaj = post('mesaj');

        if(!$ad || !$eposta || !$konu || !$mesaj){
            echo "bos";
        }else{
            if(!filter_var($eposta, FILTER_VALIDATE_EMAIL)){
                echo "format";
            }else{

                $kaydet = $db->prepare("INSERT INTO mesajlar SET
                    isim =:i,
                    konu =:k,
                    eposta =:e,
                    mesaj =:m,
                    ip =:ip
                ");

                $kaydet->execute([
                    ':i' => $ad,
                    ':k' => $konu,
                    ':e' => $eposta,
                    ':m' => $mesaj,
                    ':ip' => IP()
                ]);

                if($kaydet){
                    echo "basarili";
                }else{
                    echo "hata";
                }

            }
        }

    }
?>