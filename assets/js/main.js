/* ==========================================================================
   HEARTH & HAVEN — Domestic Help & Maid Placement Agency Template
   Main Interactive Script (Theme, Filtering, Modals, Validation, GSAP)
   ========================================================================== */

(function () {
  'use strict';

  /* ------------------------------------------------------------------------
     1. LIGHT / DARK THEME & RTL DIRECTION WITH LOCALSTORAGE
     ------------------------------------------------------------------------ */
  const THEME_KEY = 'hearth_haven_theme';
  const RTL_KEY = 'hearth_haven_direction';

  function getPreferredTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'dark' || saved === 'light') {
      return saved;
    }
    return 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);

    const toggleBtns = document.querySelectorAll('[data-theme-toggle]');
    toggleBtns.forEach((btn) => {
      const icon = btn.querySelector('i');
      if (icon) {
        if (theme === 'dark') {
          icon.className = 'bi bi-sun-fill';
          btn.setAttribute('aria-label', 'Switch to light mode');
          btn.setAttribute('title', 'Switch to light mode');
        } else {
          icon.className = 'bi bi-moon-stars-fill';
          btn.setAttribute('aria-label', 'Switch to dark mode');
          btn.setAttribute('title', 'Switch to dark mode');
        }
      }
    });
  }

  function getPreferredDirection() {
    const saved = localStorage.getItem(RTL_KEY);
    if (saved === 'rtl' || saved === 'ltr') {
      return saved;
    }
    return 'ltr';
  }

  function applyDirection(dir) {
    document.documentElement.setAttribute('dir', dir);
    localStorage.setItem(RTL_KEY, dir);

    const rtlBtns = document.querySelectorAll('[data-rtl-toggle]');
    rtlBtns.forEach((btn) => {
      // Button inside text must strictly remain "RTL"
      btn.textContent = 'RTL';
      if (dir === 'rtl') {
        btn.classList.add('active');
        btn.setAttribute('title', 'Switch to LTR direction');
        btn.setAttribute('aria-label', 'Switch to LTR direction');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('title', 'Switch to RTL direction');
        btn.setAttribute('aria-label', 'Switch to RTL direction');
      }
    });
  }

  // Apply immediately on script load
  applyTheme(getPreferredTheme());
  applyDirection(getPreferredDirection());

  document.addEventListener('DOMContentLoaded', () => {
    // Re-sync toggle button icons and RTL state once DOM is ready
    applyTheme(getPreferredTheme());
    applyDirection(getPreferredDirection());

    document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') || 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next);
      });
    });

    document.querySelectorAll('[data-rtl-toggle]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('dir') || 'ltr';
        const next = current === 'rtl' ? 'ltr' : 'rtl';
        applyDirection(next);
      });
    });

    /* ----------------------------------------------------------------------
       2. STICKY NAVBAR SCROLL & BACK TO TOP
       ---------------------------------------------------------------------- */
    const header = document.querySelector('.site-header');
    const backToTopBtn = document.getElementById('backToTopBtn');

    function handleScroll() {
      const scrollY = window.scrollY || window.pageYOffset;
      if (header) {
        if (scrollY > 20) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }
      if (backToTopBtn) {
        if (scrollY > 380) {
          backToTopBtn.classList.add('visible');
        } else {
          backToTopBtn.classList.remove('visible');
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    /* ----------------------------------------------------------------------
       3. FEATURED SAMPLE STAFF PROFILE FILTERING (Home 1 & Home 2)
       ---------------------------------------------------------------------- */
    const filterButtons = document.querySelectorAll('[data-profile-filter]');
    const profileItems = document.querySelectorAll('[data-profile-category]');

    if (filterButtons.length > 0 && profileItems.length > 0) {
      filterButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
          const targetCategory = btn.getAttribute('data-profile-filter');

          filterButtons.forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');

          profileItems.forEach((item) => {
            const itemCats = item.getAttribute('data-profile-category') || '';
            if (targetCategory === 'all' || itemCats.includes(targetCategory)) {
              item.classList.remove('d-none');
              if (window.gsap) {
                gsap.fromTo(
                  item,
                  { opacity: 0, y: 14 },
                  { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out', clearProps: 'all' }
                );
              }
            } else {
              item.classList.add('d-none');
            }
          });
        });
      });
    }

    /* ----------------------------------------------------------------------
       4. SAMPLE CANDIDATE DOSSIER MODAL POPULATION
       ---------------------------------------------------------------------- */
    const sampleProfilesData = {
      'meera-nair': {
        name: 'Meera Nair (Sample Profile)',
        role: 'Senior Full-Time Housemaid & Wardrobe Care',
        experience: '8 Years Verified Household Experience',
        schedule: 'Full-Time (9:00 AM – 6:00 PM) or Live-In',
        languages: 'English, Hindi, Malayalam',
        location: 'Available for South & Central Metro Households',
        summary:
          'Fictional illustrative candidate profile: Experienced in managing structured daily housekeeping for 3- to 5-bedroom family residences, fine fabric laundry, silver & glassware care, and organized pantry maintenance.',
        checks: [
          'Government ID & Age Cross-Checked',
          'Permanent & Local Address Verified',
          '2 Prior Household Employer References Checked (2019–2026)',
          'Practical Housekeeping & Hygiene Assessment Completed'
        ],
        categorySlug: 'Full-Time Maid Services',
        scheduleSlug: 'Full-Time (Day Shift)'
      },
      'rajesh-sharma': {
        name: 'Rajesh Sharma (Sample Profile)',
        role: 'Family Home Cook (Multi-Cuisine & Therapeutic Diets)',
        experience: '11 Years Culinary & Kitchen Management',
        schedule: 'Full-Time or Part-Time (Morning & Evening Slots)',
        languages: 'English, Hindi, Gujarati',
        location: 'Available Across Metro Residential Zones',
        summary:
          'Fictional illustrative candidate profile: Specializes in balanced home-style Indian, Continental, and low-oil diabetic/senior-friendly meals. Trained in kitchen sanitation, weekly meal prepping, and grocery inventory.',
        checks: [
          'Government ID & Address Verification Completed',
          '3 Prior Family Employer Reference Interviews Completed',
          'Culinary Hygiene & Live Cooking Assessment Passed',
          'Police Verification Application Facilitated (With Consent)'
        ],
        categorySlug: 'Home Cooks',
        scheduleSlug: 'Part-Time (Morning / Evening)'
      },
      'anita-desai': {
        name: 'Anita Desai (Sample Profile)',
        role: 'Certified Infant & Toddler Nanny',
        experience: '7 Years Childcare & Early Development Support',
        schedule: 'Full-Time or 24-Hour Live-In',
        languages: 'English, Hindi, Marathi',
        location: 'Available for Family Placements',
        summary:
          'Fictional illustrative candidate profile: Attentive nanny experienced with infants (6+ months) and school-age children. Skilled in sterilization routines, nutritious weaning food prep, structured play, and school transitions.',
        checks: [
          'Identity & Residential Address Confirmed',
          '2 Long-Term Family Childcare References Verified',
          'Pediatric First-Aid & Child Safety Awareness Assessed',
          'In-Person Counselor Temperament Evaluation Passed'
        ],
        categorySlug: 'Babysitters and Nannies',
        scheduleSlug: 'Full-Time (Day Shift)'
      },
      'samuel-thomas': {
        name: 'Samuel Thomas (Sample Profile)',
        role: 'Compassionate Elderly Caregiver & Mobility Assistant',
        experience: '9 Years Senior Companionship & Assisted Living Support',
        schedule: 'Full-Time Day Shift or Live-In Support',
        languages: 'English, Hindi, Tamil',
        location: 'Available for Senior Care Households',
        summary:
          'Fictional illustrative candidate profile: Calm, respectful caregiver experienced in assisting senior family members with daily walking, timely medication reminders, bathing/grooming dignity, and doctor visit accompaniment.',
        checks: [
          'Government ID & Permanent Address Verified',
          'Previous Elder-Care Family References Contacted',
          'Mobility Assistance & Emergency Protocol Evaluation',
          'Authorized Background Check Facilitated'
        ],
        categorySlug: 'Elderly Care Assistance',
        scheduleSlug: 'Live-In (24-Hour Support)'
      },
      'kavita-joshi': {
        name: 'Kavita Joshi (Sample Profile)',
        role: 'Live-In All-Round Domestic Helper',
        experience: '6 Years Live-In Family Support',
        schedule: 'Live-In (24-Hour Household Support)',
        languages: 'Hindi, Basic English',
        location: 'Available for Live-In Placements',
        summary:
          'Fictional illustrative candidate profile: Dedicated live-in helper supporting busy working couples with daily sweeping/mopping, laundry, basic meal preparation, and organized home upkeep.',
        checks: [
          'Identity & Dual Address Verification Completed',
          'Family Reference & Guardian Consent Confirmed',
          'Housekeeping & Kitchen Safety Practical Check',
          'Counselor Suitability & Communication Interview'
        ],
        categorySlug: 'Live-In Domestic Help',
        scheduleSlug: 'Live-In (24-Hour Support)'
      },
      'elena-fernandes': {
        name: 'Elena Fernandes (Sample Profile)',
        role: 'Executive Housekeeper & Fine Residence Specialist',
        experience: '10 Years Luxury Residence & Villa Upkeep',
        schedule: 'Full-Time (8–10 Hours Daily)',
        languages: 'English, Hindi, Konkani',
        location: 'Available for Premium Apartments & Villas',
        summary:
          'Fictional illustrative candidate profile: Trained in surface-safe care for marble, hardwood, antique furnishings, delicate upholstery, guest hospitality, and supervising vendor deliveries.',
        checks: [
          'Identity & Address Records Cross-Verified',
          'Multi-Year Estate & Residence References Checked',
          'Fine Surface & Fabric Care Practical Assessment',
          'Background Screening Completed With Written Consent'
        ],
        categorySlug: 'Professional Housekeeping',
        scheduleSlug: 'Full-Time (Day Shift)'
      }
    };

    const dossierModalEl = document.getElementById('sampleDossierModal');
    if (dossierModalEl) {
      document.querySelectorAll('[data-dossier-id]').forEach((trigger) => {
        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          const id = trigger.getAttribute('data-dossier-id');
          const data = sampleProfilesData[id];
          if (!data) return;

          const nameEl = document.getElementById('dossierModalName');
          const roleEl = document.getElementById('dossierModalRole');
          const expEl = document.getElementById('dossierModalExp');
          const schedEl = document.getElementById('dossierModalSchedule');
          const langEl = document.getElementById('dossierModalLang');
          const summaryEl = document.getElementById('dossierModalSummary');
          const checksListEl = document.getElementById('dossierModalChecks');
          const ctaLinkEl = document.getElementById('dossierModalCta');

          if (nameEl) nameEl.textContent = data.name;
          if (roleEl) roleEl.textContent = data.role;
          if (expEl) expEl.textContent = data.experience;
          if (schedEl) schedEl.textContent = data.schedule;
          if (langEl) langEl.textContent = data.languages;
          if (summaryEl) summaryEl.textContent = data.summary;

          if (checksListEl) {
            checksListEl.innerHTML = data.checks
              .map(
                (c) =>
                  `<li class="d-flex align-items-start gap-2 mb-2"><i class="bi bi-patch-check-fill text-success mt-1"></i><span>${c}</span></li>`
              )
              .join('');
          }

          if (ctaLinkEl) {
            const params = new URLSearchParams({
              category: data.categorySlug,
              schedule: data.scheduleSlug,
              ref: data.name
            });
            ctaLinkEl.setAttribute('href', `contact.html?${params.toString()}#enquiry-form`);
          }

          if (window.bootstrap && window.bootstrap.Modal) {
            const modal = window.bootstrap.Modal.getOrCreateInstance(dossierModalEl);
            modal.show();
          }
        });
      });
    }

    /* ----------------------------------------------------------------------
       5. HOME 2 INTERACTIVE EDITORIAL CATEGORY SHOWCASE TABS
       ---------------------------------------------------------------------- */
    const home2TabBtns = document.querySelectorAll('[data-editorial-tab]');
    const home2TabPanes = document.querySelectorAll('[data-editorial-pane]');

    if (home2TabBtns.length > 0 && home2TabPanes.length > 0) {
      home2TabBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
          const target = btn.getAttribute('data-editorial-tab');
          home2TabBtns.forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');

          home2TabPanes.forEach((pane) => {
            if (pane.getAttribute('data-editorial-pane') === target) {
              pane.classList.remove('d-none');
              if (window.gsap) {
                gsap.fromTo(
                  pane,
                  { opacity: 0, x: 12 },
                  { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out', clearProps: 'all' }
                );
              }
            } else {
              pane.classList.add('d-none');
            }
          });
        });
      });
    }

    /* ----------------------------------------------------------------------
       6. QUICK FINDER FORMS (Home 1 & Home 2) -> ROUTE TO CONTACT OR FILTER
       ---------------------------------------------------------------------- */
    const quickFinderForms = document.querySelectorAll('.js-quick-finder-form');
    quickFinderForms.forEach((form) => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const cat = form.querySelector('[name="category"]')?.value || '';
        const sched = form.querySelector('[name="schedule"]')?.value || '';
        const loc = form.querySelector('[name="location"]')?.value || '';

        const params = new URLSearchParams();
        if (cat) params.set('category', cat);
        if (sched) params.set('schedule', sched);
        if (loc) params.set('location', loc);

        window.location.href = `contact.html?${params.toString()}#enquiry-form`;
      });
    });

    /* ----------------------------------------------------------------------
       7. PRE-FILL CONTACT FORM FROM URL PARAMETERS
       ---------------------------------------------------------------------- */
    const contactForm = document.getElementById('placementEnquiryForm');
    if (contactForm) {
      const urlParams = new URLSearchParams(window.location.search);
      const paramCategory = urlParams.get('category');
      const paramSchedule = urlParams.get('schedule');
      const paramLocation = urlParams.get('location');
      const paramRef = urlParams.get('ref');

      if (paramCategory) {
        const catSelect = contactForm.querySelector('[name="category"]');
        if (catSelect) {
          Array.from(catSelect.options).forEach((opt) => {
            if (opt.value.toLowerCase() === paramCategory.toLowerCase() || opt.text.toLowerCase().includes(paramCategory.toLowerCase())) {
              catSelect.value = opt.value;
            }
          });
        }
      }

      if (paramSchedule) {
        const schedSelect = contactForm.querySelector('[name="schedule"]');
        if (schedSelect) {
          Array.from(schedSelect.options).forEach((opt) => {
            if (opt.value.toLowerCase() === paramSchedule.toLowerCase() || opt.text.toLowerCase().includes(paramSchedule.toLowerCase())) {
              schedSelect.value = opt.value;
            }
          });
        }
      }

      if (paramLocation) {
        const locInput = contactForm.querySelector('[name="location"]');
        if (locInput) locInput.value = paramLocation;
      }

      if (paramRef) {
        const reqTextarea = contactForm.querySelector('[name="requirements"]');
        if (reqTextarea && !reqTextarea.value) {
          reqTextarea.value = `Interested in candidates with a background similar to ${paramRef}. `;
        }
      }
    }

    /* ----------------------------------------------------------------------
       8. PASSWORD VISIBILITY TOGGLES & PASSWORD STRENGTH (Login & Sign Up)
       ---------------------------------------------------------------------- */
    document.querySelectorAll('[data-toggle-password]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-toggle-password');
        const input = document.getElementById(targetId);
        const icon = btn.querySelector('i');
        if (!input) return;

        if (input.type === 'password') {
          input.type = 'text';
          if (icon) icon.className = 'bi bi-eye-slash';
          btn.setAttribute('aria-label', 'Hide password');
        } else {
          input.type = 'password';
          if (icon) icon.className = 'bi bi-eye';
          btn.setAttribute('aria-label', 'Show password');
        }
      });
    });

    const signupPasswordInput = document.getElementById('signupPassword');
    const strengthBar = document.getElementById('passwordStrengthBar');
    const strengthText = document.getElementById('passwordStrengthText');

    if (signupPasswordInput && strengthBar && strengthText) {
      signupPasswordInput.addEventListener('input', () => {
        const val = signupPasswordInput.value;
        let score = 0;
        if (val.length >= 8) score += 25;
        if (/[A-Z]/.test(val)) score += 25;
        if (/[0-9]/.test(val)) score += 25;
        if (/[^A-Za-z0-9]/.test(val)) score += 25;

        strengthBar.style.width = `${score}%`;
        if (score === 0) {
          strengthBar.className = 'progress-bar bg-secondary';
          strengthText.textContent = 'Enter at least 8 characters';
        } else if (score <= 50) {
          strengthBar.className = 'progress-bar bg-warning';
          strengthText.textContent = 'Moderate password — add numbers or symbols';
        } else {
          strengthBar.className = 'progress-bar bg-success';
          strengthText.textContent = 'Strong password';
        }
      });
    }

    /* ----------------------------------------------------------------------
       9. FRONTEND FORM VALIDATION & HONEST SUBMISSION FEEDBACK
       ---------------------------------------------------------------------- */
    // A. Contact Placement Enquiry Form
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!contactForm.checkValidity()) {
          e.stopPropagation();
          contactForm.classList.add('was-validated');
          return;
        }

        const nameVal = contactForm.querySelector('[name="name"]')?.value || 'Client';
        const catVal = contactForm.querySelector('[name="category"]')?.value || 'Domestic Help';
        const schedVal = contactForm.querySelector('[name="schedule"]')?.value || 'Preferred Schedule';
        const locVal = contactForm.querySelector('[name="location"]')?.value || 'Your Area';

        const feedbackBox = document.getElementById('contactFormFeedback');
        if (feedbackBox) {
          feedbackBox.innerHTML = `
            <div class="alert alert-success border-0 shadow-sm rounded-4 p-4 mt-4" role="alert">
              <div class="d-flex align-items-start gap-3">
                <i class="bi bi-check-circle-fill fs-3 text-success"></i>
                <div>
                  <h5 class="alert-heading mb-1">Enquiry Recorded (Frontend Template Preview)</h5>
                  <p class="mb-2 small">Thank you, <strong>${escapeHtml(nameVal)}</strong>. Your placement enquiry for <strong>${escapeHtml(catVal)} (${escapeHtml(schedVal)})</strong> in <strong>${escapeHtml(locVal)}</strong> has been validated on the client side.</p>
                  <p class="mb-0 small text-muted"><em>Note: This is a frontend template demonstration and is not connected to a live staff placement database. In production, a placement counselor would respond within 4 business hours.</em></p>
                </div>
              </div>
            </div>
          `;
          feedbackBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        contactForm.reset();
        contactForm.classList.remove('was-validated');
      });
    }

    // B. Login Form
    const loginForm = document.getElementById('clientLoginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!loginForm.checkValidity()) {
          e.stopPropagation();
          loginForm.classList.add('was-validated');
          return;
        }
        const identity = loginForm.querySelector('[name="identity"]')?.value || 'Client';
        const feedback = document.getElementById('loginFeedback');
        if (feedback) {
          feedback.innerHTML = `
            <div class="alert alert-info border-0 rounded-3 p-3 mt-3 small" role="alert">
              <i class="bi bi-info-circle-fill me-2"></i>
              <strong>Frontend Authentication Demo:</strong> Credentials for <strong>${escapeHtml(identity)}</strong> passed frontend validation. Connect this form to your authentication API to enable live client portal sessions.
            </div>
          `;
        }
      });
    }

    // C. Sign Up Form
    const signupForm = document.getElementById('clientSignupForm');
    if (signupForm) {
      signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const pass = document.getElementById('signupPassword');
        const confirmPass = document.getElementById('signupConfirmPassword');
        const mismatchFeedback = document.getElementById('confirmPasswordFeedback');

        if (pass && confirmPass && pass.value !== confirmPass.value) {
          confirmPass.setCustomValidity('Passwords do not match');
          if (mismatchFeedback) mismatchFeedback.textContent = 'Passwords must match exactly.';
        } else if (confirmPass) {
          confirmPass.setCustomValidity('');
        }

        if (!signupForm.checkValidity()) {
          e.stopPropagation();
          signupForm.classList.add('was-validated');
          return;
        }

        const fullName = signupForm.querySelector('[name="fullName"]')?.value || 'Client';
        const feedback = document.getElementById('signupFeedback');
        if (feedback) {
          feedback.innerHTML = `
            <div class="alert alert-success border-0 rounded-3 p-3 mt-3 small" role="alert">
              <i class="bi bi-check-circle-fill me-2"></i>
              <strong>Registration Validated (Frontend Demo):</strong> Welcome, <strong>${escapeHtml(fullName)}</strong>! Your registration details passed all validation checks. Connect a backend service to persist client accounts.
            </div>
          `;
        }
        signupForm.reset();
        signupForm.classList.remove('was-validated');
        if (strengthBar) strengthBar.style.width = '0%';
      });

      const confirmInput = document.getElementById('signupConfirmPassword');
      if (confirmInput) {
        confirmInput.addEventListener('input', () => {
          confirmInput.setCustomValidity('');
        });
      }
    }

    // D. Forgot Password Modal Form
    const forgotForm = document.getElementById('forgotPasswordForm');
    if (forgotForm) {
      forgotForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!forgotForm.checkValidity()) {
          e.stopPropagation();
          forgotForm.classList.add('was-validated');
          return;
        }
        const emailVal = forgotForm.querySelector('input')?.value || '';
        const msgEl = document.getElementById('forgotPasswordFeedback');
        if (msgEl) {
          msgEl.innerHTML = `
            <div class="alert alert-success small mb-0 mt-3">
              <i class="bi bi-check2-circle me-1"></i> Password reset instructions simulated for <strong>${escapeHtml(emailVal)}</strong> (Frontend Demo).
            </div>
          `;
        }
        forgotForm.reset();
        forgotForm.classList.remove('was-validated');
      });
    }

    // E. Footer Newsletter / Placement Guide Form
    document.querySelectorAll('.js-newsletter-form').forEach((nForm) => {
      nForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = nForm.querySelector('input[type="email"]');
        const msgBox = nForm.querySelector('.js-newsletter-msg');
        if (!emailInput || !emailInput.value.trim() || !emailInput.checkValidity()) {
          if (msgBox) {
            msgBox.innerHTML = `<span class="text-warning small">Please enter a valid email address.</span>`;
          }
          return;
        }
        if (msgBox) {
          msgBox.innerHTML = `<span class="text-info small"><i class="bi bi-check2-circle me-1"></i>Subscribed to our Household Staffing Guide (Frontend Demo).</span>`;
        }
        nForm.reset();
      });
    });

    // F. Client Dashboard Tab Navigation & Sidebar Interactions
    const dashboardTabBtns = document.querySelectorAll('[data-dashboard-tab]');
    const dashboardTabPanes = document.querySelectorAll('[data-dashboard-pane]');
    const sidebar = document.getElementById('dashboardSidebar');
    const sidebarBackdrop = document.getElementById('sidebarBackdrop');
    const sidebarOpenBtn = document.getElementById('sidebarOpenBtn');
    const sidebarCloseBtn = document.getElementById('sidebarCloseBtn');

    if (sidebarOpenBtn && sidebar) {
      sidebarOpenBtn.addEventListener('click', () => {
        sidebar.classList.add('show');
        if (sidebarBackdrop) sidebarBackdrop.classList.add('show');
      });
    }

    if (sidebarCloseBtn && sidebar) {
      sidebarCloseBtn.addEventListener('click', () => {
        sidebar.classList.remove('show');
        if (sidebarBackdrop) sidebarBackdrop.classList.remove('show');
      });
    }

    if (sidebarBackdrop && sidebar) {
      sidebarBackdrop.addEventListener('click', () => {
        sidebar.classList.remove('show');
        sidebarBackdrop.classList.remove('show');
      });
    }

    if (dashboardTabBtns.length > 0 && dashboardTabPanes.length > 0) {
      dashboardTabBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
          const target = btn.getAttribute('data-dashboard-tab');
          if (!target) return;

          // Sync active class across both sidebar nav items and in-page buttons
          dashboardTabBtns.forEach((b) => {
            if (b.getAttribute('data-dashboard-tab') === target) {
              b.classList.add('active');
            } else {
              b.classList.remove('active');
            }
          });

          // Show targeted pane
          dashboardTabPanes.forEach((pane) => {
            if (pane.getAttribute('data-dashboard-pane') === target) {
              pane.classList.remove('d-none');
              if (window.gsap) {
                gsap.fromTo(
                  pane,
                  { opacity: 0, y: 12 },
                  { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out', clearProps: 'all' }
                );
              }
            } else {
              pane.classList.add('d-none');
            }
          });

          // Close mobile sidebar on item select
          if (sidebar && sidebar.classList.contains('show')) {
            sidebar.classList.remove('show');
            if (sidebarBackdrop) sidebarBackdrop.classList.remove('show');
          }
        });
      });
    }

    // G. Dashboard Helper Request Form
    const dashboardRequestForm = document.getElementById('dashboardRequestForm');
    if (dashboardRequestForm) {
      dashboardRequestForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!dashboardRequestForm.checkValidity()) {
          e.stopPropagation();
          dashboardRequestForm.classList.add('was-validated');
          return;
        }

        const role = dashboardRequestForm.querySelector('[name="requestedRole"]')?.value || 'Domestic Helper';
        const shift = dashboardRequestForm.querySelector('[name="requestedShift"]')?.value || 'Full-Time';
        const feedbackEl = document.getElementById('dashboardRequestFeedback');

        if (feedbackEl) {
          feedbackEl.innerHTML = `
            <div class="alert alert-success border-0 shadow-sm rounded-4 p-4 mt-4" role="alert">
              <div class="d-flex align-items-start gap-3">
                <i class="bi bi-check-circle-fill fs-3 text-success"></i>
                <div>
                  <h5 class="alert-heading mb-1">New Helper Request Submitted (Ref #REQ-${Math.floor(1000 + Math.random() * 9000)})</h5>
                  <p class="mb-2 small">Your request for <strong>${escapeHtml(role)} (${escapeHtml(shift)})</strong> has been logged to your account. Your dedicated counselor will share 2 to 4 screened candidate dossiers within 48 business hours.</p>
                  <p class="mb-0 small text-muted"><em>Placement tracking status updated to "Screening Shortlist in Progress".</em></p>
                </div>
              </div>
            </div>
          `;
          feedbackEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        dashboardRequestForm.reset();
        dashboardRequestForm.classList.remove('was-validated');
      });
    }

    /* ----------------------------------------------------------------------
       10. SUBTLE PERFORMANCE-CONSCIOUS GSAP ANIMATIONS
       ---------------------------------------------------------------------- */
    if (window.gsap) {
      const revealEls = document.querySelectorAll('.js-gsap-reveal');
      revealEls.forEach((el, idx) => {
        gsap.from(el, {
          opacity: 0,
          y: 18,
          duration: 0.55,
          delay: Math.min(idx * 0.06, 0.25),
          ease: 'power2.out',
          clearProps: 'all'
        });
      });
    }
  });

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
})();

