const strings = {
  buttonInstallId: 'buttonInstall',
  hiddenClass: 'hidden',
  beforeinstallprompt:'beforeinstallprompt event triggered',
  install:'Install button clicked',
  installSuccessfully:'installed'
};


const log = (message) => {
  console.log(`[LOG]: ${message}`);
};

const butInstall = document.getElementById(strings.buttonInstallId);

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();

  window.deferredPrompt = event;

  butInstall.classList.toggle(strings.hiddenClass, false);

  log(strings.beforeinstallprompt);
});

butInstall.addEventListener('click', async () => {
  const event = window.deferredPrompt;
  if (!event) {
    return;
  }
  event.prompt();

  window.deferredPrompt = null;

  butInstall.classList.toggle(strings.hiddenClass, true);

  log(strings.install);
});

window.addEventListener('appinstalled', (event) => {
  window.deferredPrompt = null;

  log(strings);
});
