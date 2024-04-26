<?php require_once 'inc/ust.php'; ?>
    <!-- Sidebar menu-->
<?php require_once 'inc/sol.php'; ?>

    <main class="app-content">
      <div class="app-title">
        <div>
          <h1><i class="fa fa-th-list"></i> Yeni Mesajlar</h1>
          <p>Yeni Mesajlar</p>
        </div>
        <ul class="app-breadcrumb breadcrumb">
          <li class="breadcrumb-item"><i class="fa fa-home fa-lg"></i></li>
          <li class="breadcrumb-item">Yeni Mesajlar</li>
          <li class="breadcrumb-item active"><a href="#">Yeni Mesajlar</a></li>
        </ul>
      </div>
      <div class="row">

        <div class="clearfix"></div>
        <div class="col-md-12">
          <div class="tile">
            <?php 
              $s = @intval(get('s'));
              if(!$s){
                $s = 1;
              }

              $toplam = say('mesajlar', 'durum', 2);
              $lim = 10;
              $goster = $s * $lim - $lim;

              $sorgu = $db->prepare("SELECT * FROM mesajlar WHERE durum=:d ORDER BY id DESC LIMIT :goster,:lim");
              $sorgu->bindValue(':goster',(int) $goster, PDO::PARAM_INT);
              $sorgu->bindValue(':d',(int) 2, PDO::PARAM_INT);
              $sorgu->bindValue(':lim',(int) $lim, PDO::PARAM_INT);
              $sorgu->execute();

              if($s > ceil($toplam/$lim)){
                $s = 1;
              }

              if($sorgu->rowCount()){
            ?>
            <h3 class="tile-title">Yeni Mesajlar ( <?php echo $toplam; ?> )</h3>
            <div class="table-responsive table-hover">
              <table class="table">
                <thead>
                  <tr>
                    <th>#ID</th>
                    <th>İSİM</th>
                    <th>KONU</th>
                    <th>E-POSTA</th>
                    <th>TARİH</th>
                    <th>İŞLEMLER</th>
                  </tr>
                </thead>
                <tbody>
                  <?php
                    foreach($sorgu as $row){ 
                  ?>

                  <tr>
                    <td><?php echo $row['id']; ?></td>
                    <td><?php echo $row['isim']; ?></td>
                    <td><?php echo $row['konu']; ?></td>
                    <td><?php echo $row['eposta']; ?></td>
                    <td><?php echo date('d.m.Y', strtotime($row['tarih'])); ?></td>

                      <td><a href="<?php echo $yonetim."/islemler.php?islem=mesajoku&id=".$row['id']; ?>"><i class="fa fa-eye"></i></a> | <a onclick="return confirm('Onaylıyor musunuz ?');" href="<?php echo $yonetim."/islemler.php?islem=mesajsil&id=".$row['id']; ?>"><i class="fa fa-eraser"></i></a></td>
                  </tr>

                  <?php } ?>
                </tbody>
              </table>
            </div>

          <ul class="pagination">
              <?php
                  if($toplam > $lim){
                      pagination($s,ceil($toplam/$lim), 'bekleyenmesajlar.php?s=');
                  }         
              ?>                      
          </ul>

             <?php }else{
               echo "Yeni mesaj bulunmuyor";
             } ?>
          </div>
        </div>
      </div>
    </main>
<?php require_once 'inc/alt.php'; ?>