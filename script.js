const dialog = document.getElementById('media-dialog');
const image = document.getElementById('dialog-image');
const title = document.getElementById('dialog-title');
const stage = document.getElementById('dialog-stage');
let scale = 1;
let intrinsic = { width: 0, height: 0 };
function setImageScale(value) {
  scale = Math.min(3, Math.max(0.25, value));
  if (!intrinsic.width) return;
  image.style.width = `${Math.round(intrinsic.width * scale)}px`;
  image.style.height = 'auto';
}
function openImage(src, heading) {
  title.textContent = heading || 'Captura del proyecto';
  scale = 1;
  intrinsic = { width: 0, height: 0 };
  image.removeAttribute('width');
  image.src = src;
  image.onload = () => {
    intrinsic = { width: image.naturalWidth, height: image.naturalHeight };
    const fit = Math.min((stage.clientWidth - 18) / intrinsic.width, (stage.clientHeight - 18) / intrinsic.height, 1);
    setImageScale(fit);
    stage.scrollTop = 0;
    stage.scrollLeft = 0;
  };
  if (!dialog.open) dialog.showModal();
}
document.querySelectorAll('[data-image]').forEach(el => el.addEventListener('click', () => openImage(el.dataset.image, el.dataset.title)));
document.getElementById('dialog-close').addEventListener('click', () => dialog.close());
document.getElementById('zoom-in').addEventListener('click', () => setImageScale(scale * 1.4));
document.getElementById('zoom-out').addEventListener('click', () => setImageScale(scale / 1.4));
dialog.addEventListener('click', event => {if (event.target === dialog) dialog.close()});
document.getElementById('year').textContent = new Date().getFullYear();
