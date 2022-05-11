export function initVideos() {
  let videos = document.querySelectorAll('.video');

  for (let i = 0; i < videos.length; i++) {
    setupVideo(videos[i]);
  }
}

function setupVideo(video) {
  let link = video.querySelector('.video__link');
  let button = video.querySelector('.video__button');
  let id = parseMediaURL(link);

  video.addEventListener('click', () => {
    let iframe = createIframe(id);

    link.remove();
    button.remove();
    video.appendChild(iframe);
  });

  link.removeAttribute('href');
  video.classList.add('video--enabled');
}

function parseMediaURL(link) {
  return link.getAttribute('href').split('=').pop();
}

function createIframe(id) {
  let iframe = document.createElement('iframe');

  iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;');
  iframe.setAttribute('allowfullscreen', '');
  iframe.setAttribute('src', generateURL(id));
  iframe.classList.add('video__media');

  return iframe;
}

function generateURL(id) {
  let query = '?rel=0&modestbranding=1&autohide=1&showinfo=0&autoplay=1';
  return 'https://youtube.com/embed/' + id + query;
}
