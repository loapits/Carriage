'use strict';
let body = document.querySelector('body'),
    a = document.querySelector('main'),
    link = document.querySelectorAll('.link');

for (let i = 0; i < link.length; i++) {
  link[i].addEventListener('click', e => {
    e.preventDefault();
  })
};

function loadPage(url) {
  return fetch(url).then( response => {
    return response.text();
  })
  .then( text => {
    let parser = new DOMParser(),
    parseText =  parser.parseFromString(text, 'text/html'),
    main = parseText.querySelector('main');
    document.querySelector('main').innerHTML = main.innerHTML;
    return main;
  })
}

function removEl(elId) {
  let el = document.getElementById(elId);
  if (el) {
    el.remove();
    console.log(`Элемент ${elId} удален`);
  } else {
    console.log(`Элемент ${elId} отсутствует`);
  } 
}

function loadPlayer() {
  let src2 = document.createElement("script");
  src2.src = 'js/script.js';
  document.getElementsByTagName("main")[0].appendChild(src2);
}

function loadPlaylist(urls) {
  let src1 = document.createElement("script");
  src1.src = urls;
  document.getElementsByTagName("main")[0].appendChild(src1);
}

function changeURL(url, title) {
  history.pushState({}, 'Carriage', url);
  document.getElementsByTagName('title')[0].innerHTML = title;
}

async function loadAllScr(url, urls) {
  await loadPlaylist(urls);
  await loadPage( url);
  await loadPlayer()
  await removEl('playlist');
  await removEl('player');
};

document.addEventListener('click', event => {
  switch (event.target.id) {
    case 'logo-img':
    case 'logo-two-img':
    case 'albums':
      loadAllScr('index.html');
      changeURL('index.html', 'Albums');
      break;

    case 'updatesHead':
      loadAllScr('updates.html');
      changeURL('updates.html', 'Updates');
      break;

    case 'aboutMe':
      loadAllScr('about_author.html');
      changeURL('about_author.html', 'About me');
      break;

    case 'radio':
      loadAllScr('radio.html', 'js/script(radio).js');
      changeURL('radio.html', 'Radio');
      break;
  }
});

document.addEventListener('click', event => {
  switch (event.target.id) {
    case 'QQQQ':
      loadAllScr('questions_questions_questions_questions.html', 'js/script(QQQQ).js');
      changeURL('questions_questions_questions_questions.html', 'QQQQ');
      break;

    case 'LVLUP':
      loadAllScr('level_up_part_one.html', 'js/script(LevelUpPartOne).js');
      changeURL('level_up_part_one.html', 'LVLUP(pt1)');
      break;

    case 'ALLWORLD':
      loadAllScr('allworld.html', 'js/script(worldtheatre).js');
      changeURL('allworld.html', 'ВЕСЬ МИР-ТЕАТР');
      break;

    case 'EARLY':
      loadAllScr('early-morning-and-euphoria.html', 'js/script(EARLY).js');
      changeURL('early-morning-and-euphoria.html', 'EARLY MORNING AND EUPHORIA');
      break;
  }
});