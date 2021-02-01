// /* eslint-disable no-console */

// import { register } from 'register-service-worker';

// if (process.env.NODE_ENV === 'production') {
//   register(`${process.env.BASE_URL}service-worker.js`, {
//     ready() {
//       console.log(
//         'App is being served from cache by a service worker.\n' + 'For more details, visit https://goo.gl/AFskqB'
//       );
//     },
//     registered() {
//       console.log('Service worker has been registered.');
//     },
//     cached() {
//       console.log('Content has been cached for offline use.');
//     },
//     updatefound() {
//       console.log('New content is downloading.');
//     },
//     updated() {
//       console.log('New content is available; please refresh.');
//     },
//     offline() {
//       console.log('No internet connection found. App is running in offline mode.');
//     },
//     error(error) {
//       console.error('Error during service worker registration:', error);
//     },
//   });
// }
const baseUrl = process.env.NODE_ENV === 'production' ? process.env.BASE_URL + '/nails' : process.env.BASE_URL;

function invokeServiceWorkerUpdateFlow(registration) {
  // TODO implement your own UI notification element
  const notification = document.body.appendChild(document.createElement('button'));
  notification.innerText = 'A new version of the site is available! Click here to update.';
  notification.style = `position:fixed;
    padding:5px 10px;
    background:#f44336;
    color:#fff;
    font-size:14px;
    top:5px;
    z-index:20;
    outline: none;
    left:50%;
    border-radius: 5px;
    transform:translateX(-50%);
    border:none;
    font-weight: 700;
    `;
  notification.addEventListener('click', () => {
    if (registration.waiting) {
      // let waiting Service Worker know it should became active
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      notification.remove();
    }
  });
}
if ('serviceWorker' in navigator) {
  // wait for the page to load
  window.addEventListener('load', async () => {
    // register the service worker from the file specified
    const registration = await navigator.serviceWorker.register('/service-worker.js');
    // ensure the case when the updatefound event was missed is also handled
    // by re-invoking the prompt when there's a waiting Service Worker
    if (registration.waiting) {
      invokeServiceWorkerUpdateFlow(registration);
    }
    registration.addEventListener('updatefound', () => {
      if (registration.installing) {
        // wait until the new Service worker is actually installed (ready to take over)
        registration.installing.addEventListener('statechange', () => {
          if (registration.waiting) {
            // if there's an existing controller (previous Service Worker), show the prompt
            if (navigator.serviceWorker.controller) {
              invokeServiceWorkerUpdateFlow(registration);
            } else {
              // otherwise it's the first install, nothing to do
              console.log('Service Worker initialized for the first time');
            }
          }
        });
      }
    });
    let refreshing = false;

    // detect controller change and refresh the page
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!refreshing) {
        window.location.replace(baseUrl) && window.location.reload();
        refreshing = true;
      }
    });
  });
}
