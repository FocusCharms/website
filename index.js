// TODO: Make this work for all subs (pages), and add a language changer

function setSelfToLanguage(lang) {
  if (!location.pathname.startswith(`/${lang}`)) {
    // Won't work
    location.pathname = `https://focuscharms.github.io/website/translations/${lang}/${location.pathname}.html`
  }
}

const lang = "en"; //getLanguage();

if (!location.pathname.startsWith(`/${lang}/`)) {
  location.pathname = `translation/${lang}${location.pathname}`;
}
