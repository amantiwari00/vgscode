/* ════════════════════════════════
   VGS GEOTECHNICAL — SHARED JS (main.js)
   Loaded on every page
════════════════════════════════ */

/* ── MOBILE MENU ── */
function toggleMobile() {
  const m = document.getElementById('mobileMenu');
  const o = document.getElementById('mobileOverlay');
  const h = document.getElementById('hamburger');
  const open = m.classList.toggle('open');
  h.classList.toggle('open', open);
  if (o) o.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
}
function closeMobile() {
  const m = document.getElementById('mobileMenu');
  const h = document.getElementById('hamburger');
  const o = document.getElementById('mobileOverlay');
  if (m) m.classList.remove('open');
  if (h) h.classList.remove('open');
  if (o) o.classList.remove('open');
  document.body.style.overflow = '';
}

/* ── NAV SHRINK ON SCROLL ── */
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (nav) nav.classList.toggle('scrolled', scrollY > 60);
});

/* ── SCROLL REVEAL ── */
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el => revObs.observe(el));

/* ── REVEAL-ZOOM OBSERVER ── */
const zoomObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal-zoom').forEach(el => zoomObs.observe(el));

/* ── COUNTER ANIMATION ── */
function animCounter(el, target) {
  let v = 0, step = target / 80;
  const t = setInterval(() => {
    v += step;
    if (v >= target) { el.textContent = target + '+'; clearInterval(t); }
    else el.textContent = Math.floor(v);
  }, 16);
}
const firedTargets = new Set();
const cntObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting && !firedTargets.has(e.target)) {
      firedTargets.add(e.target);
      animCounter(e.target, +e.target.dataset.target);
    }
  });
}, { threshold: 0.4, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('[data-target]').forEach(el => cntObs.observe(el));

/* ── 3D TILT ON ABOUT CARDS ── */
document.querySelectorAll('.tilt-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(600px) rotateY(${x * 14}deg) rotateX(${-y * 10}deg) scale(1.02)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(600px) rotateY(0deg) rotateX(0deg) scale(1)';
    card.style.transition = 'transform 0.5s ease';
  });
  card.addEventListener('mouseenter', () => { card.style.transition = 'none'; });
});

/* ── TILT ON TESTI + TEAM CARDS ── */
document.querySelectorAll('.testi-card, .team-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(700px) rotateY(${x * 10}deg) rotateX(${-y * 8}deg) translateY(-5px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.5s ease, box-shadow 0.3s ease';
  });
  card.addEventListener('mouseenter', () => { card.style.transition = 'none'; });
});

/* ── PROGRESS BAR ── */
const progressBar = document.createElement('div');
progressBar.style.cssText = 'position:fixed;top:0;left:0;height:2px;background:var(--accent);z-index:9999;transition:width .1s linear;width:0;pointer-events:none;';
document.body.prepend(progressBar);
window.addEventListener('scroll', () => {
  const s = document.documentElement;
  const pct = (s.scrollTop / (s.scrollHeight - s.clientHeight)) * 100;
  progressBar.style.width = pct + '%';
});

/* ── GALLERY FILTER ── */
function filterGallery(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.gallery-item').forEach(item => {
    const show = cat === 'all' || item.dataset.cat === cat;
    item.style.display = show ? '' : 'none';
    if (show) item.style.animation = 'fadeUp .4s ease both';
  });
}

/* ── LIGHTBOX ── */
function openLightbox(item) {
  const lb = document.getElementById('lightbox');
  if (!lb) return;
  document.getElementById('lightboxImg').src = item.querySelector('img').src;
  document.getElementById('lightboxTitle').textContent = item.querySelector('.gallery-overlay h4')?.textContent || '';
  document.getElementById('lightboxSub').textContent = item.querySelector('.gallery-overlay span')?.textContent || '';
  lb.classList.add('open');
}
function closeLightbox(e) {
  const lb = document.getElementById('lightbox');
  if (lb && e.target === lb) lb.classList.remove('open');
}
document.addEventListener('keydown', e => {
  const lb = document.getElementById('lightbox');
  if (e.key === 'Escape' && lb) lb.classList.remove('open');
});

/* ── WHATSAPP CONTACT FORM ── */
function sendWhatsApp() {
  const name    = (document.getElementById('fname')?.value    || '').trim() || 'Not provided';
  const phone   = (document.getElementById('fphone')?.value   || '').trim() || 'Not provided';
  const email   = (document.getElementById('femail')?.value   || '').trim() || 'Not provided';
  const service = document.getElementById('fservice')?.value  || 'Not specified';
  const details = (document.getElementById('fdetails')?.value || '').trim() || 'Not provided';
  const msg =
    `Hello VGS Geotechnical Services,\n\n` +
    `*Name:* ${name}\n*Phone:* ${phone}\n*Email:* ${email}\n` +
    `*Service:* ${service}\n*Details:* ${details}\n\nPlease get in touch.`;
  window.open('https://wa.me/919834118628?text=' + encodeURIComponent(msg), '_blank');
}

/* ── TOAST NOTIFICATION ── */
function showToast(msg, type) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.className = 'toast ' + (type || '');
  t.classList.add('show');
  setTimeout(() => { t.classList.remove('show'); }, 4500);
}

/* ── CAREERS FORM ── */
function showFileName(input) {
  const label = document.getElementById('resumeFileName');
  if (label && input.files && input.files[0]) {
    label.textContent = '✅ ' + input.files[0].name;
    label.style.display = 'block';
  }
}

