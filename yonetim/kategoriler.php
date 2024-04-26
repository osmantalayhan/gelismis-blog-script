<?php require_once 'inc/ust.php'; ?>
    <!-- Sidebar menu-->
<?php require_once 'inc/sol.php'; ?>

    <main class="app-content">
      <div class="app-title">
        <div>
          <h1><i class="fa fa-th-list"></i> Kategoriler</h1>
          <p>Kategori Listesi</p>
        </div>
        <ul class="app-breadcrumb breadcrumb">
          <li class="breadcrumb-item"><i class="fa fa-home fa-lg"></i></li>
          <li class="breadcrumb-item">Kategoriler</li>
          <li class="breadcrumb-item active"><a href="#">Kategori Listesi</a></li>
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

              $toplam = say('kategoriler');
              $lim = 10;
              $goster = $s * $lim - $lim;

              $sorgu = $db->prepare("SELECT * FROM kategoriler ORDER BY id DESC LIMIT :goster,:lim");
              $sorgu->bindValue(':goster',(int) $goster, PDO::PARAM_INT);
              $sorgu->bindValue(':lim',(int) $lim, PDO::PARAM_INT);
              $sorgu->execute();

              if($s > ceil($toplam/$lim)){
                $s = 1;
              }

              if($sorgu->rowCount()){
            ?>
            <h3 class="tile-title">Kategori Listesi ( <?php echo $toplam; ?> )</h3>
            <div class="table-responsive table-hover">
              <table class="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>KATEGORİ ADI</th>
                    <th>KATEGORİ KELİMELER</th>
                    <th>KATEGORİ AÇIKLAMA</th>
                    <th>İŞLEMLER</th>
                  </tr>
                </thead>
                <tbody>
                  <?php
                    foreach($sorgu as $row){ 
                  ?>

                  <tr>
                    <td><?php echo $row['id']; ?></td>
                    <td><?php echo $row['kat_adi']; ?></td>
                    <td><?php echo $row['kat_keyw']; ?></td>
                    <td><?php echo $row['kat_desc']; ?></td>

                      <td><a href="<?php echo $yonetim."/islemler.php?islem=kategoriduzenle&id=".$row['id']; ?>"><i class="fa fa-edit"></i></a> | <a onclick="return confirm('Kategori silindiği zaman bu kategoriye ait tüm konular pasif duruma gelecektir onaylıyor musunuz ?');" href="<?php echo $yonetim."/islemler.php?islem=kategorisil&id=".$row['id']; ?>"><i class="fa fa-eraser"></i></a></td>
                  </tr>

                  <?php } ?>
                </tbody>
              </table>
            </div>

          <ul class="pagination">
              <?php
                  if($toplam > $lim){
                      pagination($s,ceil($toplam/$lim), 'kategoriler.php?s=');
                  }         
              ?>                      
          </ul>

             <?php }else{
               echo "Kategori bulunmuyor";
             } ?>
          </div>
        </div>
      </div>
    </main>
<?php require_once 'inc/alt.php'; ?>