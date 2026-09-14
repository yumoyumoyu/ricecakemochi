/**
 * みえたわー (Mieta Tower) - Official Site Script
 * Author: @ricecakemochi
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Current Year in Footer
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Header Scroll Effect
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 3. Mobile Navigation Drawer
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
      });
    });
  }

  // 4. Interactive AR Skyline Simulator
  const simStage = document.getElementById('simStage');
  const reticle = document.getElementById('arReticle');
  const simStatus = document.getElementById('simStatus');
  const towerTargets = document.querySelectorAll('.tower-target');
  const cycleBtn = document.getElementById('scanCycleBtn');

  // Overlay Card Fields
  const cardCode = document.getElementById('cardCode');
  const cardName = document.getElementById('cardName');
  const cardHeight = document.getElementById('cardHeight');
  const cardFloors = document.getElementById('cardFloors');
  const cardYear = document.getElementById('cardYear');
  const cardDesc = document.getElementById('cardDesc');
  const arCard = document.getElementById('arCard');

  let currentTargetIndex = 1; // Default to Toranomon Hills (ID: 2, index: 1)

  // Track cursor movement on sim-stage for AR reticle
  if (simStage && reticle) {
    simStage.addEventListener('mousemove', (e) => {
      const rect = simStage.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      reticle.style.left = `${x}px`;
      reticle.style.top = `${y}px`;
      reticle.style.opacity = '1';
    });

    simStage.addEventListener('mouseleave', () => {
      // Return reticle to center of currently active target
      const activeTarget = document.querySelector('.tower-target.active');
      if (activeTarget) {
        positionReticleToTarget(activeTarget);
      }
    });
  }

  function positionReticleToTarget(targetEl) {
    if (!reticle || !simStage) return;
    const stageRect = simStage.getBoundingClientRect();
    const pin = targetEl.querySelector('.ping-circle') || targetEl;
    const pinRect = pin.getBoundingClientRect();

    const x = pinRect.left + pinRect.width / 2 - stageRect.left;
    const y = pinRect.top + pinRect.height / 2 - stageRect.top;

    reticle.style.left = `${x}px`;
    reticle.style.top = `${y}px`;
  }

  function selectTarget(targetEl) {
    if (!targetEl) return;

    // Update active class
    towerTargets.forEach(t => t.classList.remove('active'));
    targetEl.classList.add('active');

    // Extract data attributes
    const name = targetEl.getAttribute('data-name');
    const height = targetEl.getAttribute('data-height');
    const floors = targetEl.getAttribute('data-floors');
    const year = targetEl.getAttribute('data-year');
    const desc = targetEl.getAttribute('data-desc');
    const pinCode = targetEl.querySelector('.pin-code')?.textContent || 'T-XX';

    // Visual flicker effect on card update
    if (arCard) {
      arCard.style.transform = 'scale(0.98)';
      arCard.style.borderColor = '#ffffff';

      setTimeout(() => {
        cardCode.textContent = `ID: ${pinCode}`;
        cardName.textContent = name;
        cardHeight.textContent = height;
        cardFloors.textContent = floors;
        cardYear.textContent = year;
        cardDesc.textContent = desc;

        arCard.style.transform = 'scale(1)';
        arCard.style.borderColor = 'var(--neon-cyan)';
      }, 120);
    }

    if (simStatus) {
      simStatus.textContent = `LOCKED: ${name}`;
      simStatus.style.color = 'var(--neon-cyan)';
    }

    // Move reticle
    positionReticleToTarget(targetEl);
  }

  // Click listener for each tower target
  towerTargets.forEach((target, idx) => {
    target.addEventListener('click', (e) => {
      e.stopPropagation();
      currentTargetIndex = idx;
      selectTarget(target);
    });
  });

  // Cycle button logic
  if (cycleBtn) {
    cycleBtn.addEventListener('click', () => {
      currentTargetIndex = (currentTargetIndex + 1) % towerTargets.length;
      selectTarget(towerTargets[currentTargetIndex]);
    });
  }

  // Initialize Reticle position
  window.addEventListener('load', () => {
    const initialActive = document.querySelector('.tower-target.active');
    if (initialActive) {
      positionReticleToTarget(initialActive);
    }
  });

  window.addEventListener('resize', () => {
    const initialActive = document.querySelector('.tower-target.active');
    if (initialActive) {
      positionReticleToTarget(initialActive);
    }
  });
});
