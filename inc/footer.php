
        <!-- Footer -->
        <footer id="footer">
            
            <div class="copyright-content">
                <div class="container">
                    <div class="copyright-text pull-left">Copyright &copy; 2022</div>
                     <div class="copyright-text pull-right">
                        <?php
                     	    $SosyalMedya = $db->prepare("SELECT * FROM sosyalmedya WHERE durum=:d");
                            $SosyalMedya->execute([':d' => 1]);
                            if($SosyalMedya->rowCount()){
                                foreach($SosyalMedya as $item){
                                    ?>
                                        <a href="<?php echo $item["link"]; ?>" target="_blank"><i style="margin-left:10px;" class="fab fa-<?php echo $item['ikon']; ?>"></i></a>
                                    <?php
                                }
                            }
                        ?>
                     </div>
                </div>

            </div>
        </footer>
        <!-- end: Footer -->



    </div>
    <!-- end: Body Inner -->

    <!-- Scroll top -->
    <a id="scrollTop"><i class="icon-chevron-up1"></i><i class="icon-chevron-up1"></i></a>

 <!--Plugins-->
 <script src="js/jquery.js"></script>
 <script src="js/plugins.js"></script>

<!--Template functions-->
 <script src="js/functions.js"></script> 
 <script src="js/ajax.js?v=1234"></script> 
<script src="https://use.fontawesome.com/24eacb6277.js"></script>
</body>

</html>
