const dom = document.getElementById('vextab')
const bodWidth = document.body.offsetWidth
const maxWidth = 1200
const width = bodWidth > maxWidth ? maxWidth : bodWidth
dom.setAttribute('width', width)
dom.style.width = width + 'px'