import html2canvas from 'html2canvas'

export default async function (el) {
    let canvas = await html2canvas(el, {
        width: el.offsetWidth - 1,
        height: el.offsetHeight - 1,
    })
    let imgUrl = canvas.toDataURL('image/png')
    let a = document.createElement('a')
    a.href = imgUrl
    a.download = 'pic'
    a.click()
}
