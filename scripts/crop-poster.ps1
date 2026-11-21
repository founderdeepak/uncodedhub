Add-Type -AssemblyName System.Drawing

$posterPath = "C:\Users\LENOVO\Downloads\uncoded-hub\public\client\demo\assets\adflowerpoint\banner_poster.jpg"
$destDir = "C:\Users\LENOVO\Downloads\uncoded-hub\public\client\demo\assets\adflowerpoint"

$img = [System.Drawing.Image]::FromFile($posterPath)
$w = $img.Width
$h = $img.Height
Write-Output "Image Dimensions: $w x $h"

# In the screenshot, the poster has a black border on top and bottom (it is a mobile screen capture of a square poster).
# Let's inspect where the poster itself lies in this image.
$bmp = New-Object System.Drawing.Bitmap($img)

# Let's find vertical start and end of non-black content
$top = 0
for ($y = 0; $y -lt $h; $y += 5) {
    $pixel = $bmp.GetPixel([int]($w/2), $y)
    if ($pixel.R -gt 20 -or $pixel.G -gt 20 -or $pixel.B -gt 20) {
        $top = $y
        break
    }
}

$bottom = $h - 1
for ($y = $h - 1; $y -ge 0; $y -= 5) {
    $pixel = $bmp.GetPixel([int]($w/2), $y)
    if ($pixel.R -gt 20 -or $pixel.G -gt 20 -or $pixel.B -gt 20) {
        $bottom = $y
        break
    }
}

Write-Output "Poster vertical range: $top to $bottom (Height: $($bottom - $top))"

# Let's crop the actual square poster
$posterHeight = $bottom - $top
$rectPoster = New-Object System.Drawing.Rectangle(0, $top, $w, $posterHeight)
$croppedPoster = $bmp.Clone($rectPoster, $bmp.PixelFormat)
$croppedPoster.Save("$destDir\poster_square.jpg", [System.Drawing.Imaging.ImageFormat]::Jpeg)
$croppedPoster.Dispose()

Write-Output "Saved poster_square.jpg"

$bmp.Dispose()
$img.Dispose()
