/* ==========================================================================
   PORTFOLIO INTERACTIVE LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Dynamic Year Footer Update
  const currentYearEl = document.getElementById('current-year');
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }

  // 2. Navbar Scroll Style & Mobile Toggle
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const isExpanded = navMenu.classList.contains('active');
      navToggle.setAttribute('aria-expanded', isExpanded);
      navToggle.querySelector('i').className = isExpanded ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        if (navToggle.querySelector('i')) {
          navToggle.querySelector('i').className = 'fa-solid fa-bars';
        }
      });
    });
  }

  // 3. Dynamic Typing Effect in Hero
  const roleTextEl = document.getElementById('role-text');
  if (roleTextEl) {
    const roles = [
      'CAD & Part Drawings',
      'Technical Documents',
      'Concept Demonstrations',
      'Innovation Projects',
      'Me'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeEffectSpeed = 100;

    function typeEffect() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        roleTextEl.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typeEffectSpeed = 50;
      } else {
        roleTextEl.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typeEffectSpeed = 100;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typeEffectSpeed = 2000; // Pause at end
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeEffectSpeed = 500; // Pause before typing next word
      }

      setTimeout(typeEffect, typeEffectSpeed);
    }

    setTimeout(typeEffect, 500);
  }

  // 4. Tab Switching Logic
  const tabLinks = document.querySelectorAll('.nav-link[data-tab]');
  const tabContents = document.querySelectorAll('.tab-content');

  function switchTab(tabId) {
    // Hide all tabs
    tabContents.forEach(tab => {
      tab.classList.remove('active');
    });
    // Remove active class from all links
    tabLinks.forEach(link => {
      link.classList.remove('active');
    });

    // Show selected tab
    const targetTab = document.getElementById(`tab-${tabId}`);
    if (targetTab) {
      targetTab.classList.add('active');
      // Scroll to top of tab smoothly
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Set active class on the corresponding link
    const targetLink = document.querySelector(`.nav-link[data-tab="${tabId}"]`);
    if (targetLink) {
      targetLink.classList.add('active');
    }
  }

  tabLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const tabId = link.getAttribute('data-tab');
      switchTab(tabId);
    });
  });

  const footerTabLinks = document.querySelectorAll('.footer-tab-link[data-tab]');
  footerTabLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const tabId = link.getAttribute('data-tab');
      switchTab(tabId);
    });
  });

  // Handle Contact CTA Trigger
  const contactTrigger = document.getElementById('nav-contact-trigger');
  if (contactTrigger) {
    contactTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      // Contact section is embedded inside the home tab
      switchTab('home');
      setTimeout(() => {
        const contactSection = document.getElementById('contact-section');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 350);
    });
  }

  // 4b. Collapsible Academics drawers
  const drawerButtons = document.querySelectorAll('.drawer-toggle-btn');
  drawerButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const drawerId = btn.getAttribute('data-drawer-id');
      const drawer = document.getElementById(drawerId);
      if (drawer) {
        drawer.classList.toggle('active');
        btn.classList.toggle('active');
        const isActive = drawer.classList.contains('active');
        btn.querySelector('span').textContent = isActive ? 'Hide Course Outcomes' : 'View Course Outcomes';
      }
    });
  });

  // 4c. Collapsible LSI Multi-Disciplinary Breakdown Drawer
  const lsiToggleBtn = document.getElementById('lsi-breakdown-toggle');
  const lsiDrawer = document.getElementById('lsi-disciplines-drawer');
  if (lsiToggleBtn && lsiDrawer) {
    lsiToggleBtn.addEventListener('click', () => {
      const isActive = lsiDrawer.classList.toggle('active');
      lsiToggleBtn.classList.toggle('active');
      const labelSpan = lsiToggleBtn.querySelector('.btn-text');
      if (labelSpan) {
        labelSpan.textContent = isActive
          ? 'Hide Technical Breakdown'
          : 'View Full Technical Breakdown (6 Disciplines)';
      }
    });
  }

  // 5. Engineering Portfolio Case Studies & Deliverables Data
  const defaultProjects = {
    "pole-generator": {
      title: "Parametric Pole Generator",
      company: "LSI Industries",
      date: "May 2026 – August 2026",
      category: "industry",
      summary: "Authored 8,000+ lines of custom rule-based code in Autodesk Inventor to automate 3D modeling of straight and tapered poles, enforcing predetermined physical limits to boost design efficiency by 600%.",
      longDescription: "Engineered a robust parametric design tool in Autodesk Inventor to automate the 3D modeling of custom straight and tapered commercial lighting poles. Authoring over 8,000 lines of custom iLogic code and Form UI controls, the tool replaces manual CAD modeling by enforcing strict predetermined physical limits—including baseplate clearances, bolt circle nut bounds, tenon proportions, and size-specific height limits—to prevent geometry breaks. The system automatically rebuilds 3D assemblies, decouples standalone component copies, and manages Autodesk Vault check-ins, increasing engineering turn-around efficiency by 600%. I authored an 11-page SOP and User Guide detailing operation and rule troubleshooting.",
      tags: ["Autodesk Inventor", "iLogic Automation", "Parametric Modeling", "Fail-Safe Design", "SOP & User Guide", "Vault PDM"],
      files: [
        {
          title: "Straight Pole Generator Demo",
          typeLabel: "Software Demo (MP4)",
          typeBadge: "MP4",
          thumbType: "video",
          icon: "fa-solid fa-circle-play",
          caption: "Live screen demonstration of the Straight Pole Generator in Autodesk Inventor, showing dynamic form parameter inputs, feature suppression, and automated 3D model generation.",
          path: "./assets/engineering-files/videos/Straight_Generator.mp4"
        },
        {
          title: "RTP Generator Demo (Tapered Poles)",
          typeLabel: "Software Demo (MP4)",
          typeBadge: "MP4",
          thumbType: "video",
          icon: "fa-solid fa-circle-play",
          caption: "Live screen demonstration of the Round Tapered Pole (RTP) Generator, highlighting automated tapered pole sizing, baseplate validation, rule limits, and Vault export.",
          path: "./assets/engineering-files/videos/RTP_Generator.mp4"
        },
        {
          title: "Pole Generators User Guide & SOP",
          typeLabel: "User Guide & SOP (PDF)",
          typeBadge: "PDF",
          thumbType: "pdf",
          icon: "fa-solid fa-file-pdf",
          caption: "Official 11-page user guide & SOP detailing how to find/check out assemblies in Vault, use the iLogic Form, manage 7 core rules, rebuild geometry, and troubleshoot errors.",
          path: "./assets/engineering-files/documents/pole-generators-user-guide.pdf"
        }
      ]
    },
    "end-cap-redesign": {
      title: "Die-Casted End Cap Redesign",
      company: "LSI Industries",
      date: "June 2026 – August 2026",
      category: "industry",
      summary: "Redesigned die-cast aluminum end caps for the LAW2 luminaire line. Integrated a positive mechanical stop to prevent gasket over-compression and achieved a $1.34/unit cost reduction by redesigning screw holes to eliminate a second manufactured cover.",
      longDescription: "At LSI Industries, I analyzed seal failure modes in the LAW2 luminaire assembly caused by gasket over-compression. In Autodesk Inventor, I re-engineered the die-cast aluminum end cap geometry to integrate a physical mechanical stop that maintains optimal gasket compression. Additionally, I redesigned the screw hole configuration to eliminate the need for a second manufactured cover, reducing unit production costs by $1.34 while streamlining assembly and ensuring watertight sealing.",
      tags: ["Die Casting", "Mechanical Stop", "Cost Reduction (-$1.34)", "Autodesk Inventor", "Part Consolidation"],
      files: [
        {
          title: "Prototype & Gasket Assembly",
          typeLabel: "Physical Part",
          typeBadge: "PHOTO",
          thumbType: "img",
          previewImg: "./assets/images/law2-end-cap-landscape.jpg",
          icon: "fa-solid fa-image",
          caption: "Studio photograph of the redesigned die-cast end cap featuring the integrated mechanical stop and gasket seal assembly.",
          path: "./assets/images/law2-end-cap-landscape.jpg"
        },
        {
          title: "End Cap Drawing (918466.dwg)",
          typeLabel: "CAD Drawing (PDF)",
          typeBadge: "DWG",
          thumbType: "blueprint",
          icon: "fa-solid fa-compass-drafting",
          caption: "Official 3-sheet manufacturing blueprint detailing Section A-A/B-B, 0.050\" raised mechanical stop, A383/ADC12 die-cast tolerances, NADCA checklist, and paint coverage.",
          path: "./assets/engineering-files/cad-drawings/918466-die-cast-end-cap-drawing.pdf"
        },
        {
          title: "Gasket Drawing (918024.dwg)",
          typeLabel: "CAD Drawing (PDF)",
          typeBadge: "DWG",
          thumbType: "blueprint",
          icon: "fa-solid fa-compass-drafting",
          caption: "Manufacturing drawing detailing closed cell silicone sponge material, 40% compression deflection, AMS 3195 specs, and pressure-sensitive adhesive (PSA) backing.",
          path: "./assets/engineering-files/cad-drawings/918024-gasket-specification-drawing.pdf"
        },
        {
          title: "LAW2 Endcap Redesigns Presentation",
          typeLabel: "Engineering Presentation (PDF)",
          typeBadge: "PDF",
          thumbType: "ppt",
          icon: "fa-solid fa-file-powerpoint",
          caption: "16-slide engineering presentation detailing old end cap failure modes, 9 design iterations (Up Down & Up Down Drop), mechanical stop integration, and cost reductions (-$1.34/unit).",
          path: "./assets/engineering-files/presentations/law2-endcap-redesigns-presentation.pdf"
        }
      ]
    },
    "sheet-metal-light-shield": {
      title: "4 Sided Sheet-Metal Light Shield",
      company: "LSI Industries",
      date: "July 2026",
      category: "industry",
      summary: "Modeled a 4-sided sheet-metal light shield in Autodesk Inventor, authoring a 2-sheet production drawing with formed dimensions and flat-pattern blank views.",
      longDescription: "Modeled a 4-sided sheet-metal light shield in Autodesk Inventor for commercial luminaire housings using .050\" 3003-H14 aluminum. I authored an official 2-sheet manufacturing blueprint detailing 90° formed dimensions, mounting hole patterns, and flat-pattern blank layouts for production.",
      tags: ["Sheet Metal Design", "Autodesk Inventor", "Design for Manufacturing"],
      files: [
        {
          title: "Light Shield Drawing (922004.dwg)",
          typeLabel: "CAD Drawing (PDF)",
          typeBadge: "DWG",
          thumbType: "blueprint",
          icon: "fa-solid fa-compass-drafting",
          caption: "Official 2-sheet manufacturing blueprint (DWG 922004) detailing formed views, in-line mounting hole patterns, formed dimensions, and sheet 2 flat-pattern blank layout with 90° bend lines.",
          path: "./assets/engineering-files/cad-drawings/922004-light-shield-drawing.pdf"
        }
      ]
    },
    "pipe-fusion-welder": {
      title: "Pipe Butt Fusion Welder",
      company: "Auburn University",
      class: "MECH 2220 • Computer-Aided Design",
      date: "Spring 2024",
      category: "cad",
      summary: "Collaborated in an engineering team to design a compact, inexpensive, and easy-to-assemble thermoplastic pipe butt fusion welder using SolidWorks.",
      longDescription: "In my Computer-Aided Design class at Auburn University, I worked within an engineering group to design a small, inexpensive, and easy-to-assemble thermoplastic pipe butt fusion welder. Industrial fusion equipment is often heavy, complicated, and costly; our objective was to design a lightweight, modular alternative that maintains precise pipe alignment and uniform clamping force. We modeled the complete mechanical assembly in SolidWorks, selecting off-the-shelf fasteners and simplified structural plates to keep fabrication costs minimal and make assembly fast and intuitive.",
      tags: ["SolidWorks", "Fabrication Guide", "Parametric Model", "Teamwork", "Coordination"],
      files: [
        {
          title: "SolidWorks 3D CAD Model Render",
          typeLabel: "CAD Model",
          typeBadge: "CAD",
          thumbType: "img",
          previewImg: "./assets/images/pipe-butt-fusion-welder.png",
          previewFit: "contain",
          icon: "fa-solid fa-cube",
          caption: "High-resolution SolidWorks 3D CAD model rendering of the thermoplastic pipe butt fusion welder, showing clamping jaws, guide rails, toggle linkage, and heating plate element.",
          path: "./assets/images/pipe-butt-fusion-welder.png"
        },
        {
          title: "Welder Fabrication Guide",
          typeLabel: "Fabrication Guide",
          typeBadge: "PDF",
          thumbType: "pdf",
          icon: "fa-solid fa-file-lines",
          caption: "Comprehensive 9-page step-by-step manufacturing guide detailing waterjet cutting, face milling, hole drilling, and tapping for all clamp units, lever arms, and heating jigs.",
          path: "./assets/engineering-files/documents/butt-fusion-fabrication-guide.pdf"
        }
      ]
    },
    "machined-pen-holder": {
      title: "Machined Pen Holder",
      company: "Auburn University",
      class: "MECH 2020 • Manufacturing Technology Lab",
      date: "Fall 2024",
      category: "manufacturing",
      summary: "Precision-machined custom aluminum pen holder manufactured on manual lathes and manual mills, finishing with a 95% on the rigorous metrology inspection rubric.",
      longDescription: "Executed complete manufacturing and machining operations for an aluminum desk pen holder as part of the Manufacturing Technology Lab (MECH 2020). Performed facing, turning, precision boring, and chamfering on a manual lathe, followed by facing, hole machining, tapping, and reaming on a manual mill. Inspected final tolerances using dial calipers, depth micrometers, and height gages against engineering blueprints, finishing with a 95% on the DML dimensional inspection grading rubric.",
      tags: ["Manual Lathe", "Manual Mill", "Metrology", "95% Final Grade", "MECH 2020"],
      files: [
        {
          title: "Finished Pen Holder Assembly",
          typeLabel: "Finished Assembly",
          typeBadge: "PHOTO",
          thumbType: "img",
          previewImg: "./assets/images/pen-holder-finished-assembly.jpg",
          icon: "fa-solid fa-image",
          caption: "Completed multi-piece aluminum pen holder assembly showing the turned and bored cylinder, locating pin, and precision-milled baseplate.",
          path: "./assets/images/pen-holder-finished-assembly.jpg"
        },
        {
          title: "Raw Round Stock",
          typeLabel: "Cylinder Stock",
          typeBadge: "PHOTO",
          thumbType: "img",
          previewImg: "./assets/images/pen-holder-round-stock.jpg",
          icon: "fa-solid fa-image",
          caption: "Solid cylindrical aluminum round bar stock prior to manual lathe facing, OD turning, deep boring, and chamfering.",
          path: "./assets/images/pen-holder-round-stock.jpg"
        },
        {
          title: "Raw Baseplate Stock",
          typeLabel: "Base Stock",
          typeBadge: "PHOTO",
          thumbType: "img",
          previewImg: "./assets/images/pen-holder-base-stock.jpg",
          icon: "fa-solid fa-image",
          caption: "ASTM-B221 certified aluminum rectangular bar stock prior to manual mill facing, hole machining, tapping, and reaming.",
          path: "./assets/images/pen-holder-base-stock.jpg"
        },
        {
          title: "Drawings & Grading Rubric",
          typeLabel: "Drawings & Rubric",
          typeBadge: "PDF",
          thumbType: "blueprint",
          icon: "fa-solid fa-compass-drafting",
          caption: "Official 5-page manufacturing drawing package (Plate P.1, Stub P.2, Card Stub P.3) and DML metrology inspection grading rubric, finishing with a 95% score.",
          path: "./assets/engineering-files/cad-drawings/pen-holder-drawings-and-rubric.pdf"
        }
      ]
    },
    "bracket-competition": {
      title: "Bracket Competition",
      company: "Auburn University",
      class: "MECH 1110 • Introduction to Engineering",
      date: "August 2024 – December 2024",
      category: "cad",
      summary: "Served as Group Leader in a team engineering competition, utilizing SolidWorks to design and structurally optimize a load-bearing bracket that held 78 lbs to secure 1st place.",
      longDescription: "Served as Group Leader in Introduction to Engineering (MECH 1110) at Auburn University for a competitive bracket design challenge. Led a student team to model, analyze, and structurally optimize a custom bracket in SolidWorks, balancing minimal material usage against peak stress concentrations under load. Conducted structural simulations and rapid design iterations to reinforce critical fillet geometries and load-bearing flanges, culminating in a bracket that held 78 lbs during static load testing to win 1st place in the class competition.",
      tags: ["SolidWorks", "Group Leader", "1st Place (78 lbs)", "Structural Optimization", "MECH 1110", "FEA Analysis"],
      files: [
        {
          title: "FEA von Mises Stress Study",
          typeLabel: "FEA Stress Study",
          typeBadge: "FEA",
          thumbType: "img",
          previewImg: "./assets/images/bracket-fea-stress-simulation.png",
          icon: "fa-solid fa-chart-area",
          caption: "Finite element analysis in SolidWorks Simulation displaying von Mises stress distribution under static load, showing peak stress of 792.9 psi against 3,000 psi yield strength.",
          path: "./assets/images/bracket-fea-stress-simulation.png"
        },
        {
          title: "FEA Displacement Analysis",
          typeLabel: "FEA Displacement",
          typeBadge: "FEA",
          thumbType: "img",
          previewImg: "./assets/images/bracket-fea-displacement-simulation.png",
          icon: "fa-solid fa-arrows-up-down",
          caption: "Static displacement analysis in SolidWorks Simulation probing vertical deflection of -0.0136 inches at the cantilever loading eye under downward load.",
          path: "./assets/images/bracket-fea-displacement-simulation.png"
        }
      ]
    }
  };

  // Direct reference for maximum reliability
  let projectsData = defaultProjects;

  const modalOverlay = document.getElementById('project-modal');
  const modalClose = document.getElementById('modal-close');
  const modalBody = document.getElementById('modal-body');

  // 6. Custom Viewer Modal Rendering Logic (Case Study + Multi-File Deliverables)
  function openProjectModal(projectId) {
    const project = projectsData[projectId];
    if (!project) return;

    const tagsHtml = (project.tags || []).map(t => `<span>${t}</span>`).join('');
    
    const filesHtml = (project.files || []).map(file => {
      const pathLower = (file.path || '').toLowerCase();
      const labelLower = (file.typeLabel || '').toLowerCase();
      const isVideo = pathLower.endsWith('.mp4') || pathLower.endsWith('.webm') || (file.typeBadge || '').toUpperCase() === 'MP4' || labelLower.includes('video');
      const actionText = isVideo ? 'Watch Video' : 'Open File';
      const actionIcon = isVideo ? 'fa-solid fa-play' : 'fa-solid fa-arrow-up-right-from-square';

      return `
      <div class="project-file-item">
        <div class="project-file-icon-box" style="${isVideo ? 'color: #a855f7; border-color: rgba(168, 85, 247, 0.3);' : ''}">
          <i class="${file.icon || (isVideo ? 'fa-solid fa-circle-play' : 'fa-solid fa-file')}"></i>
        </div>
        <div class="project-file-content">
          <div class="project-file-title-row">
            <h5 class="project-file-title">${file.title}</h5>
            <span class="file-type-badge" style="${isVideo ? 'background: rgba(168, 85, 247, 0.15); color: #c084fc; border-color: rgba(168, 85, 247, 0.3);' : ''}">${file.typeLabel || 'Document'}</span>
          </div>
          <p class="project-file-caption">${file.caption || ''}</p>
        </div>
        <div class="project-file-action-btn">
          <a href="${file.path}" target="_blank" class="btn btn-secondary btn-sm" title="${isVideo ? 'Watch video' : 'Open or download file'}">
            <i class="${actionIcon}"></i> ${actionText}
          </a>
        </div>
      </div>
    `;
    }).join('');

    modalBody.innerHTML = `
      <div class="modal-project-header">
        <span class="section-tag" style="margin-bottom:8px;">Project Case Study</span>
        <h3 class="modal-title" style="font-size:1.8rem; margin-bottom:8px;">${project.title}</h3>
        <div class="modal-project-meta">
          ${project.class ? `<span><i class="fa-solid fa-graduation-cap"></i> ${project.class}</span>` : ''}
          <span><i class="fa-solid fa-calendar"></i> ${project.date || 'Project'}</span>
          <span><i class="fa-solid fa-folder"></i> ${(project.files || []).length} Files</span>
        </div>
        <div class="project-tags" style="margin-bottom:15px;">
          ${tagsHtml}
        </div>
      </div>

      <div style="background:var(--bg-secondary); padding:22px; border-radius:var(--radius-sm); border:1px solid var(--border-color); margin-bottom:20px;">
        <h4 style="color:var(--accent-cyan); font-weight:700; margin-bottom:10px; font-size:1.05rem;">
          <i class="fa-solid fa-circle-info" style="margin-right:6px;"></i> Project Overview & Engineering Rationale
        </h4>
        <p style="color:var(--text-secondary); line-height:1.7; font-size:0.98rem; margin:0;">
          ${project.longDescription || project.summary}
        </p>
      </div>

      <div class="project-files-section">
        <div class="project-files-header">
          <h4><i class="fa-solid fa-folder-open"></i> Project Files</h4>
          <span style="font-size:0.85rem; color:var(--text-muted); font-family:var(--font-mono);">Click below to inspect or open each file</span>
        </div>
        <div class="project-files-list">
          ${filesHtml}
        </div>
      </div>
    `;

    modalOverlay.classList.add('active');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Prevent scroll
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  // 7. Render Projects Grid Function (Split into LSI Industries & Auburn University Groups)
  function renderProjectsGrid() {
    const lsiGrid = document.getElementById('lsi-projects-grid');
    const auburnGrid = document.getElementById('auburn-projects-grid');
    const fallbackGrid = document.getElementById('portfolio-grid');

    if (lsiGrid) lsiGrid.innerHTML = '';
    if (auburnGrid) auburnGrid.innerHTML = '';
    if (fallbackGrid) fallbackGrid.innerHTML = '';

    Object.keys(projectsData).forEach(id => {
      const project = projectsData[id];

      const card = document.createElement('article');
      card.className = `project-horizontal-card glass-card`;
      card.setAttribute('data-project', id);

      const tagsHtml = (project.tags || []).map(t => `<span>${t}</span>`).join('');
      const fileCount = (project.files || []).length;

      // Visual file preview cards
      const filesPreviewHtml = (project.files || []).map(file => {
        let thumbClass = file.thumbType || 'thumb-doc';
        let cornerBadge = file.typeBadge || 'DOC';
        let fileIcon = file.icon || 'fa-solid fa-file';

        const pathLower = (file.path || '').toLowerCase();
        const labelLower = (file.typeLabel || '').toLowerCase();

        if (file.thumbType) {
          thumbClass = `thumb-${file.thumbType}`;
        } else if (pathLower.endsWith('.pdf') || labelLower.includes('cad') || labelLower.includes('drawing') || labelLower.includes('blueprint')) {
          thumbClass = 'thumb-blueprint';
          cornerBadge = 'PDF';
          fileIcon = 'fa-solid fa-compass-drafting';
        } else if (pathLower.endsWith('.docx') || pathLower.endsWith('.doc') || labelLower.includes('report') || labelLower.includes('doc')) {
          thumbClass = 'thumb-doc';
          cornerBadge = 'DOCX';
          fileIcon = 'fa-solid fa-file-lines';
        } else if (pathLower.endsWith('.pptx') || pathLower.endsWith('.ppt') || labelLower.includes('presentation') || labelLower.includes('slide')) {
          thumbClass = 'thumb-ppt';
          cornerBadge = 'PPTX';
          fileIcon = 'fa-solid fa-file-powerpoint';
        } else if (pathLower.endsWith('.mp4') || pathLower.endsWith('.webm') || pathLower.endsWith('.mov') || labelLower.includes('video') || labelLower.includes('demo') || labelLower.includes('recording')) {
          thumbClass = 'thumb-video';
          cornerBadge = 'MP4';
          fileIcon = 'fa-solid fa-circle-play';
        } else if (pathLower.endsWith('.jpg') || pathLower.endsWith('.png') || pathLower.endsWith('.jpeg') || file.previewImg || labelLower.includes('photo') || labelLower.includes('image')) {
          thumbClass = 'thumb-img';
          cornerBadge = 'PHOTO';
          fileIcon = 'fa-solid fa-image';
        }

        const isImg = Boolean(file.previewImg || (thumbClass === 'thumb-img' && file.path));
        const fitClass = file.previewFit ? `preview-fit-${file.previewFit}` : '';
        const isVideo = thumbClass === 'thumb-video' || pathLower.endsWith('.mp4') || labelLower.includes('video');
        const overlayText = isVideo ? 'Watch Video' : 'Open File';
        const overlayIcon = isVideo ? 'fa-solid fa-play' : 'fa-solid fa-arrow-up-right-from-square';

        const thumbGraphic = isImg
          ? `<img src="${file.previewImg || file.path}" alt="${file.title}" class="${fitClass}" />`
          : `<div class="file-thumb-icon"><i class="${fileIcon}"></i></div>`;

        return `
          <a href="${file.path}" target="_blank" rel="noopener" class="file-preview-card" title="Click to view ${file.title}">
            <div class="file-thumb-container ${thumbClass}">
              ${thumbGraphic}
              <span class="file-type-badge-corner">${file.typeBadge || cornerBadge}</span>
              <div class="file-hover-overlay">
                <i class="${overlayIcon}"></i>
                <span>${overlayText}</span>
              </div>
            </div>
            <div class="file-caption-area">
              <span class="file-caption-title">${file.title}</span>
            </div>
          </a>
        `;
      }).join('');

      card.innerHTML = `
        <!-- Left Side: Metadata (Dates & Class), Title, Narrative Description, Tags -->
        <div class="project-left">
          <div class="project-header-meta">
            <span class="project-date"><i class="fa-solid fa-calendar-days"></i> ${project.date}</span>
            ${(project.class || project.course) ? `<span class="project-class-badge"><i class="fa-solid fa-graduation-cap"></i> ${project.class || project.course}</span>` : ''}
          </div>
          <h3 class="project-horizontal-title">${project.title}</h3>
          <p class="project-horizontal-desc">${project.longDescription || project.summary}</p>
          <div class="project-tags">
            ${tagsHtml}
          </div>
        </div>

        <!-- Right Side: Visual File Previews (Neatly Arranged for 1 to 6 Files) -->
        <div class="project-right">
          <div class="project-files-header-row">
            <span class="project-files-header-title">
              <i class="fa-solid fa-folder-open"></i> Project Files
            </span>
            <span class="project-files-count"><i class="fa-solid fa-arrow-pointer"></i> Click to Open</span>
          </div>
          <div class="files-preview-grid files-grid-${Math.min(Math.max(fileCount, 1), 6)}">
            ${filesPreviewHtml}
          </div>
        </div>
      `;

      if (project.company.includes('LSI') && lsiGrid) {
        lsiGrid.appendChild(card);
      } else if (auburnGrid) {
        auburnGrid.appendChild(card);
      } else if (fallbackGrid) {
        fallbackGrid.appendChild(card);
      }
    });
  }

  // 8. Project Sub-Tabs Controller (LSI Industries vs Auburn University)
  const projectSubtabBtns = document.querySelectorAll('.project-subtab-btn');
  const projectSubtabPanes = document.querySelectorAll('.project-subtab-pane');

  projectSubtabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      projectSubtabBtns.forEach(b => b.classList.remove('active'));
      projectSubtabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetSubtab = btn.getAttribute('data-subtab');
      const targetPane = document.getElementById(`pane-${targetSubtab}`);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });


  // 9. Toast Notification Utility
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');

  function showToast(message) {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }

  // Copy Email Button
  const copyEmailBtn = document.getElementById('copy-email-btn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'ato0015@auburn.edu';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email address copied to clipboard!');
      }).catch(() => {
        showToast('Email: ato0015@auburn.edu');
      });
    });
  }

  // Contact Form Handling
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('user-name').value.trim();
      const email = document.getElementById('user-email').value.trim();
      const subject = document.getElementById('user-subject').value.trim();
      const message = document.getElementById('user-message').value.trim();

      if (!name || !email || !subject || !message) {
        showToast('Please fill out all form fields.');
        return;
      }

      showToast('Thank you! Your message has been sent successfully.');
      contactForm.reset();
    });
  }

  // Initial Run
  renderProjectsGrid();

});

