function _move(el,e) {
    let elx = el.offsetLeft
    let ely = el.offsetTop
    let x = e.targetTouches[0].clientX
    let y = e.targetTouches[0].clientY
    el.addEventListener('touchmove', function(move_e) {
        let move_x = elx + (move_e.targetTouches[0].clientX - x)
        let move_y = ely + (move_e.targetTouches[0].clientY - y)
        el.style.left = move_x + 'px'
        el.style.top = move_y + 'px'
    })
}


export default {
    mounted(el) {
        let move = _move.bind(this, el)
        el.addEventListener('touchstart', move)
        el.addEventListener('touchend', function() {
            el.ontouchmove = null
        })
    }
}
