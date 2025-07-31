const userAgent = navigator.userAgent || navigator.vendor || window.opera;

const isAndroid = /android/i.test(userAgent);
const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;

if (isIOS) {
  window.location.href = "https://apps.apple.com/us/app/sundry-marketplace/id6737113628";
} else if (isAndroid) {
  window.location.href = "https://play.google.com/store/apps/details?id=com.sundry.sundry";
} else {
  // fallback for desktop or unknown
  window.location.href = "https://sundry.gr";
}
