Add-Type -AssemblyName System.Drawing

$src = "C:\Users\LENOVO\Downloads\uncoded-hub\public\client\demo\assets\adflowerpoint\poster_square.jpg"
$destDir = "C:\Users\LENOVO\Downloads\uncoded-hub\public\client\demo\assets\adflowerpoint"

$img = [System.Drawing.Image]::FromFile($src)
$w = $img.Width
$h = $img.Height

$bmp = New-Object System.Drawing.Bitmap($img)

# The 5 product arched cards are located roughly between 25% and 60% of the poster height
# In the 458px width:
# 5 items across 458px is approx 90px each
$cardY = [int]($h * 0.28)
$cardH = [int]($h * 0.32)

Write-Output "Card Y: $cardY, Card H: $cardH"

# Card 1: Haar (x approx 12 to 96)
$r1 = New-Object System.Drawing.Rectangle(10, $cardY, 84, $cardH)
$c1 = $bmp.Clone($r1, $bmp.PixelFormat)
$c1.Save("$destDir\prod_haar.jpg", [System.Drawing.Imaging.ImageFormat]::Jpeg)
$c1.Dispose()

# Card 2: Latkan (x approx 98 to 184)
$r2 = New-Object System.Drawing.Rectangle(98, $cardY, 84, $cardH)
$c2 = $bmp.Clone($r2, $bmp.PixelFormat)
$c2.Save("$destDir\prod_latkan.jpg", [System.Drawing.Imaging.ImageFormat]::Jpeg)
$c2.Dispose()

# Card 3: Gajara (x approx 186 to 272)
$r3 = New-Object System.Drawing.Rectangle(186, $cardY, 84, $cardH)
$c3 = $bmp.Clone($r3, $bmp.PixelFormat)
$c3.Save("$destDir\prod_gajara.jpg", [System.Drawing.Imaging.ImageFormat]::Jpeg)
$c3.Dispose()

# Card 4: Haldi Set (x approx 274 to 360)
$r4 = New-Object System.Drawing.Rectangle(274, $cardY, 84, $cardH)
$c4 = $bmp.Clone($r4, $bmp.PixelFormat)
$c4.Save("$destDir\prod_haldiset.jpg", [System.Drawing.Imaging.ImageFormat]::Jpeg)
$c4.Dispose()

# Card 5: Toran (x approx 362 to 448)
$r5 = New-Object System.Drawing.Rectangle(362, $cardY, 84, $cardH)
$c5 = $bmp.Clone($r5, $bmp.PixelFormat)
$c5.Save("$destDir\prod_toran.jpg", [System.Drawing.Imaging.ImageFormat]::Jpeg)
$c5.Dispose()

# Also crop the logo/banner from top of poster
$rLogo = New-Object System.Drawing.Rectangle(100, 30, 258, 140)
$cLogo = $bmp.Clone($rLogo, $bmp.PixelFormat)
$cLogo.Save("$destDir\brand_logo.jpg", [System.Drawing.Imaging.ImageFormat]::Jpeg)
$cLogo.Dispose()

Write-Output "Cropped 5 product cards + logo!"

$bmp.Dispose()
$img.Dispose()
