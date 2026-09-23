$ErrorActionPreference = 'Stop'

$sourceRoot = Join-Path $PSScriptRoot '..\public\audio\listening\official'
$outputRoot = Join-Path $PSScriptRoot '..\public\audio\listening\questions'
New-Item -ItemType Directory -Force $outputRoot | Out-Null

$segments = @(
  # Cambridge Starters: first complete play-through only; intro and example removed.
  @{ Source = 'ac-test1-part3.mp3'; Output = 'ac-t1-1.mp3'; Start = 40.10; End = 59.65 },
  @{ Source = 'ac-test1-part3.mp3'; Output = 'ac-t1-2.mp3'; Start = 64.60; End = 81.65 },
  @{ Source = 'ac-test1-part3.mp3'; Output = 'ac-t1-3.mp3'; Start = 87.00; End = 105.45 },
  @{ Source = 'ac-test1-part3.mp3'; Output = 'ac-t1-4.mp3'; Start = 110.65; End = 133.20 },
  @{ Source = 'ac-test1-part3.mp3'; Output = 'ac-t1-5.mp3'; Start = 138.65; End = 159.45 },
  @{ Source = 'ac-test2-part3.mp3'; Output = 'ac-t2-1.mp3'; Start = 47.50; End = 70.25 },
  @{ Source = 'ac-test2-part3.mp3'; Output = 'ac-t2-2.mp3'; Start = 75.35; End = 95.75 },
  @{ Source = 'ac-test2-part3.mp3'; Output = 'ac-t2-3.mp3'; Start = 100.85; End = 121.30 },
  @{ Source = 'ac-test2-part3.mp3'; Output = 'ac-t2-4.mp3'; Start = 126.50; End = 150.05 },
  @{ Source = 'ac-test2-part3.mp3'; Output = 'ac-t2-5.mp3'; Start = 155.45; End = 176.00 },

  # Cambridge Movers: first complete play-through only; intro and example removed.
  @{ Source = 'df-test1-part4.mp3'; Output = 'df-t1-1.mp3'; Start = 46.00; End = 69.80 },
  @{ Source = 'df-test1-part4.mp3'; Output = 'df-t1-2.mp3'; Start = 73.20; End = 94.90 },
  @{ Source = 'df-test1-part4.mp3'; Output = 'df-t1-3.mp3'; Start = 98.30; End = 120.20 },
  @{ Source = 'df-test1-part4.mp3'; Output = 'df-t1-4.mp3'; Start = 123.70; End = 145.00 },
  @{ Source = 'df-test1-part4.mp3'; Output = 'df-t1-5.mp3'; Start = 148.30; End = 170.90 },
  @{ Source = 'df-test2-part4.mp3'; Output = 'df-t2-1.mp3'; Start = 85.25; End = 114.25 },
  @{ Source = 'df-test2-part4.mp3'; Output = 'df-t2-2.mp3'; Start = 116.95; End = 141.95 },
  @{ Source = 'df-test2-part4.mp3'; Output = 'df-t2-3.mp3'; Start = 144.75; End = 180.85 },
  @{ Source = 'df-test2-part4.mp3'; Output = 'df-t2-4.mp3'; Start = 182.50; End = 208.65 },
  @{ Source = 'df-test2-part4.mp3'; Output = 'df-t2-5.mp3'; Start = 210.30; End = 242.00 },

  # Cambridge Flyers Part 3 is one passage for five items; Part 4 is one clip per item.
  @{ Source = 'gj-test1-part3.mp3'; Output = 'gj-p3-group.mp3'; Start = 55.45; End = 157.70 },
  @{ Source = 'gj-test1-part4.mp3'; Output = 'gj-p4-1.mp3'; Start = 41.60; End = 63.15 },
  @{ Source = 'gj-test1-part4.mp3'; Output = 'gj-p4-2.mp3'; Start = 66.35; End = 94.50 },
  @{ Source = 'gj-test1-part4.mp3'; Output = 'gj-p4-3.mp3'; Start = 97.80; End = 122.00 },
  @{ Source = 'gj-test1-part4.mp3'; Output = 'gj-p4-4.mp3'; Start = 125.25; End = 147.00 },
  @{ Source = 'gj-test1-part4.mp3'; Output = 'gj-p4-5.mp3'; Start = 150.25; End = 173.70 },

  # KET Part 3 is one conversation; Part 4 keeps each item's built-in repeat.
  @{ Source = 'kn-test1-part3.mp3'; Output = 'kn-p3-group.mp3'; Start = 47.50; End = 121.60 },
  @{ Source = 'kn-test1-part4.mp3'; Output = 'kn-p4-1.mp3'; Start = 13.75; End = 77.35 },
  @{ Source = 'kn-test1-part4.mp3'; Output = 'kn-p4-2.mp3'; Start = 82.45; End = 159.20 },
  @{ Source = 'kn-test1-part4.mp3'; Output = 'kn-p4-3.mp3'; Start = 164.20; End = 235.90 },
  @{ Source = 'kn-test1-part4.mp3'; Output = 'kn-p4-4.mp3'; Start = 241.15; End = 310.30 },
  @{ Source = 'kn-test1-part4.mp3'; Output = 'kn-p4-5.mp3'; Start = 315.35; End = 383.95 },

  # PET Part 2 keeps each item's built-in repeat. Part 4 stops before question 25.
  @{ Source = 'ot-test1-part2-q08-12.mp3'; Output = 'ot-p2-1.mp3'; Start = 9.80; End = 109.70 },
  @{ Source = 'ot-test1-part2-q08-12.mp3'; Output = 'ot-p2-2.mp3'; Start = 112.90; End = 206.60 },
  @{ Source = 'ot-test1-part2-q08-12.mp3'; Output = 'ot-p2-3.mp3'; Start = 210.50; End = 299.90 },
  @{ Source = 'ot-test1-part2-q08-12.mp3'; Output = 'ot-p2-4.mp3'; Start = 303.50; End = 394.80 },
  @{ Source = 'ot-test1-part2-q08-12.mp3'; Output = 'ot-p2-5.mp3'; Start = 398.50; End = 487.80 },
  @{ Source = 'ot-test1-part4.mp3'; Output = 'ot-p4-group.mp3'; Start = 69.30; End = 182.40 }
)

foreach ($segment in $segments) {
  $source = Join-Path $sourceRoot $segment.Source
  $output = Join-Path $outputRoot $segment.Output
  $duration = [double]$segment.End - [double]$segment.Start

  & ffmpeg -y -hide_banner -loglevel error `
    -ss $segment.Start -i $source -t $duration `
    -map 0:a:0 -map_metadata -1 -c:a libmp3lame -b:a 128k `
    $output

  if ($LASTEXITCODE -ne 0) {
    throw "ffmpeg failed for $($segment.Output)"
  }
}

Write-Output "Created $($segments.Count) listening clips in $outputRoot"
