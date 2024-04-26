var url = 'http://localhost/projeler/blogscript';

function mesajgönder(){
    var deger = $("#iletisimformu").serialize();
    $.ajax({
        type : "POST",
        url : url+"/inc/mesajgonder.php",
        data : deger,
        success : function(sonuc){
            if($.trim(sonuc) == "bos"){
                alert("Hata! Lütfen tüm alanları eksiksiz bir şekilde doldurunuz.");
            }else if($.trim(sonuc) == "format"){
                alert("Hata! Lütfen e-posta adresinizi kontrol ediniz.");
            }else if($.trim(sonuc) == "hata"){
                alert("Hata! Sistem hatası oluştu.");
            }else if($.trim(sonuc) == "basarili"){
                alert("Tebrikler! Mesajınız alınmıştır en kısa sürede geri dönüş alacaksınız.");
                $("input[name=ad]").val('');
                $("input[name=eposta]").val('');
                $("input[name=konu]").val('');
                $("textarea[name=mesaj]").val('');
            }
        }
    })
}

function yorumyap(){
    var deger = $("#yorumformu").serialize();
    $.ajax({
        type : "POST",
        url : url+"/inc/yorumyap.php",
        data : deger,
        success : function (sonuc){
            if($.trim(sonuc) == "bos"){
                alert("Hata! Lütfen tüm alanları eksiksiz bir şekilde doldurunuz.");
            }else if($.trim(sonuc) == "format"){
                alert("Hata! Lütfen e-posta adresinizi kontrol ediniz.");
            }else if($.trim(sonuc) == "hata"){
                alert("Hata! Sistem hatası oluştu.");
            }else if($.trim(sonuc) == "basarili"){
                alert("Tebrikler! Yorumunuz gönderilmiştir. Yönetici tarafından onaylandıktan sonra paylaşılacaktır.");
                $("input[name=adsoyad]").val('');
                $("input[name=eposta]").val('');
                $("input[name=website]").val('');
                $("textarea[name=yorum]").val('');
            }
        }
    });
}
















function aboneol(){
    var deger = $("#aboneformu").serialize();
    $.ajax({
        type : "POST",
        url : url+"/inc/aboneol.php",
        data : deger,
        success : function (sonuc){
            if($.trim(sonuc) == "bos"){
                alert("Hata! Lütfen tüm alanları eksiksiz bir şekilde doldurunuz.");
            }else if($.trim(sonuc) == "format"){
                alert("Hata! Lütfen e-posta adresinizi kontrol ediniz.");
            }else if($.trim(sonuc) == "hata"){
                alert("Hata! Sistem hatası oluştu.");
            }else if($.trim(sonuc) == "basarili"){
                alert("Tebrikler! Abone olduğunuz için teşekkür ederiz.");
                $("input[name=eposta]").val('');
            }else if($.trim(sonuc) == "var"){
                alert("Hata! Zaten Aboneliğiniz Var!");
            }
        }
    });
}