// Mithila Job - PWA install & service worker registration logic

let deferredInstallPrompt = null;

// ---------- Register Service Worker ----------
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js')
      .then((reg) => {
        console.log('[PWA] Service worker registered:', reg.scope);

        // Listen for updates and prompt user to refresh
        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing;
          if (!newWorker) return;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              showUpdateToast(reg);
            }
          });
        });
      })
      .catch((err) => console.warn('[PWA] Service worker registration failed:', err));
  });

  // Reload once when the new service worker takes control
  let refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (refreshing) return;
    refreshing = true;
    window.location.reload();
  });
}

function showUpdateToast(reg) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.innerHTML = 'नया अपडेट उपलब्ध है — <button style="text-decoration:underline;font-weight:700;margin-left:6px;" onclick="applyUpdate()">रीफ़्रेश करें</button>';
  el.classList.remove('hidden');
  window.__pendingSWReg = reg;
}

function applyUpdate() {
  const reg = window.__pendingSWReg;
  if (reg && reg.waiting) {
    reg.waiting.postMessage({ type: 'SKIP_WAITING' });
  } else {
    window.location.reload();
  }
}

// ---------- Install prompt (Android / Chrome / Edge) ----------
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredInstallPrompt = e;
  const btn = document.getElementById('installBtn');
  const btnMobile = document.getElementById('installBtnMobile');
  if (btn) btn.classList.remove('hidden');
  if (btnMobile) btnMobile.classList.remove('hidden');
});

function installPWA() {
  if (!deferredInstallPrompt) {
    // Not available (already installed, unsupported, or iOS) -> guide user
    if (isIos() && !isInStandaloneMode()) {
      document.getElementById('iosInstallBanner').classList.remove('hidden');
    }
    return;
  }
  deferredInstallPrompt.prompt();
  deferredInstallPrompt.userChoice.then((choice) => {
    if (choice.outcome === 'accepted') {
      console.log('[PWA] User accepted install');
    }
    deferredInstallPrompt = null;
    const btn = document.getElementById('installBtn');
    const btnMobile = document.getElementById('installBtnMobile');
    if (btn) btn.classList.add('hidden');
    if (btnMobile) btnMobile.classList.add('hidden');
  });
}

window.addEventListener('appinstalled', () => {
  console.log('[PWA] App installed');
  const btn = document.getElementById('installBtn');
  const btnMobile = document.getElementById('installBtnMobile');
  if (btn) btn.classList.add('hidden');
  if (btnMobile) btnMobile.classList.add('hidden');
  document.getElementById('iosInstallBanner')?.classList.add('hidden');
});

// ---------- iOS Add-to-Home-Screen guidance ----------
function isIos() {
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
}

function isInStandaloneMode() {
  return ('standalone' in window.navigator && window.navigator.standalone) ||
    window.matchMedia('(display-mode: standalone)').matches;
}

document.addEventListener('DOMContentLoaded', () => {
  // Show a one-time iOS banner if applicable (and not already installed)
  if (isIos() && !isInStandaloneMode()) {
    const dismissed = localStorage.getItem('mithilaIosBannerDismissed');
    if (!dismissed) {
      setTimeout(() => {
        document.getElementById('iosInstallBanner')?.classList.remove('hidden');
      }, 2500);
    }
  }
});