function submitCareerForm() {
  const name   = (document.getElementById('cname')?.value  || '').trim();
  const phone  = (document.getElementById('cphone')?.value || '').trim();
  const email  = (document.getElementById('cemail')?.value || '').trim();
  const city   = (document.getElementById('ccity')?.value  || '').trim() || 'Not provided';
  const exp    = document.getElementById('cexp')?.value    || 'Not specified';
  const qualif = document.getElementById('cqualif')?.value || 'Not specified';
  const cover  = (document.getElementById('ccover')?.value || '').trim() || 'No cover note';
  const job    = document.getElementById('selectedJobDisplay')?.textContent || 'General Application';
  const fileInput = document.getElementById('resumeFile');

  if (!name)  { showToast('⚠ Please enter your full name.', 'error');  return; }
  if (!phone) { showToast('⚠ Please enter your phone number.', 'error'); return; }
  if (!email || !email.includes('@')) { showToast('⚠ Please enter a valid email.', 'error'); return; }

  const btn = document.getElementById('careerSubmitBtn');
  if (btn) { btn.disabled = true; btn.textContent = 'Sending...'; }

  const subject = encodeURIComponent('HR Enquiry — ' + job + ' | VGS Geotechnical');
  const body = encodeURIComponent(
    'Dear VGS HR Team,\n\n' +
    'Please find below my application details:\n\n' +
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n' +
    'POSITION INTERESTED IN: ' + job + '\n' +
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n' +
    'Full Name   : ' + name + '\n' +
    'Phone       : ' + phone + '\n' +
    'Email       : ' + email + '\n' +
    'Current City: ' + city + '\n' +
    'Experience  : ' + exp + '\n' +
    'Role        : ' + qualif + '\n\n' +
    'MESSAGE TO HR:\n' + cover + '\n\n' +
    (fileInput && fileInput.files && fileInput.files[0]
      ? '[Resume: ' + fileInput.files[0].name + ' — please attach manually]\n\n'
      : '') +
    'Thank you for considering my application.\n\nBest regards,\n' + name
  );
  window.location.href = 'mailto:vindhyangeotech@gmail.com?subject=' + subject + '&body=' + body;
  setTimeout(() => {
    showToast('📧 Your email client has been opened. Please send the email to complete your application.', 'success');
    if (btn) { btn.disabled = false; btn.textContent = 'Send to HR Team'; }
  }, 1200);
}

/* ── 3D CUBE (Why VGS section, index.html only) ── */
(function() {
  const container = document.getElementById('cubeContainer');
  const cube      = document.getElementById('statsCube');
  if (!container || !cube) return;
  cube.classList.remove('auto-spin');
  cube.style.cssText += ';animation:none;transition:none;';
  let rotX = 18, rotY = 0, rotZ = 2;
  let velX = 0, velY = 0.4;
  let dragging = false, lastMX = 0, lastMY = 0;
  let autoSpin = true, resumeTimer = null, autoT = 0;
  function applyTransform() {
    cube.style.transform = 'rotateX('+rotX+'deg) rotateY('+rotY+'deg) rotateZ('+rotZ+'deg)';
  }
  container.addEventListener('mousedown', function(e) {
    dragging = true; autoSpin = false; lastMX = e.clientX; lastMY = e.clientY;
    velX = 0; velY = 0; if (resumeTimer) clearTimeout(resumeTimer);
    container.style.cursor = 'grabbing'; e.preventDefault();
  });
  window.addEventListener('mousemove', function(e) {
    if (!dragging) return;
    var dx = e.clientX - lastMX, dy = e.clientY - lastMY;
    rotY += dx * 0.6; rotX -= dy * 0.6; velY = dx * 0.6; velX = -dy * 0.6;
    lastMX = e.clientX; lastMY = e.clientY; applyTransform();
  });
  window.addEventListener('mouseup', function() {
    if (!dragging) return; dragging = false; container.style.cursor = 'grab';
    resumeTimer = setTimeout(function() { autoSpin = true; }, 2800);
  });
  container.addEventListener('touchstart', function(e) {
    dragging = true; autoSpin = false; lastMX = e.touches[0].clientX; lastMY = e.touches[0].clientY;
    velX = 0; velY = 0; if (resumeTimer) clearTimeout(resumeTimer);
  }, { passive: true });
  container.addEventListener('touchmove', function(e) {
    if (!dragging) return;
    var dx = e.touches[0].clientX - lastMX, dy = e.touches[0].clientY - lastMY;
    rotY += dx * 0.6; rotX -= dy * 0.6; velY = dx * 0.6; velX = -dy * 0.6;
    lastMX = e.touches[0].clientX; lastMY = e.touches[0].clientY; applyTransform();
  }, { passive: true });
  container.addEventListener('touchend', function() {
    dragging = false; resumeTimer = setTimeout(function() { autoSpin = true; }, 2800);
  });
  (function raf() {
    requestAnimationFrame(raf);
    if (dragging) return;
    if (autoSpin) {
      autoT += 0.008; rotY += 0.38;
      rotX = 18 + Math.sin(autoT) * 7; rotZ = 2 + Math.cos(autoT * 0.8) * 3;
    } else { velX *= 0.91; velY *= 0.91; rotX += velX; rotY += velY; }
    applyTransform();
  })();
})();

/* ── FLOATING PARTICLES (why section) ── */
(function() {
  const whySec = document.getElementById('why');
  if (!whySec) return;
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.className = 'why-particle';
    const size = Math.random() * 6 + 3;
    // Fix applied here: changed * 100 to * 95
    p.style.cssText = `width:${size}px;height:${size}px;left:${Math.random()*95}%;top:${Math.random()*100}%;animation-duration:${Math.random()*6+5}s;animation-delay:${Math.random()*4}s;opacity:${Math.random()*.4+.1};`;
    whySec.appendChild(p);
  }
})();