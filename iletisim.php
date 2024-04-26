<?php
    require_once 'inc/header.php';
?>


    <!-- Header -->
   <?php require_once 'inc/menu.php'; ?>
    <!-- end: Header -->

    <!-- Page title -->
    <section id="page-title" data-parallax-image="images/pattern-icons/5.png">
        <div class="container">
            <div class="page-title">
                <h1>Bana Ulaş</h1>
                <span style="color: #ddd;">Benimle iletişime geçmek için aşağıdaki formu doldur!</span>
            </div>
            <div class="breadcrumb" style="margin-top: 16px;">
                <ul>
                    <li><a href="#">Anasayfa</a> </li>
                    <li class="active"><a href="#">İletişim</a> </li>
                </ul>
            </div>
        </div>
    </section>
    <!-- end: Page title -->

    <!-- CONTENT -->
    <section>
        <div class="container">
            <div class="row">
                <div class="col-lg-6">
                    <h3 class="text-uppercase">İLETİŞİME GEÇİN</h3>
                    <p>Lütfen iletişim formunu eksiksiz bir şekilde doldurun. Önerileriniz ve sorunlarınız için <span style="color: #0333e8;"><?php echo $arow->site_mail; ?></span> mail adresinden bana ulaşın.</p>
                    <div class="m-t-30">
                        <form id="iletisimformu" onsubmit="return false;" class="widget-contact-form" action="" role="form" method="post">
                            <div class="row">
                                <div class="form-group col-md-6">
                                    <label for="name">İSİM</label>
                                    <input type="text" aria-required="true" name="ad" class="form-control required name" placeholder="Adınızı giriniz">
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="email">Email</label>
                                    <input type="email" aria-required="true" name="eposta" class="form-control required email" placeholder="Email adresiniz">
                                </div>
                            </div>
                            <div class="row">
                                <div class="form-group col-md-12">
                                    <label for="subject">KONU</label>
                                    <input type="text" name="konu" class="form-control required" placeholder="Konu giriniz..">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="message">Mesaj</label>
                                <textarea type="text" name="mesaj" rows="5" class="form-control required" placeholder="Mesajınızı belirtin"></textarea>
                            </div>

                            <div class="form-group">
                                <script src="https://www.google.com/recaptcha/api.js"></script>
                                <div class="g-recaptcha" data-sitekey="6LddCxAUAAAAAKOg0-U6IprqOZ7vTfiMNSyQT2-M"></div>
                            </div>


                            <button onclick="mesajgönder();" class="btn" type="submit" id="form-submit"><i class="fa fa-paper-plane"></i>&nbsp;Mesaj Gönder</button>
                        </form>

                    </div>
                </div>
                <div class="col-lg-6">
                    <h3 class="text-uppercase">Neredeyim?</h3>
                  
                
                    <!-- Google map sensor -->
                    <script type="text/javascript" src="//maps.googleapis.com/maps/api/js?v=3.exp"></script>
                    <div class="map m-t-30" data-map-address="Melburne, Australia" data-map-zoom="10" data-map-icon="images/markers/marker2.png" data-map-type="ROADMAP"></div>
                    <!-- Google map sensor -->

                </div>
            </div>
        </div>
    </section>
    <!-- end: CONTENT -->

    <!-- Footer -->
    <?php require_once 'inc/footer.php'; ?>
    <!-- end: Footer -->

