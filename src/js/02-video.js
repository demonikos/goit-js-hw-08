import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const LOCALSTORAGE_KEY = 'videoplayer-current-time';

// ------------------
// player.on('play', function() {

// console.log('played the video!');

// player.getCurrentTime().then(function(seconds) {
//     // seconds = the current playback position
//     console.log(seconds);
//     lastSavedTime = seconds;
//     console.log(`last saved time - ${lastSavedTime}`);
// }).catch(function(error) {
//     // an error occurred
// });

// player.getPaused().then(function(paused) {
//     // paused = whether or not the player is paused
// }).catch(function(error) {
//     // an error occurred
// });

// player.setCurrentTime(value).then(function(seconds) {
//     // seconds = the actual time that the player seeked to
// }).catch(function(error) {
//     switch (error.name) {
//         case 'RangeError':
//             // the time was less than 0 or greater than the video’s duration
//             break;

//         default:
//             // some other error occurred
//             break;
//     }
// });

// });

// --------------------/-/-/-/-/-/-/----------------

// player.on('timeupdate', function ({ seconds }) {
//   console.log('current time - ', seconds);
//   lastSavedTime = seconds;
//   console.log(`last saved time - ${lastSavedTime}`);
//   // const localStorageTime = JSON.stringify(lastSavedTime);
//   // localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(lastSavedTime));
//   //    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(lastSavedTime)).throttle(setItem, 1000);
// //   _.throttle(localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(lastSavedTime)), 1000);
// localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(lastSavedTime));
// });

// player.on('timeupdate', throttle(localStorageTime, 1000));

// player.on('timeupdate', function ({ seconds }){
//     console.log('current time - ', seconds);
//     lastSavedTime = seconds;
//     console.log(`last saved time - ${lastSavedTime}`);

// window.addEventListener('load', event => {
//   localStorageTime = localStorage.getItem(LOCALSTORAGE_KEY);
//   try {
//     refreshedPageTime = JSON.parse(localStorageTime);
//   } catch (error) {
//     console.log(error.name);
//     console.log(error.message);
//   }
// player.setCurrentTime(refreshedPageTime);

// });
// })
// --------------------/-/-/-/-/-/-/----------------

const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

player.on('timeupdate', throttle(currTime, 1000));

function currTime(currentTime) {
  save(LOCALSTORAGE_KEY, currentTime.seconds);
}

window.addEventListener('load', event => {
    player.setCurrentTime(load(LOCALSTORAGE_KEY) || 0);
  });

// --------------------/-/-/-/-/-/-/----------------
