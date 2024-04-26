-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Anamakine: 127.0.0.1
-- Üretim Zamanı: 26 Nis 2024, 17:30:59
-- Sunucu sürümü: 10.4.24-MariaDB
-- PHP Sürümü: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `blogscript`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `aboneler`
--

CREATE TABLE `aboneler` (
  `id` int(11) NOT NULL,
  `abone_mail` varchar(200) NOT NULL,
  `abone_tarih` timestamp NOT NULL DEFAULT current_timestamp(),
  `abone_ip` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `aboneler`
--

INSERT INTO `aboneler` (`id`, `abone_mail`, `abone_tarih`, `abone_ip`) VALUES
(1, 'osmantlyhn7334@gmail.com', '2022-07-27 15:38:38', '::1'),
(5, 'osman@osman.com', '2023-10-03 19:01:05', '::1');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `ayarlar`
--

CREATE TABLE `ayarlar` (
  `id` int(11) NOT NULL,
  `site_url` varchar(200) NOT NULL,
  `site_baslik` varchar(200) NOT NULL,
  `site_keyw` varchar(260) NOT NULL,
  `site_desc` varchar(260) NOT NULL,
  `site_harita` varchar(300) NOT NULL,
  `site_mail` varchar(250) NOT NULL,
  `site_logo` varchar(250) NOT NULL,
  `site_favicon` varchar(200) NOT NULL,
  `google_dogrulama_kodu` varchar(200) NOT NULL,
  `yandex_dogrulama_kodu` varchar(200) NOT NULL,
  `bing_dogrulama_kodu` varchar(200) NOT NULL,
  `analiytcs_kodu` mediumtext NOT NULL,
  `site_durum` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `ayarlar`
--

INSERT INTO `ayarlar` (`id`, `site_url`, `site_baslik`, `site_keyw`, `site_desc`, `site_harita`, `site_mail`, `site_logo`, `site_favicon`, `google_dogrulama_kodu`, `yandex_dogrulama_kodu`, `bing_dogrulama_kodu`, `analiytcs_kodu`, `site_durum`) VALUES
(1, 'http://localhost/projeler/blogscript', 'Osman Talayhan | Blog', 'Osman Talayhan | Blog', 'Osman Talayhan | Blog', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d752.7328999264744!2d28.777094108111253!3d41.00487029095547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x635a5ddd1489fef4!2zNDHCsDAwJzE3LjkiTiAyOMKwNDYnMzYuMSJF!5e0!3m2!1str!2str!4v165', 'osmantlyhn7334@gmail.com', 'logo.png', 'logo.png', '1', '2', '3', '4', 1);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `kategoriler`
--

CREATE TABLE `kategoriler` (
  `id` int(11) NOT NULL,
  `kat_adi` varchar(200) NOT NULL,
  `kat_sef` varchar(200) NOT NULL,
  `kat_keyw` varchar(260) NOT NULL,
  `kat_desc` varchar(260) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `kategoriler`
--

INSERT INTO `kategoriler` (`id`, `kat_adi`, `kat_sef`, `kat_keyw`, `kat_desc`) VALUES
(1, 'Php', 'php', 'php dersleri, pdo dersleri', 'php dersleri, pdo dersleri'),
(2, 'Html', 'html', 'html dersleri, html eğitimleri', 'html dersleri, html eğitimleri'),
(3, 'JS', 'javascript', 'javascript dersleri, javascript eğitimleri', 'javascript dersleri, javascript eğitimleri'),
(4, 'React', 'react', 'react dersleri, react eğitimleri', 'react dersleri, react eğitimleri'),
(5, 'Css', 'css', 'css dersleri', 'css dersleri'),
(11, 'Nodejs', 'nodejs', 'Nodejs', 'nodejs dersleri');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `mesajlar`
--

CREATE TABLE `mesajlar` (
  `id` int(11) NOT NULL,
  `isim` varchar(200) NOT NULL,
  `konu` varchar(255) NOT NULL,
  `eposta` varchar(200) NOT NULL,
  `mesaj` text NOT NULL,
  `tarih` timestamp NOT NULL DEFAULT current_timestamp(),
  `durum` tinyint(1) NOT NULL DEFAULT 2,
  `ip` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `mesajlar`
--

INSERT INTO `mesajlar` (`id`, `isim`, `konu`, `eposta`, `mesaj`, `tarih`, `durum`, `ip`) VALUES
(18, 'Kullanıcı', 'Deneme', 'deneme@gmail.com', 'Scriptiniz harika çalışıyor, Tebrikler', '2024-04-26 14:25:16', 2, '::1');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `sosyalmedya`
--

CREATE TABLE `sosyalmedya` (
  `id` int(11) NOT NULL,
  `ikon` varchar(200) NOT NULL,
  `link` varchar(200) NOT NULL,
  `durum` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `sosyalmedya`
--

INSERT INTO `sosyalmedya` (`id`, `ikon`, `link`, `durum`) VALUES
(1, 'instagram', 'https://www.instagram.com', 1),
(2, 'facebook', 'https://www.facebook.com', 1),
(3, 'youtube', 'https://www.youtube.com', 1),
(4, 'twitter', 'https://www.twitter.com', 1),
(5, 'github', 'https://www.github.com', 1),
(6, 'linkedin', 'https://www.linkedin.com', 1),
(8, 'pinterest', 'https://www.pinterest.com', 1);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `yazilar`
--

CREATE TABLE `yazilar` (
  `yazi_id` int(11) NOT NULL,
  `yazi_kat_id` int(11) NOT NULL,
  `yazi_baslik` varchar(250) NOT NULL,
  `yazi_sef` varchar(250) NOT NULL,
  `yazi_resim` varchar(200) NOT NULL,
  `yazi_icerik` text NOT NULL,
  `yazi_etiketler` varchar(250) NOT NULL,
  `yazi_sef_etiketler` varchar(250) NOT NULL,
  `yazi_tarih` timestamp NOT NULL DEFAULT current_timestamp(),
  `yazi_durum` tinyint(1) NOT NULL,
  `yazi_goruntulenme` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `yazilar`
--

INSERT INTO `yazilar` (`yazi_id`, `yazi_kat_id`, `yazi_baslik`, `yazi_sef`, `yazi_resim`, `yazi_icerik`, `yazi_etiketler`, `yazi_sef_etiketler`, `yazi_tarih`, `yazi_durum`, `yazi_goruntulenme`) VALUES
(21, 3, 'Javascript concat() Metodu', 'javascript-concat-metodi', 'https://www.tremplin-numerique.org/wp-content/uploads/2021/06/Quoi-de-neuf-dans-la-norme-ES2021-pour-JavaScript-%E2%80%93.jpg', 'İki ve ya daha fazla diziyi birleştirmek için kullanılır.\r\nBu metod, varolan diziyi değiştirmez. Birleştirilmiş yeni bir dizi döndürür.\r\nAşağıdaki kod, üç diziyi birleştirir. Bu şekilde 2 veya daha fazla diziyi birleştirebilirsiniz.\r\nMetod parametre olarak sadece dizi değil bir değerde alabilir. Aşağıdaki kod, bir değer ve dizilerin birleşimini gösterir.', 'javascript,concat', 'javascript,concat', '2022-07-27 11:31:18', 1, 9),
(22, 1, 'PHP\'de Değişkenler', 'phpde-değişkenler', 'https://www.mertbuldur.com/public/images/article/php-degiskenler/php-degiskenler-7472.png', 'Değişkenler bir veriyi belli bir türde depolayan ve istediğimiz herhangi bir yerde yazdırmamızı sağlayan işlevlerdir. Ve değişkenler tanımlanırken, belli kurallara uyulması gerekir. Bu kurallar şöyledir;\r\n\r\n$ işareti ile tanımlanırlar. Örn: $prototurk\r\nHarf ya da _ karakteri ile başlarlar. Sayı ile başlayamazlar. Örn: $123test geçersiz bir tanımdır.\r\nTürkçe karakterler içerebilirler. Örn: $prototürk geçerli bir tanımdır. Bazı sitelerde bunun aksini idda edenlere aldırmayın, php\'nin kendi resmi sitesi php.net\'te örneklerin tamamı türkçe olarak verilmektedir. Yinede biz ingilizce yazmaya özen gösterelim orası ayrı :)\r\nBüyük-küçük harfe (case-sensetive) duyarlıdır. Yani $Prototurk ile $prototurk değişkenleri birbirinden farklı tanımlardır.\r\nDeğişkenleri tanımlamak için belli başlı kuralları anladığımıza göre birde sizlere ilk operatörünüzü tanıştırma vakti geldi :)', 'php,değişken', 'php,degisken', '2022-07-27 11:33:25', 1, 11),
(23, 5, 'CSS Nitelik Seçicisi', 'css-nitelik-secicisi', 'https://i0.wp.com/www.ctrldelete.net/wp-content/uploads/2020/05/CSS.jpg?resize=800%2C445&ssl=1', 'Nitelik belirtilen değerle başlayan etiketleri seçer. Ancak burada önemli olan, belirtilen değerin tüm kelimeyle eşleşiyor olmasıdır. Ya tüm kelimeyle ya da tire işareti ile ayrılmış kelimenin başlangıcı ile eşleşiyor olması gerekir. Örneğin html yapımız şöyle olsun;Gördüğünüz gibi son etiketi seçmedi zira box değil box-lg ifadesi var.Sonuç olarak en alttaki hariç diğerlerini seçmiş olacaktık. Çünkü en alttaki başlangıç olarak tüm kelimeyi baz aldığımızda box değil boxlg olduğu için. Ayrıca boşluk ile ayrılmış nitelik değerlerinde de bu seçici işe yaramaz. Yani başlangıçı seçtiğimiz değer bile olsa boşluk varsa o etiketi seçmeyecektir.Yukarıdaki seçicinin aksine belirtilen değer ile başlayan tüm etiketleri seçmek için kullanılır. Boşluk tire işareti vs. hiçbirine bakmaz. Tek baktığı, niteliğin değeri belirlenen değerle başlıyor mu başlamıyor mu? Yine aynı yapıda bir html yapımız olsaydı;', 'css,seçici', 'css,secici', '2022-07-27 11:36:51', 1, 11),
(24, 4, 'React \'Router\' yapısı 2!', 'react-router-yapısı2', 'https://i.ytimg.com/vi/Hua8Rq6oGoM/maxresdefault.jpg', 'Değişkenler bir veriyi belli bir türde depolayan ve istediğimiz herhangi bir yerde yazdırmamızı sağlayan işlevlerdir. Ve değişkenler tanımlanırken, belli kurallara uyulması gerekir. Bu kurallar şöyledir;\r\n$ işareti ile tanımlanırlar. Örn: $prototurk\r\nHarf ya da _ karakteri ile başlarlar. Sayı ile başlayamazlar. Örn: $123test geçersiz bir tanımdır.\r\nTürkçe karakterler içerebilirler. Örn: $prototürk geçerli bir tanımdır. Bazı sitelerde bunun aksini idda edenlere aldırmayın, php\'nin kendi resmi sitesi php.net\'te örneklerin tamamı türkçe olarak verilmektedir. Yinede biz ingilizce yazmaya özen gösterelim orası ayrı :)\r\nBüyük-küçük harfe (case-sensetive) duyarlıdır. Yani $Prototurk ile $prototurk değişkenleri birbirinden farklı tanımlardır.\r\nDeğişkenleri tanımlamak için belli başlı kuralları anladığımıza göre birde sizlere ilk operatörünüzü tanıştırma vakti geldi :)', 'react,router', 'react,router', '2022-07-27 11:33:25', 1, 11),
(25, 4, 'React Context', 'react-context', 'https://i.ytimg.com/vi/us0HlRThOi0/maxresdefault.jpg', 'It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem IpsumLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum', 'react,context', 'react,context', '2022-07-27 12:52:36', 1, 12),
(26, 4, 'React Query', 'react-query', 'https://i.ytimg.com/vi/Z37JtB78mNo/maxresdefault.jpg', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 'react,query', 'react,query', '2022-07-27 15:47:14', 1, 11),
(27, 6, 'Laravel Validation', 'laravel-validation', 'https://yazilimduragi.com/wp-content/uploads/2020/11/laravel-8.png', 'laravel-validationlaravel-validationlaravel-validationlaravel-validationlaravel laravel-validationlaravel-validationlaravel-validationlaravel-validationlaravel-validation-validationlaravel-validati laravel-validationonlaravel-validationlaravel-validationlaravel-validationlaravel-validationlaravel-validationlaravel-validationlaravel-validationlaralaralaravel-validationlaravel-validationlaravel-validationlaravel-validationlaravel-validationlaravel-v\r\nalidationlaravel-validationlaravel-validationlaravel-validationlaravel-validationlaravel-validationlaravel-validationlaravel-validationlaravel-validationlaravel-validationlaravel-validationvel-validationvel-validationlaravel-validation', 'laravel,validation', 'laravel,validation', '2022-07-29 12:55:45', 2, 1);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `yoneticiler`
--

CREATE TABLE `yoneticiler` (
  `id` int(11) NOT NULL,
  `kadi` varchar(200) NOT NULL,
  `eposta` varchar(200) NOT NULL,
  `sifre` varchar(200) NOT NULL,
  `sonip` varchar(200) NOT NULL,
  `sontarih` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `yoneticiler`
--

INSERT INTO `yoneticiler` (`id`, `kadi`, `eposta`, `sifre`, `sonip`, `sontarih`) VALUES
(1, 'Osman Talayhan', 'osman@osman.com', 'adcd7048512e64b48da55b027577886ee5a36350', '::1', '2022-08-10 18:38:10'),
(2, 'Hüseyin Talayhan', 'huseyin@huseyin.com', 'adcd7048512e64b48da55b027577886ee5a36350', '::1', '2022-07-28 15:42:00');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `yorumlar`
--

CREATE TABLE `yorumlar` (
  `id` int(11) NOT NULL,
  `yorum_yazi_id` int(11) NOT NULL,
  `yorum_isim` varchar(200) NOT NULL,
  `yorum_eposta` varchar(200) NOT NULL,
  `yorum_icerik` text NOT NULL,
  `yorum_website` varchar(250) DEFAULT NULL,
  `yorum_tarih` timestamp NOT NULL DEFAULT current_timestamp(),
  `yorum_durum` tinyint(1) NOT NULL DEFAULT 2,
  `yorum_ip` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `yorumlar`
--

INSERT INTO `yorumlar` (`id`, `yorum_yazi_id`, `yorum_isim`, `yorum_eposta`, `yorum_icerik`, `yorum_website`, `yorum_tarih`, `yorum_durum`, `yorum_ip`) VALUES
(10, 26, 'Kullanıcı', 'deneme@gmail.com', 'yararlı bir makale.', '', '2022-07-27 15:49:47', 1, '::1'),
(13, 23, 'Kullanıcı', 'deneme@gmail.com', 'yararlı bir makale.', '', '2022-07-31 12:11:10', 1, '::1'),
(14, 25, 'Kullanıcı', 'deneme@gmail.com', 'yararlı bir makale.', '', '2022-08-10 15:35:04', 1, '::1'),
(15, 23, 'Kullanıcı', 'deneme@gmail.com', 'yararlı bir makale.', '', '2022-08-12 17:04:54', 2, '::1'),
(16, 22, 'Kullanıcı', 'deneme@gmail.com', 'yararlı bir makale.', '', '2023-05-17 14:30:38', 2, '::1'),
(17, 23, 'Kullanıcı', 'deneme@gmail.com', 'yararlı bir makale.', 'https://www.developerschools.net', '2023-10-03 18:46:23', 1, '::1'),
(18, 25, 'Kullanıcı2', 'deneme@gmail.com', 'yararlı bir makale. Tebrikler', '', '2024-04-26 14:23:37', 1, '::1');

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `aboneler`
--
ALTER TABLE `aboneler`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `ayarlar`
--
ALTER TABLE `ayarlar`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `kategoriler`
--
ALTER TABLE `kategoriler`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `mesajlar`
--
ALTER TABLE `mesajlar`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `sosyalmedya`
--
ALTER TABLE `sosyalmedya`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `yazilar`
--
ALTER TABLE `yazilar`
  ADD PRIMARY KEY (`yazi_id`);

--
-- Tablo için indeksler `yoneticiler`
--
ALTER TABLE `yoneticiler`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `yorumlar`
--
ALTER TABLE `yorumlar`
  ADD PRIMARY KEY (`id`);

--
-- Dökümü yapılmış tablolar için AUTO_INCREMENT değeri
--

--
-- Tablo için AUTO_INCREMENT değeri `aboneler`
--
ALTER TABLE `aboneler`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Tablo için AUTO_INCREMENT değeri `ayarlar`
--
ALTER TABLE `ayarlar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Tablo için AUTO_INCREMENT değeri `kategoriler`
--
ALTER TABLE `kategoriler`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Tablo için AUTO_INCREMENT değeri `mesajlar`
--
ALTER TABLE `mesajlar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Tablo için AUTO_INCREMENT değeri `sosyalmedya`
--
ALTER TABLE `sosyalmedya`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Tablo için AUTO_INCREMENT değeri `yazilar`
--
ALTER TABLE `yazilar`
  MODIFY `yazi_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- Tablo için AUTO_INCREMENT değeri `yoneticiler`
--
ALTER TABLE `yoneticiler`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Tablo için AUTO_INCREMENT değeri `yorumlar`
--
ALTER TABLE `yorumlar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
