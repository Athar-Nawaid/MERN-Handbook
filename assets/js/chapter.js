/**
 * Chapter Page Engine
 * Handles sidebar generation, in-page TOC, code copy buttons, scrollspy,
 * reading progress bar, interview question filters, and navigation links.
 */

(function () {
  // Determine if running inside /chapters/ directory or root
  const isInsideChapters = window.location.pathname.includes("/chapters/") ||
                           document.body.classList.contains("chapter-page");

  function getRootRelative(path) {
    return isInsideChapters ? `../${path}` : path;
  }

  function getChapterRelative(slug) {
    return isInsideChapters ? slug : `chapters/${slug}`;
  }

  // Identify current chapter ID from document body or URL
  function detectCurrentChapter() {
    const bodyChapterId = document.body.getAttribute("data-chapter-id");
    if (bodyChapterId && window.getChapterById) {
      return window.getChapterById(bodyChapterId);
    }
    const currentSlug = window.location.pathname.split("/").pop();
    if (currentSlug && window.getChapterBySlug) {
      return window.getChapterBySlug(currentSlug);
    }
    return null;
  }

  // Injects reading progress bar at top of viewport
  function setupReadingProgressBar() {
    let bar = document.querySelector(".reading-progress-bar");
    if (!bar) {
      bar = document.createElement("div");
      bar.className = "reading-progress-bar";
      document.body.appendChild(bar);
    }

    window.addEventListener("scroll", () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      bar.style.width = `${scrolled}%`;
    });
  }

  // Builds and renders the full Sidebar Navigation
  function renderSidebar(currentChapter) {
    const sidebarEl = document.getElementById("book-sidebar");
    if (!sidebarEl || !window.BOOK_CURRICULUM) return;

    const stats = window.ProgressManager ? window.ProgressManager.getStats() : { completedCount: 0, total: 45, percent: 0, completedList: [], bookmarkedList: [] };

    let html = `
      <div class="sidebar-header">
        <div class="overall-progress-card">
          <div class="progress-info">
            <span>Course Progress</span>
            <span class="progress-percentage-text">${stats.percent}%</span>
          </div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill" style="width: ${stats.percent}%;"></div>
          </div>
          <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.4rem; display: flex; justify-content: space-between;">
            <span class="progress-fraction-text">${stats.completedCount} / ${stats.total} Chapters</span>
            <a href="${getRootRelative("index.html")}" style="color: var(--accent-primary); text-decoration: none; font-weight: 600;">Dashboard</a>
          </div>
        </div>
      </div>
    `;

    window.BOOK_CURRICULUM.parts.forEach((part) => {
      const isCurrentPart = currentChapter && currentChapter.partId === part.id;
      const collapsedClass = isCurrentPart ? "" : "collapsed";

      html += `
        <div class="sidebar-part ${collapsedClass}" data-part-id="${part.id}">
          <button class="part-title-btn" type="button" aria-expanded="${isCurrentPart ? "true" : "false"}">
            <span>${part.title.split(" — ")[0]} — ${part.title.split(" — ")[1] || ""}</span>
            <span class="part-chevron">▼</span>
          </button>
          <ul class="part-chapters">
      `;

      part.chapters.forEach((ch) => {
        const isActive = currentChapter && currentChapter.id === ch.id;
        const isCompleted = stats.completedList.includes(ch.id);
        const isBookmarked = stats.bookmarkedList.includes(ch.id);

        let dotClass = "";
        let dotTitle = "";
        if (isCompleted) {
          dotClass = "completed";
          dotTitle = "Completed";
        } else if (isBookmarked) {
          dotClass = "bookmarked";
          dotTitle = "Bookmarked for revision";
        }

        html += `
          <li class="chapter-nav-item" data-chapter-id="${ch.id}">
            <a href="${getChapterRelative(ch.slug)}" class="chapter-nav-link ${isActive ? "active" : ""}">
              <span class="chapter-status-dot ${dotClass}" title="${dotTitle}"></span>
              <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${ch.title}</span>
            </a>
          </li>
        `;
      });

      html += `
          </ul>
        </div>
      `;
    });

    sidebarEl.innerHTML = html;

    // Toggle part collapse
    sidebarEl.querySelectorAll(".part-title-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const partEl = btn.closest(".sidebar-part");
        const isCollapsed = partEl.classList.toggle("collapsed");
        btn.setAttribute("aria-expanded", !isCollapsed);
      });
    });

    // Mobile menu toggle
    const menuBtn = document.querySelector(".menu-toggle");
    if (menuBtn) {
      menuBtn.addEventListener("click", () => {
        sidebarEl.classList.toggle("open");
      });
    }

    // Close sidebar when clicking outside on mobile
    document.addEventListener("click", (e) => {
      if (window.innerWidth <= 860 && sidebarEl.classList.contains("open")) {
        if (!sidebarEl.contains(e.target) && !e.target.closest(".menu-toggle")) {
          sidebarEl.classList.remove("open");
        }
      }
    });
  }

  // Builds the in-page Table of Contents rail from h2 and h3 elements
  function renderTableOfContents() {
    const tocContainer = document.getElementById("chapter-toc");
    if (!tocContainer) return;

    const contentArea = document.querySelector(".content-inner");
    if (!contentArea) return;

    const headings = contentArea.querySelectorAll("h2, h3");
    if (!headings.length) {
      tocContainer.style.display = "none";
      return;
    }

    let tocHtml = `
      <div class="toc-card">
        <div class="toc-title">On This Page</div>
        <ul class="toc-list">
    `;

    headings.forEach((heading, idx) => {
      if (!heading.id) {
        heading.id = `section-${idx + 1}-${heading.textContent
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")}`;
      }

      // Add clickable anchor symbol to heading
      if (!heading.querySelector(".heading-anchor")) {
        const anchor = document.createElement("a");
        anchor.className = "heading-anchor";
        anchor.href = `#${heading.id}`;
        anchor.setAttribute("aria-hidden", "true");
        anchor.innerHTML = "#";
        heading.appendChild(anchor);
      }

      const isH3 = heading.tagName.toLowerCase() === "h3";
      tocHtml += `
        <li class="toc-item ${isH3 ? "level-3" : "level-2"}">
          <a href="#${heading.id}" class="toc-link" data-target="${heading.id}">
            ${heading.childNodes[0].textContent.trim()}
          </a>
        </li>
      `;
    });

    tocHtml += `
        </ul>
      </div>
    `;

    tocContainer.innerHTML = tocHtml;

    // Scrollspy with IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            document.querySelectorAll(".toc-link").forEach((link) => {
              link.classList.toggle("active", link.getAttribute("data-target") === id);
            });
          }
        });
      },
      { rootMargin: "0px 0px -70% 0px" }
    );

    headings.forEach((h) => observer.observe(h));
  }

  // Formats code blocks, adds header, language tag, and copy button
  function setupCodeBlocks() {
    function bindCopyHandler(btn, getText) {
      if (!btn) return;
      btn.addEventListener("click", () => {
        const textToCopy = getText();
        navigator.clipboard.writeText(textToCopy).then(() => {
          btn.classList.add("copied");
          const originalContent = btn.innerHTML;
          btn.innerHTML = `
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>Copied!</span>
          `;
          setTimeout(() => {
            btn.classList.remove("copied");
            btn.innerHTML = originalContent;
          }, 2000);
        });
      });
    }

    // 1. Wire up pre-authored .code-block elements with existing copy buttons
    document.querySelectorAll(".code-block").forEach((block) => {
      const copyBtn = block.querySelector(".copy-btn, .copy-button");
      const pre = block.querySelector("pre");
      if (copyBtn && pre) {
        bindCopyHandler(copyBtn, () => {
          const code = pre.querySelector("code");
          return code ? code.innerText : pre.innerText;
        });
      }
    });

    // 2. Wrap standalone pre elements (skipping already formatted blocks and ASCII diagrams)
    document.querySelectorAll("pre").forEach((pre) => {
      if (pre.closest(".code-block-wrapper") || pre.closest(".code-block") || pre.classList.contains("ascii-diagram")) return;

      const code = pre.querySelector("code");
      let lang = "code";
      if (code) {
        const classes = code.className.split(" ");
        for (const cls of classes) {
          if (cls.startsWith("language-")) {
            lang = cls.replace("language-", "");
            break;
          }
        }
      }

      const wrapper = document.createElement("div");
      wrapper.className = "code-block-wrapper";

      const header = document.createElement("div");
      header.className = "code-header";
      header.innerHTML = `
        <span class="code-lang-label">${lang}</span>
        <button class="copy-button" type="button" aria-label="Copy code to clipboard">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          <span>Copy</span>
        </button>
      `;

      pre.parentNode.insertBefore(wrapper, pre);
      wrapper.appendChild(header);
      wrapper.appendChild(pre);

      const copyBtn = header.querySelector(".copy-button");
      bindCopyHandler(copyBtn, () => {
        return code ? code.innerText : pre.innerText;
      });
    });
  }

  // Renders previous and next chapter buttons
  function renderPrevNextNav(currentChapter) {
    const navContainer = document.getElementById("prev-next-nav");
    if (!navContainer || !currentChapter || !window.getAdjacentChapters) return;

    const { prev, next } = window.getAdjacentChapters(currentChapter.id);

    let html = "";
    if (prev) {
      html += `
        <a href="${getChapterRelative(prev.slug)}" class="nav-card prev">
          <span class="nav-label">← Previous Chapter</span>
          <span class="nav-title">${prev.title}</span>
        </a>
      `;
    } else {
      html += `
        <a href="${getRootRelative("index.html")}" class="nav-card prev">
          <span class="nav-label">← Book Overview</span>
          <span class="nav-title">Homepage & Table of Contents</span>
        </a>
      `;
    }

    if (next) {
      html += `
        <a href="${getChapterRelative(next.slug)}" class="nav-card next">
          <span class="nav-label">Next Chapter →</span>
          <span class="nav-title">${next.title}</span>
        </a>
      `;
    } else {
      html += `
        <a href="${getRootRelative("index.html")}" class="nav-card next">
          <span class="nav-label">Curriculum Complete →</span>
          <span class="nav-title">Master Interview Question Bank</span>
        </a>
      `;
    }

    navContainer.innerHTML = html;
  }

  // Sets up interactive filters and expand/collapse for the Interview Q&A section
  function setupInterviewQA() {
    const qaContainer = document.querySelector(".interview-section");
    if (!qaContainer) return;

    const qaCards = qaContainer.querySelectorAll(".qa-card");
    if (!qaCards.length) return;

    // Filter buttons (All, Beginner, Intermediate, Advanced, Scenario)
    qaContainer.querySelectorAll(".qa-filter-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        qaContainer.querySelectorAll(".qa-filter-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.getAttribute("data-filter");
        qaCards.forEach((card) => {
          if (filter === "all" || card.classList.contains(`diff-${filter}`)) {
            card.style.display = "block";
          } else {
            card.style.display = "none";
          }
        });
      });
    });

    // Expand / Collapse all toggle
    const toggleAllBtn = qaContainer.querySelector(".qa-toggle-all");
    if (toggleAllBtn) {
      let allExpanded = false;
      toggleAllBtn.addEventListener("click", () => {
        allExpanded = !allExpanded;
        qaCards.forEach((card) => {
          if (allExpanded) {
            card.setAttribute("open", "true");
          } else {
            card.removeAttribute("open");
          }
        });
        toggleAllBtn.textContent = allExpanded ? "Collapse All Answers" : "Expand All Answers";
      });
    }
  }

  // Computes estimated reading time and sets action button listeners
  function setupChapterMeta(currentChapter) {
    if (!currentChapter) return;

    const wordCountEl = document.getElementById("chapter-reading-time");
    if (wordCountEl) {
      const content = document.querySelector(".content-inner");
      if (content) {
        const text = content.innerText || "";
        const words = text.trim().split(/\s+/).length;
        const minutes = Math.max(1, Math.round(words / 220));
        wordCountEl.textContent = `~${minutes} min read (${words.toLocaleString()} words)`;
      }
    }

    const completeBtn = document.getElementById("btn-toggle-complete");
    if (completeBtn) {
      completeBtn.setAttribute("data-chapter-id", currentChapter.id);
      completeBtn.addEventListener("click", () => {
        if (window.ProgressManager) {
          window.ProgressManager.toggleCompleted(currentChapter.id);
        }
      });
    }

    const bookmarkBtn = document.getElementById("btn-toggle-bookmark");
    if (bookmarkBtn) {
      bookmarkBtn.setAttribute("data-chapter-id", currentChapter.id);
      bookmarkBtn.addEventListener("click", () => {
        if (window.ProgressManager) {
          window.ProgressManager.toggleBookmark(currentChapter.id);
        }
      });
    }
  }

  // Main chapter initialization
  document.addEventListener("DOMContentLoaded", () => {
    const currentChapter = detectCurrentChapter();

    setupReadingProgressBar();
    renderSidebar(currentChapter);
    renderTableOfContents();
    setupCodeBlocks();
    renderPrevNextNav(currentChapter);
    setupInterviewQA();
    setupChapterMeta(currentChapter);

    if (window.ProgressManager) {
      window.ProgressManager.updateUI();
    }
    if (window.SimpleHighlighter) {
      window.SimpleHighlighter.highlightAll();
    }
  });

  window.ChapterEngine = {
    detectCurrentChapter,
    renderSidebar,
    renderTableOfContents,
    setupCodeBlocks,
    renderPrevNextNav
  };
})();

