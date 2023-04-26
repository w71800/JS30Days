let mouseIsDown = false

/* 取得 HTML 元素 */
const player = document.querySelector(".player")
const video = player.querySelector(".viewer")
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreen = player.querySelector('.fullscreen');

/* 構建 functions */
function togglePlay(){
  const method = video.paused ? 'play' : 'pause'
  video[method]();
}
function updateButton(){
  const icon = video.paused ? '►' : "❚❚"
  toggle.innerText = icon
}
function skip(){
  console.log(parseFloat(this.dataset.skip))
  video.currentTime += parseFloat(this.dataset.skip)
}
function handleRangeUpdate(){
  if(!mouseIsDown) return

  video[this.name] = this.value
}
function handleRangeStatus(){
  mouseIsDown = !mouseIsDown
}
function handleProgress(){
  const percent = (video.currentTime / video.duration) * 100 + '%'
  progressBar.style.flexBasis = percent
}
function scrub(e){
  const percent = e.offsetX / progress.offsetWidth
  video.currentTime = video.duration * percent
}
function handleFullscreen(){
  document.fullscreenElement == null ? player.requestFullscreen() : null
  handleScreenStatus()
}
function handleScreenStatus(){
  const hint = document.fullscreenElement == null ? 'Full' : 'Leave'
  fullscreen.textContent = hint
}
/* 建立事件偵聽 */
video.addEventListener('click', togglePlay)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
video.addEventListener('timeupdate', handleProgress)
toggle.addEventListener('click', togglePlay)
skipButtons.forEach( btn => {
  btn.addEventListener('click', skip)
})
ranges.forEach( r => {
  r.addEventListener('change', handleRangeUpdate)
})
ranges.forEach( r => {
  r.addEventListener('mousemove', handleRangeUpdate)
})
ranges.forEach( r => {
  r.addEventListener('click', handleRangeStatus)
})
progress.addEventListener('click', scrub)
progress.addEventListener('mousemove',() => mouseIsDown && scrub(e) ) /* 利用 && 的特性，前面為 true 之後後面也一同會執行 */
progress.addEventListener('mousedown', () => mouseIsDown = true )
progress.addEventListener('mouseup', () => mouseIsDown = false )
fullscreen.addEventListener('click', handleFullscreen)
fullscreen.addEventListener('keydown', e => e.key == "Escape" ? handleFullscreen() : null)
document.addEventListener('fullscreenchange', handleScreenStatus)