function openTour(tourUrl) {
  // If you want the tour to open in a new tab:
  // window.open(tourUrl, '_blank');

  // If you want the tour to replace the current page (like before):
  window.location.href = tourUrl;
}

document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.about-toggle');
  var panel = document.getElementById('about-panel');

  if (!toggle || !panel) return;

  toggle.addEventListener('click', function () {
    var isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    panel.classList.toggle('open', !isOpen);
  });
});
