<?php
    require_once 'inc/header.php';
    require_once 'sistem/fonksiyon.php';

?>
<!-- Header -->
<?php
            require_once 'inc/menu.php';
       ?>
<!-- end: Header -->

<!-- Page Content -->
<section id="page-content" class="sidebar-right">
    <div class="container">
        <div class="row">
            <!-- content -->
            <div class="content col-lg-9">

                <?php
                            $yazisef = strip_tags(trim($_GET['yazi_sef']));
                            $yaziid = strip_tags(trim($_GET['id']));

                            if(!$yaziid || !$yazisef){
                                header('Loaction:' . $arow->site_url);
                            }

                            ## sonraki ve önceki konuları bulmak için yazıldı..
                            $sonrakiid = $yaziid + 1;
                            $oncekiid  = $yaziid - 1;

                            $sonrakikonubul = $db->prepare("SELECT yazi_id,yazi_baslik,yazi_sef FROM yazilar WHERE yazi_id=:id AND yazi_durum=:d");
                            $sonrakikonubul->execute(['id' => $sonrakiid, ':d' => 1]);
                            $sonrakikonurow = $sonrakikonubul->fetch(PDO::FETCH_OBJ);

                            $oncekikonubul = $db->prepare("SELECT yazi_id,yazi_baslik,yazi_sef FROM yazilar WHERE yazi_id=:id AND yazi_durum=:d");
                            $oncekikonubul->execute(['id' => $oncekiid, ':d' => 1]);
                            $oncekikonurow = $oncekikonubul->fetch(PDO::FETCH_OBJ);
                            ## sonraki ve önceki konuları bulmak için yazıldı..


                            $konubul = $db->prepare("SELECT * FROM yazilar INNER JOIN kategoriler ON kategoriler.id = yazilar.yazi_kat_id WHERE yazi_sef=:sef AND yazi_id=:id AND yazi_durum=:d");
                            $konubul->execute([':sef' => $yazisef, ':id' => $yaziid, ':d' => 1]);
                            if($konubul->rowCount()){

                                $row = $konubul->fetch(PDO::FETCH_OBJ);

                                $goruntulenme = @$_COOKIE[$row->yazi_id];
                                if(!$goruntulenme){
                                    $okunmasayisi = $db->prepare("UPDATE yazilar SET yazi_goruntulenme=:g WHERE yazi_id=:id");
                                    $okunmasayisi->execute([':g' => $row->yazi_goruntulenme + 1, ':id' => $yaziid]);
                                    setcookie($row->yazi_id, '1', time() + 3600);
                                }
                                ?>

                <div id="blog" class="single-post">
                    <!-- Post single item-->
                    <div class="post-item">
                        <div class="post-item-wrap">
                            <div class="post-image">
                                <a href="#">
                                    <img alt="<?php echo $row->yazi_baslik; ?>" src="<?php echo $row->yazi_resim; ?>">
                                </a>
                            </div>
                            <div class="post-item-description">
                                <h2><?php echo $row->yazi_baslik; ?></h2>
                                <div class="post-meta">

                                    <span class="post-meta-date"><i
                                            class="fa fa-calendar-o"></i><?php echo date('d.m.Y', strtotime($row->yazi_tarih)); ?></span>
                                    <span class="post-meta-comments"><a href="#"><i
                                                class="fa fa-eye"></i><?php echo $row->yazi_goruntulenme; ?>
                                            Görüntülenme</a></span>
                                    <span class="post-meta-category"><a href="#"><i
                                                class="fa fa-tag"></i><?php echo $row->kat_adi; ?></a></span>
                                    <div class="post-meta-share">

                                        <a target="_blank" class="btn btn-xs btn-slide btn-twitter"
                                            href="https://www.twitter.com/intent/tweet?text=<?php $row->yazi_baslik; ?>&url=<?php echo $arow->site_url; ?>/yazidetay.php?yazi_sef=<?php echo $row->yazi_sef; ?>&id=<?php $row->yazi_id; ?>&via=developerschl"
                                            data-width="100">
                                            <i class="fab fa-twitter"></i>
                                            <span>Twitter</span>
                                        </a>
                                        <a target="_blank" class="btn btn-xs btn-slide btn-instagram" href="#"
                                            data-width="118">
                                            <i class="fab fa-instagram"></i>
                                            <span>Instagram</span>
                                        </a>
                                        <a target="_blank" class="btn btn-xs btn-slide btn-googleplus"
                                            href="mailto:osmantlyhn7334@gmail.com?subject=<?php $row->yazi_baslik; ?>&body=<?php echo $arow->site_url; ?>/yazidetay.php?yazi_sef=<?php echo $row->yazi_sef; ?>&id=<?php $row->yazi_id; ?>"
                                            data-width="80">
                                            <i class="far fa-envelope"></i>
                                            <span>Mail</span>
                                        </a>

                                    </div>
                                </div>
                                <?php echo $row->yazi_icerik;?>
                                <!-- <div class="blockquote">
                                            
                                        </div> -->
                            </div>
                            <div class="post-tags">
                                <?php
                                            $etiketler = explode(",", $row->yazi_etiketler);
                                            $dizi = array();
                                            foreach($etiketler as $etiket){
                                                $dizi[] = '<a title="'.$etiket.'" href="etiketdetay.php?etiket='.sef_link($etiket).'">'.$etiket.'</a>';
                                            }
                                            $Sonuc = implode(' ',$dizi);
                                            echo $Sonuc;
                                        ?>
                            </div>
                            <div class="post-navigation">
                                <?php if($oncekikonubul->rowCount()){ ?>
                                <a href="<?php echo $arow->site_url; ?>/yazidetay.php?yazi_sef=<?php echo $oncekikonurow->yazi_sef; ?>&id=<?php echo $oncekikonurow->yazi_id; ?>"
                                    class="post-prev">
                                    <div class="post-prev-title"><span>Önceki
                                            Post</span><?php echo $oncekikonurow->yazi_baslik; ?></div>
                                </a>
                                <?php }else{ ?>
                                <a href="#" class="post-prev">
                                    <div class="post-prev-title"><span>Önceki Post</span>Önceki konu bulunmuyor</div>
                                </a>
                                <?php } ?>

                                <a href="#" class="post-all">
                                    <i class="icon-grid"> </i>
                                </a>
                                <?php if($sonrakikonubul->rowCount()){ ?>
                                <a href="<?php echo $arow->site_url; ?>/yazidetay.php?yazi_sef=<?php echo $sonrakikonurow->yazi_sef; ?>&id=<?php echo $sonrakikonurow->yazi_id; ?>"
                                    class="post-next">
                                    <div class="post-next-title"><span>Sonraki
                                            Post</span><?php echo $sonrakikonurow->yazi_baslik; ?></div>
                                </a>
                                <?php }else{ ?>
                                <a href="#" class="post-next">
                                    <div class="post-next-title"><span>Sonraki Post</span>Sonraki konu bulunmuyor</div>
                                </a>
                                <?php } ?>

                            </div>

                            <?php
                                    
                                    $yorumlar = $db->prepare("SELECT * FROM yorumlar WHERE yorum_yazi_id=:id AND yorum_durum=:d");
                                    $yorumlar->execute([':id' => $row->yazi_id, ':d' =>1]);
                                    if($yorumlar->rowCount()){

                                        ?>
                            <!-- Comments -->
                            <div class="comments" id="comments">
                                <div class="comment_number">
                                    Yorumlar <span>( <?php echo $yorumlar->rowCount(); ?> )</span>
                                </div>
                                <div class="comment-list">
                                    <!-- Comment -->
                                    <?php foreach($yorumlar as $yor){ ?>

                                        <div class="comment" id="comment-1">
                                        <div class="image"><img alt="<?php echo $row->yazi_baslik; ?>" src="https://st3.depositphotos.com/6672868/14217/v/450/depositphotos_142179970-stock-illustration-user-profile-icon.jpg" class="avatar">
                                        </div>
                                        <div class="text">
                                            <h5 class="name"><a href="<?php echo $yor['yorum_website']; ?>" target="_blank"><?php echo $yor['yorum_isim'];?></a></h5>
                                            <span class="comment_date"><?php echo date('d.m.Y', strtotime($yor['yorum_tarih']));?></span>
                                            <div class="text_holder">
                                                <p><?php echo $yor['yorum_icerik'];?></p>
                                            </div>
                                        </div>
                                    </div><hr>

                                    <?php } ?>
                                    <!-- end: Comment -->
                                </div>
                            </div>

                            <?php

                                    }else{
                                        echo "<div style='width:100%; height:auto; padding-top:12px; padding-bottom:12px; background:#f5f5f5; border-radius:4px; color:#fc4e4c; font-size:16px; padding-left:12px; padding-right:12px;'>Henüz yorum yok.</div>";
                                    }
                                    
                                    ?>
                            <!-- end: Comments -->
                            <div class="respond-form" id="respond">
                                <div class="respond-comment">
                                    Bu yazı hakkında yorum yap</div>
                                <form id="yorumformu" class="form-gray-fields" action="" method="POST"
                                    onsubmit="return false;">
                                    <div class="row">
                                        <div class="col-lg-4">
                                            <div class="form-group">
                                                <label class="upper" for="name">AD - SOYAD</label>
                                                <input class="form-control required" name="adsoyad"
                                                    placeholder="Ad soyad giriniz" id="name" aria-required="true"
                                                    type="text">
                                            </div>
                                        </div>
                                        <div class="col-lg-4">
                                            <div class="form-group">
                                                <label class="upper" for="email">Email</label>
                                                <input class="form-control required email" name="eposta"
                                                    placeholder="Email giriniz" id="email" aria-required="true"
                                                    type="email">
                                            </div>
                                        </div>
                                        <div class="col-lg-4">
                                            <div class="form-group">
                                                <label class="upper" for="website">Website</label>
                                                <input class="form-control website" name="website"
                                                    placeholder="Website giriniz" id="website" aria-required="false"
                                                    type="text">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="form-group">
                                                <label class="upper" for="comment">Yorum</label>
                                                <textarea class="form-control required" name="yorum" rows="9"
                                                    placeholder="Yorum giriniz" id="comment"
                                                    aria-required="true"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="form-group text-center">
                                                <input type="hidden" value="<?php echo $row->yazi_id; ?>"
                                                    name="yaziid" />
                                                <button class="btn" type="submit" onclick="yorumyap();">Yorum
                                                    payLAŞ</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <!-- end: Post single item-->
                </div>


                <?php
                            }else{
                                header("Location:" . $arow->site_url);
                            }
                        ?>

            </div>
            <!-- end: content -->

            <!-- Sidebar-->
            <?php  require_once 'inc/sidebar.php' ?>
            <!-- end: Sidebar-->
        </div>
    </div>
</section>
<!-- end: Page Content -->
<!-- Footer -->
<?php
            require_once 'inc/footer.php';
        ?>