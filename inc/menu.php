    <header id="header">
      <div class="header-inner">
          <div class="container">
              <!--Logo-->
              <div id="logo">
                  <a href="<?php echo $arow->site_url; ?>" class="logo" data-src-dark="images/<?php echo $arow->site_logo; ?>"> <img src="images/<?php echo $arow->site_logo; ?>" alt="Polo Logo"> </a>
              </div>
              <!--End: Logo-->

              <!-- Search -->
              <div id="search">
                  <div id="search-logo"><img src="images/logo.png" alt="Polo Logo"></div>
                  <button id="btn-search-close" class="btn-search-close" aria-label="Close search form"><i
                          class="icon-x"></i></button>
                  <form class="search-form" action="ara.php" method="get">
                      <input class="form-control" name="q" type="search" placeholder="Konu ara..." autocomplete="off"
                          autocorrect="off" autocapitalize="off" spellcheck="false" />
                      <span class="text-muted">Yazmaya başla & Kapatmak için "Enter" veya "ESC" tuşuna basın</span>
                  </form>

                  <div class="search-suggestion-wrapper">


                     <?php
                     $populer = $db->prepare("SELECT * FROM yazilar WHERE yazi_durum=:d ORDER BY yazi_goruntulenme DESC LIMIT :lim");
                     $populer->bindValue(':d',(int) 1, PDO::PARAM_INT);
                     $populer->bindValue(':lim',(int) 3, PDO::PARAM_INT);
                     $populer->execute();
                     if($populer->rowCount()){
                         foreach($populer as $item){

                            ?>

                            
                        <div class="search-suggestion">
                          <h3><?php echo $item['yazi_baslik']; ?></h3>
                          <p><?php echo mb_substr($item['yazi_icerik'], 0, 100, 'utf8'); ?>...</p>
                          <p><a href="<?php echo $arow->site_url; ?>/yazidetay.php?yazi_sef=<?php echo $item['yazi_sef']; ?>&id=<?php echo $item['yazi_id']; ?>">Devamını oku</a></p>
                       
                      </div>

                            <?php

                         }
                        }
                     ?>


                      


                  </div>
              </div>
              <!-- end: search -->


               <!--Header Extras-->
               <div class="header-extras">
                        <ul>
                           <li>
                                <!--search icon-->
                                <a id="btn-search" href="#"> <i class="icon-search1"></i></a>
                                <!--end: search icon-->
                            </li>
                        </ul>
                    </div>
                    <!--end: Header Extras-->



              <!--Navigation-->
              <div id="mainMenu">
                  <div class="container">
                      <nav>
                          <ul>
                              <li>
                                  <a href="<?php echo $arow->site_url; ?>">Anasayfa</a>
                                </li>
                                <li class="dropdown">
                                  <a href="#">Kategoriler</a>
                                  <ul class="dropdown-menu">

                                      <?php
                                        $Kategoriler = $db->prepare("SELECT * FROM kategoriler");
                                        $Kategoriler->execute();
                                        if($Kategoriler->rowCount()){
                                            foreach($Kategoriler as $row){
                                                $yazilaribul = $db->prepare("SELECT yazi_kat_id,yazi_durum FROM yazilar WHERE yazi_kat_id=:id");
                                                $yazilaribul->execute([':id' => $row['id']]);
                                                echo '<li><a href="'. $arow->site_url .'/kategoriler.php?kat_sef='. $row["kat_sef"] .'">'. $row["kat_adi"] . '<span class="badge badge-primary">' . $yazilaribul->rowCount() . '</span></a></li>';
                                            }
                                        }
                                      ?>
                                    
                                  </ul>
                              </li>
                              </li>
                              <li>
                                  <a href="<?php echo $arow->site_url . '/iletisim.php'; ?>"></i>iletişim</a>
                              </li>
                          </ul>
                      </nav>
                  </div>
              </div>
              <!--END: NAVIGATION-->
          </div>
      </div>
  </header>
  <!-- end: Header -->
  
  
  
  
  
  
  
  
  
<!--   
  
                    <div class="header-extras">
                        <ul>
                           <li>
                                <a id="btn-search" href="#"> <i class="icon-search1"></i></a>
                            </li>
                            <li class="d-none d-sm-block">
                                <div id="shopping-cart" class="p-dropdown">
                                    <a href="shop-cart.html"><span class="shopping-cart-items">8</span><i
                                            class="icon-shopping-cart1"></i></a>
                                    <div class="p-dropdown-content ">
                                        <div class="widget-mycart">
                                            <h4>My Cart</h4>
                                            <div class="cart-item">
                                                <div class="cart-image"> <a href="#"><img
                                                            src="images/shop/products/10.jpg"></a></div>
                                                <div class="cart-product-meta">
                                                    <a href="#">Bolt Sweatshirt</a>
                                                    <span>3 x 28$</span>
                                                </div>
                                                <div class="cart-item-remove">
                                                    <a href="#"><i class="icon-x"></i></a></div>
                                            </div>
                                            <div class="cart-item">
                                                <div class="cart-image"> <a href="#"><img
                                                            src="images/shop/products/11.jpg"></a></div>
                                                <div class="cart-product-meta">
                                                    <a href="#">Yellow Sweatshirt</a>
                                                    <span>1 x 18$</span>
                                                </div>
                                                <div class="cart-item-remove">
                                                    <a href="#"><i class="icon-x"></i></a></div>
                                            </div>
                                            <hr>
                                            <div class="cart-total">
                                                <div class="cart-total-labels">
                                                    <span>Subtotal</span>
                                                    <span>Taxes</span>
                                                    <span><strong>Total</strong></span>
                                                </div>
                                                <div class="cart-total-prices">
                                                    <span>320$</span>
                                                    <span>8%</span>
                                                    <span><strong>385$</strong></span>
                                                </div>

                                            </div>
                                            <div class="cart-buttons text-right">
                                                <button class="btn btn-xs">Checkout</button>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    end: Header Extras-->
                  