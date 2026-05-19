export function openPrintPdf(level) {
  if (!level?.printPdf) {
    alert('该级别暂未提供PDF试卷')
    return
  }

  window.open(encodeURI(level.printPdf), '_blank', 'noopener,noreferrer')
}
