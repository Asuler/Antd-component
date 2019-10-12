function fullScreen(domElement) {
  if (domElement.requestFullscreen) {
    domElement.requestFullscreen();
  } else if (domElement.mozRequestFullScreen) {
    domElement.mozRequestFullScreen();
  } else if (domElement.webkitRequestFullscreen) {
    domElement.webkitRequestFullscreen();
  } else if (domElement.msRequestFullscreen) {
    domElement.msRequestFullscreen();
  }
}

function exitFullscreen() {
  if(document.exitFullScreen) {
    document.exitFullScreen();
  } else if(document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if(document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if(document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

function getFullscreenElement() {
  return (
    document.fullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullScreenElement ||
    document.webkitFullscreenElement||null
  );
}

function isFullScreen() {
  return  !! (
    document.fullscreen ||
    document.mozFullScreen ||
    document.webkitIsFullScreen ||
    document.webkitFullScreen ||
    document.msFullScreen
  );
}

function isFullscreenEnabled() {
  return  (
    document.fullscreenEnabled ||
    document.mozFullScreenEnabled ||
    document.webkitFullscreenEnabled ||
    document.msFullscreenEnabled
  );
}

export default {
  fullScreen,
  exitFullscreen,
  getFullscreenElement,
  isFullScreen,
  isFullscreenEnabled,
}