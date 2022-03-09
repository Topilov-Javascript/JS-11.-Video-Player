/* -_-_-_-_-_-_-_-_-_-_-_-_-_Variables-_-_-_-_-_-_-_-_-_-_-_-_-_ */

const player = document.querySelector('.player');
const loader = document.querySelector('.loader');

const video = document.querySelector('video')
const progressRange = document.querySelector('.progress-range')
const progressBar = document.querySelector('.progress-bar')
const playBtn = document.getElementById('play-btn')
const volumeIcon = document.getElementById('volume-icon')
const volumeRange = document.querySelector('.volume-range')
const volumeBar = document.querySelector('.volume-bar')
const currentTime = document.querySelector('.time-elapsed')
const duration = document.querySelector('.time-duration')
const speed = document.querySelector('.player-speed');
const fullscreenBtn = document.querySelector('.fullscreen')

const showControls = document.getElementById('show-controls')
const controlsContainer = document.getElementById('controls-container')

let controlsIsShowing = false
var isMobile = false //initiate as false

/* -_-_-_-_-_-_-_-_-_-_-_-_-_Variables-_-_-_-_-_-_-_-_-_-_-_-_-_ */

// device detection
if (
  /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
    navigator.userAgent
  ) ||
  /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
    navigator.userAgent.substr(0, 4)
  )
) {
  isMobile = true
}

// if Device is Mobile, make height of showControls 100 percent
function showControlsHeight () {
  if (isMobile) {
    showControls.style.height = '100%'
  }
}

// Show or Hide Controls
function showHideControls () {
  if (controlsIsShowing) {
    controlsContainer.style.opacity = '1'
    controlsContainer.style.transition = 'all 0.2s ease-out'
  } else {
    controlsContainer.style.opacity = '0'
    controlsContainer.style.transition = 'all 0.2s ease-out'
  }
}

// Detecting where user is clicking
function detectShowingControls (e) {
  if (isMobile && e.target.id === 'show-controls') {
    controlsIsShowing = !controlsIsShowing
    showHideControls()
  }
}

// Play & Pause ----------------------------------- //

function showPlayIcon () {
  playBtn.classList.replace('fa-pause', 'fa-play')
  playBtn.setAttribute('title', 'Play')
}

function togglePlay () {
  if (video.paused) {
    video.play()
    playBtn.classList.replace('fa-play', 'fa-pause')
    playBtn.setAttribute('title', 'Pause')
  } else {
    video.pause()
    showPlayIcon()
  }
}

// On Video End, show play button icon
video.addEventListener('ended', showPlayIcon)

// Progress Bar ---------------------------------- //

// Calculate display time format
function displayTime(time) {
    const seconds = Math.floor(time % 60)<10 ? `0${Math.floor(time % 60)}` : Math.floor(time % 60);
    const minutes = Math.floor(seconds / 60)<10 ? `0${Math.floor(seconds / 60)}:` : `${Math.floor(seconds / 60)}:`;
    const hours = Math.floor(Math.floor(seconds / 60) / 60)===0 ? '' : Math.floor(minutes / 60)<10 ? `0${Math.floor(minutes / 60)}:` : `${Math.floor(minutes / 60)}:`;
    const overallTime = `${hours}${minutes}${seconds}`;
    return overallTime
}

// Update Progress Bar as Video plays
function updateProgress() {
  progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;

  let currentTimeInterval = setInterval(function() {
    currentTime.textContent = displayTime(video.currentTime);
  }, 1000)
  if (video.currentTime===video.duration) {
    clearInterval(currentTimeInterval)
  }
}

// Click to seek within the video
function setProgress(e) {
  const newTime = e.offsetX / progressRange.offsetWidth;
  progressBar.style.width = `${newTime * 100}%`
  video.currentTime = newTime * video.duration
}

// Volume Controls --------------------------- //

let lastVolume = 1;
let lastVolumeIconClassName = 'fa-volume-up';

// Volume Bar
function changeVolume(e) {
  let volume = e.offsetX / volumeRange.offsetWidth

  // Rounding volume up or down
  if (volume<0.1) {
    volume = 0
  }
  if (volume>0.9) {
    volume = 1
  }
  volumeBar.style.width = `${volume * 100}%`
  video.volume = volume;

  // Change Icon depending on Volume
  volumeIcon.className = '';
  if (volume > 0.7) {
    volumeIcon.classList.add('fas', 'fa-volume-up');
    lastVolumeIconClassName = 'fa-volume-up';
  } else if (volume < 0.7 && volume > 0) {
    volumeIcon.classList.add('fas', 'fa-volume-down')
    lastVolumeIconClassName = 'fa-volume-down';
  } else if (volume === 0) {
    volumeIcon.classList.add('fas', 'fa-volume-off')
    lastVolumeIconClassName = 'fa-volume-off';
  }
  lastVolume = volume;
}

// Mute/Unmute
function toggleMute() {
  volumeIcon.className = '';
  if (video.volume) {
    lastVolume = video.volume;
    video.volume = 0;
    volumeBar.style.width = 0
    volumeIcon.classList.add('fas', 'fa-volume-mute')
    volumeIcon.setAttribute('title', 'Unmute')
  } else {
    video.volume = lastVolume
    volumeBar.style.width = `${lastVolume * 100}%`
    volumeIcon.classList.add('fas', lastVolumeIconClassName)
    volumeIcon.setAttribute('title', 'Mute')
  }
}

// Change Playback Speed -------------------- //

function changeSpeed() {
  video.playbackRate = speed.value
}

// Fullscreen ------------------------------- //

/* View in fullscreen */
function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
  video.classList.add('video-fullscreen')
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
  video.classList.remove('video-fullscreen')
}


// Set Duration
function setDuration(e) {
  loader.style.display = 'none'
  player.style.display = 'block'
  duration.textContent = `/ ${displayTime(video.duration)}`;
}

// Fires when error detected during loading the video
function errorDetected(e) {
  loader.textContent = 'An error has occured during loading the video. Please retry later!';
  loader.style.alignItems = 'center'
  loader.style.padding = '0 10%'
}

let fullscreen = false;
// Toggle Fullscreen
function toggleFullscreen() {
  !fullscreen ? openFullscreen(player) : closeFullscreen()
  fullscreen = !fullscreen 
}

// Event Listeners
showControls.addEventListener('click', detectShowingControls)
playBtn.addEventListener('click', togglePlay)
video.addEventListener('click', togglePlay)
document.addEventListener('keypress', (e)=>{e.charCode===32?togglePlay():false})
video.addEventListener('loadedmetadata', setDuration)
video.addEventListener('error', errorDetected)
video.addEventListener('timeupdate', updateProgress)
video.addEventListener('canplay', updateProgress)
progressRange.addEventListener('click', setProgress)
volumeRange.addEventListener('click', changeVolume)
volumeIcon.addEventListener('click', toggleMute)
speed.addEventListener('change', changeSpeed)
fullscreenBtn.addEventListener('click', toggleFullscreen)

// On Load
showControlsHeight()
