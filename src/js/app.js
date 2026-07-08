/* =====================================================================
   Portfolio slider logic — behavior only.
   Slides, dots and the counter are already rendered into HTML at
   build time (scripts/render.js + data/portfolio.js) — no data here.

   The slider loops seamlessly: clones of the first and last slides
   sit at the track edges; after animating onto a clone the track
   instantly (without transition) snaps to the real slide.
   ===================================================================== */

const pad = (n) => String(n).padStart(2, '0');

class PortfolioSlider {
  constructor() {
    this.track = document.querySelector('.js-track');
    this.dotsBox = document.querySelector('.js-dots');
    this.current = document.querySelector('.js-current');
    this.prevBtn = document.querySelector('.js-prev');
    this.nextBtn = document.querySelector('.js-next');

    this.dots = Array.prototype.slice.call(this.dotsBox.children);
    this.len = this.dots.length;
    // Clones are rendered by Pug only when len > 1
    this.looped = this.track.querySelectorAll('.slide').length > this.len;

    this.index = 0;        // logical slide: 0..len-1
    this.pos = 0;          // visual position on the track: -1..len (edges are clones)
    this.isAnimating = false;

    this.bindEvents();
    this.applyTransform();
  }

  bindEvents() {
    this.prevBtn.addEventListener('click', () => this.go(-1));
    this.nextBtn.addEventListener('click', () => this.go(1));

    this.dots.forEach((dot, i) => {
      dot.addEventListener('click', () => this.goTo(i));
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') this.go(1);
      else if (e.key === 'ArrowLeft') this.go(-1);
    });

    // Snap back from a clone to the real slide once the animation ends
    this.track.addEventListener('transitionend', (e) => {
      if (e.target !== this.track) return;
      this.settle();
    });

    // Swipe on touch devices
    let startX = null;
    this.track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    }, { passive: true });
    this.track.addEventListener('touchend', (e) => {
      if (startX === null) return;
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 50) this.go(dx < 0 ? 1 : -1);
      startX = null;
    });
  }

  go(dir) {
    if (!this.looped || this.isAnimating) return;
    this.pos += dir; // may land on a clone: -1 or len
    this.index = (this.pos + this.len) % this.len;
    this.startAnimation();
  }

  goTo(i) {
    if (i === this.index || this.isAnimating) return;
    this.pos = i;
    this.index = i;
    this.startAnimation();
  }

  startAnimation() {
    this.isAnimating = true;
    // Safety net in case transitionend never fires
    // (hidden tab, prefers-reduced-motion, etc.)
    clearTimeout(this._settleTimer);
    this._settleTimer = setTimeout(() => this.settle(), 900);
    this.update();
  }

  settle() {
    clearTimeout(this._settleTimer);
    this.isAnimating = false;
    if (this.pos === -1 || this.pos === this.len) {
      this.snapTo(this.index);
    }
  }

  // Instant (no transition) jump of the track to slide i
  snapTo(i) {
    this.pos = i;
    this.track.style.transition = 'none';
    this.applyTransform();
    void this.track.offsetWidth; // force reflow so the jump is not animated
    this.track.style.transition = '';
  }

  applyTransform() {
    const shift = this.looped ? this.pos + 1 : this.pos;
    this.track.style.transform = `translateX(${-shift * 100}%)`;
  }

  update() {
    this.applyTransform();
    this.current.textContent = pad(this.index + 1);

    this.dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === this.index);
      dot.setAttribute('aria-current', i === this.index ? 'true' : 'false');
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.js-track');
  if (track && track.querySelector('.slide')) new PortfolioSlider();
});
