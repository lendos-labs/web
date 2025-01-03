import hash from 'object-hash';

export const fingerprint = () =>
  hash({
    userAgent: (window as Window).navigator.userAgent,
    language: (window as Window).navigator.language,
    timeZone: new Date().getTimezoneOffset(),
    screen: [window.screen.height, window.screen.width],
    colorDepth: window.screen.colorDepth,
  });
