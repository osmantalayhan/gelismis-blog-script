<?php require_once 'inc/ust.php'; ?>
    <!-- Sidebar menu-->
<?php require_once 'inc/sol.php'; ?>

    <main class="app-content">
      <div class="app-title">
        <div>
          <h1><i class="fa fa-th-list"></i> Sosyal Medya</h1>
          <p>Sosyal Medya Listesi</p>
        </div>
        <ul class="app-breadcrumb breadcrumb">
          <li class="breadcrumb-item"><i class="fa fa-home fa-lg"></i></li>
          <li class="breadcrumb-item">Sosyal Medya</li>
          <li class="breadcrumb-item active"><a href="#">Sosyal Medya Listesi</a></li>
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

              $toplam = say('sosyalmedya');
              $lim = 10;
              $goster = $s * $lim - $lim;

              $sorgu = $db->prepare("SELECT * FROM sosyalmedya ORDER BY id DESC LIMIT :goster,:lim");
              $sorgu->bindValue(':goster',(int) $goster, PDO::PARAM_INT);
              $sorgu->bindValue(':lim',(int) $lim, PDO::PARAM_INT);
              $sorgu->execute();

              if($s > ceil($toplam/$lim)){
                $s = 1;
              }

              if($sorgu->rowCount()){
            ?>
            <h3 class="tile-title">Sosyal Medya Listesi ( <?php echo $toplam; ?> )</h3>
            <div class="table-responsive table-hover">
              <table class="table">
                <thead>
                  <tr>
                    <th>#ID</th>
                    <th>İKON</th>
                    <th>LİNK</th>
                    <th>DURUM</th>
                    <th>İŞLEMLER</th>
                  </tr>
                </thead>
                <tbody>
                  <?php
                    foreach($sorgu as $row){ 
                  ?>

                  <tr>
                    <td><?php echo $row['id']; ?></td>
                    <td><i class="fa fa-<?php echo $row['ikon']; ?>"></i></td>
                    <td><?php echo $row['link']; ?></td>
                    <td><?php echo $row['durum'] == 1 ? '<div style="color:green; font-weight:bold;">Aktif</div>' : '<div style="color:red; font-weight:bold;">Pasif</div>'; ?></td>
                    <td><a href="<?php echo $yonetim."/islemler.php?islem=sosyalmedyaduzenle&id=".$row['id']; ?>"><i class="fa fa-edit"></i></a> | <a onclick="return confirm('Onaylıyor musunuz ?');" href="<?php echo $yonetim."/islemler.php?islem=sosyalmedyasil&id=".$row['id']; ?>"><i class="fa fa-eraser"></i></a></td>
                  </tr>

                  <?php } ?>
                </tbody>
              </table>
            </div>

          <ul class="pagination">
              <?php
                  if($toplam > $lim){
                      pagination($s,ceil($toplam/$lim), 'sosyalmedya.php?s=');
                  }         
              ?>                      
          </ul>

             <?php }else{
               echo "Sosyal medya hesabı bulunmuyor";
             } ?>
          </div>
        </div>
      </div>
    </main>
<?php require_once 'inc/alt.php'; ?>