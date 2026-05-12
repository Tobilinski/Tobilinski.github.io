AOS.init({
    duration: 600,   // how long each animation takes in milliseconds
    once: false      // only animate once — not every time you scroll back up
});


/* ============================================================
   GAMES PAGE — WebGL embed interactions  (Games.html)
   ============================================================ */

/* ── Click-to-play overlay ───────────────────────────────────
   Why: Unity WebGL captures keyboard input, which fights with
   browser scrolling. Requiring a deliberate click first is the
   standard fix, and also means Unity only starts loading once
   the user actually wants to play (saves bandwidth).

   How: Each iframe stores its real URL in data-src instead of
   src. On overlay click the URL is moved into src so the Unity
   loader fires, then the overlay fades out.                   */
document.querySelectorAll('.game-overlay').forEach(overlay => {
    overlay.addEventListener('click', () => {
        const index  = overlay.id.split('-')[1];
        const iframe = document.getElementById('iframe-' + index);

        if (iframe && iframe.dataset.src) {
            iframe.src = iframe.dataset.src;
        }

        overlay.classList.add('hidden');
    });
});


/* ── Fullscreen button ───────────────────────────────────────
   Requests native browser fullscreen on the iframe.
   If the game hasn't been started yet, triggers the overlay
   click first so Unity loads before going fullscreen.
   Vendor prefixes cover Safari (webkit) and older Firefox.   */
document.querySelectorAll('.fullscreen-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const iframe  = document.getElementById(btn.dataset.target);
        if (!iframe) return;

        const index   = btn.dataset.target.split('-')[1];
        const overlay = document.getElementById('overlay-' + index);

        if (overlay && !overlay.classList.contains('hidden')) {
            overlay.click();
        }

        const req = iframe.requestFullscreen
                 || iframe.webkitRequestFullscreen
                 || iframe.mozRequestFullScreen
                 || iframe.msRequestFullscreen;
        if (req) req.call(iframe);
    });
});
