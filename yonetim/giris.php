<?php
  require_once './sistemyonetim/fonksiyon.php';


?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Main CSS-->
    <link rel="stylesheet" type="text/css" href="css/main.css">
    <!-- Font-icon css-->
    <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <title>Yönetim Paneli</title>
  </head>
  <body>
    <section class="material-half-bg">
      <div class="cover"></div>
    </section>
    <section class="login-content">
      <div class="logo">
        <h1>Yönetim Paneli</h1>
      </div>
      <div class="login-box">

     
        <form class="login-form" action="" method="POST">
          <h3 class="login-head"><i class="fa fa-lg fa-fw fa-user"></i>Yönetici Girişi</h3>
          <div class="form-group">
            <label class="control-label">E-posta</label>
            <input class="form-control" name="eposta" type="text" placeholder="E-posta" autofocus>
          </div>
          <div class="form-group">
            <label class="control-label">Şifre</label>
            <input class="form-control" name="sifre" type="password" placeholder="Şifre">
          </div>

          <div class="form-group btn-container">
            <button type="submit" class="btn btn-primary btn-block"><i class="fa fa-sign-in fa-lg fa-fw"></i>Giriş Yap</button>
          </div>

          <?php
        if($_POST){
          $eposta = post('eposta');
          $sifre = post('sifre');
          $sifrele = sha1(md5($sifre));

          if(!$eposta || !$sifre){
            echo "<div style='width:100%; height:auto; padding:25px 5px 5px 5px; background:transparent; color:#f00; text-align:center; font-size:15.5px;'>Lütfen boş alan bırkmayınız</div>";
          }else{
            if(!filter_var($eposta, FILTER_VALIDATE_EMAIL)){
              echo "<div style='width:100%; height:auto; padding:25px 5px 5px 5px; background:transparent; color:#f00; text-align:center; font-size:15.5px;'>E-mail formatı yanlış!</div>";
            }else{

              $girisyap = $db->prepare("SELECT * FROM yoneticiler WHERE eposta=:e AND sifre=:s LIMIT :lim");
              $girisyap->bindValue(":e",$eposta,PDO::PARAM_STR);
              $girisyap->bindValue(":s",$sifrele,PDO::PARAM_STR);
              $girisyap->bindValue(":lim",(int) 1,PDO::PARAM_INT);
              $girisyap->execute();

              if($girisyap->rowCount()){

                $row = $girisyap->fetch(PDO::FETCH_OBJ);

                $songiris = $db->prepare("UPDATE yoneticiler SET sonip=:i,sontarih=:t WHERE id=:id");
                $songiris->execute([':i' => IP(), ':t' => date('Y-m-d H:i:s'), ':id' => $row->id]);

                $adminid = $row->id.IP();
                $kripto = sha1(md5($adminid));

                $_SESSION['oturum'] = $kripto;
                $_SESSION['id'] = $row->id;
                
                echo "<div style='width:100%; height:auto; padding:25px 5px 5px 5px; background:transparent; color:green; text-align:center; font-size:15.5px;'>Doğrulandı! Yönlendiriliyorsunuz...</div>";
                header('refresh:2;url=index.php');

              }else{
                echo "<div style='width:100%; height:auto; padding:25px 5px 5px 5px; background:transparent; color:#f00; text-align:center; font-size:15.5px;'>Hata! Böyle bir yönetici yok!</div>";
              }


            }
          }

        }
      ?>
        </form>

      </div>
    </section>

  </body>
</html>