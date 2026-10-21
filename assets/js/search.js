/**
 * Global Search Infrastructure
 * Client-side fast search across all chapters, tags, topics, and interview questions
 */

(function () {
  let searchModalBackdrop = null;
  let searchInput = null;
  let searchResultsList = null;
  let selectedIndex = -1;

  // Pre-calculated search index built from book metadata
  function getBaseSearchIndex() {
    if (!window.ALL_CHAPTERS) return [];

    return window.ALL_CHAPTERS.map((ch) => ({
      type: "chapter",
      chapterId: ch.id,
      title: ch.title,
      partTitle: ch.partTitle,
      slug: ch.slug,
      summary: ch.description,
      tags: ch.tags || [],
      searchText: `${ch.title} ${ch.description} ${(ch.tags || []).join(" ")}`.toLowerCase()
    }));
  }

  function getRelativePath(slug) {
    const isInsideChapters = document.body.classList.contains("chapter-page") || 
                             window.location.pathname.includes("/chapters/") || 
                             window.location.pathname.endsWith("/chapters");
    return isInsideChapters ? slug : `chapters/${slug}`;
  }

  function createSearchModal() {
    if (document.getElementById("search-modal-backdrop")) return;

    const html = `
      <div id="search-modal-backdrop" class="search-modal-backdrop" role="dialog" aria-modal="true" aria-label="Search Book">
        <div class="search-modal">
          <div class="search-input-wrapper">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input type="text" id="global-search-input" class="search-input" placeholder="Search chapters, topics, interview questions (e.g. closures, event loop, ACID)..." autocomplete="off" spellcheck="false">
            <button id="search-modal-close" class="search-close-btn" aria-label="Close search">ESC</button>
          </div>
          <ul id="search-results-list" class="search-results-list" role="listbox">
            <li class="search-result-item" style="padding: 1.5rem; text-align: center; color: var(--text-muted); font-size: 0.9rem;">
              Type a keyword to search across all 45 chapters...
            </li>
          </ul>
          <div class="search-footer">
            <span><kbd class="search-shortcut">↑</kbd> <kbd class="search-shortcut">↓</kbd> to navigate</span>
            <span><kbd class="search-shortcut">↵</kbd> to select</span>
            <span><kbd class="search-shortcut">ESC</kbd> to close</span>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML("beforeend", html);

    searchModalBackdrop = document.getElementById("search-modal-backdrop");
    searchInput = document.getElementById("global-search-input");
    searchResultsList = document.getElementById("search-results-list");

    // Close on backdrop click
    searchModalBackdrop.addEventListener("click", (e) => {
      if (e.target === searchModalBackdrop) {
        closeModal();
      }
    });

    document.getElementById("search-modal-close").addEventListener("click", closeModal);

    searchInput.addEventListener("input", handleSearch);
    searchInput.addEventListener("keydown", handleKeydown);
  }

  function openModal() {
    createSearchModal();
    searchModalBackdrop.classList.add("open");
    searchInput.value = "";
    selectedIndex = -1;
    renderDefaultView();
    setTimeout(() => searchInput.focus(), 50);
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    if (!searchModalBackdrop) return;
    searchModalBackdrop.classList.remove("open");
    document.body.style.overflow = "";
  }

  function renderDefaultView() {
    searchResultsList.innerHTML = `
      <li style="padding: 1.75rem 1rem; text-align: center; color: var(--text-muted); font-size: 0.88rem;">
        Search all 45 chapters, technical concepts, and interview questions...
      </li>
    `;
  }

  function highlightMatches(text, query) {
    if (!query) return text;
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(${escaped})`, "gi");
    return text.replace(regex, "<mark style='background: var(--accent-subtle); color: var(--accent-text); padding: 0 2px; border-radius: 2px;'>$1</mark>");
  }

  function handleSearch() {
    const query = searchInput.value.trim().toLowerCase();
    if (!query) {
      renderDefaultView();
      return;
    }

    const items = getBaseSearchIndex();
    const queryTerms = query.split(/\s+/).filter(Boolean);

    const matches = items.filter((item) => {
      return queryTerms.every((term) => item.searchText.includes(term));
    });

    if (matches.length === 0) {
      searchResultsList.innerHTML = `
        <li style="padding: 2rem; text-align: center; color: var(--text-muted); font-size: 0.9rem;">
          No matching chapters found for "<strong>${searchInput.value}</strong>".
        </li>
      `;
      selectedIndex = -1;
      return;
    }

    selectedIndex = 0;
    const isInsideChapters = window.location.pathname.includes("/chapters/") || 
                             document.body.classList.contains("chapter-page");

    searchResultsList.innerHTML = matches
      .map((item, idx) => {
        const linkHref = isInsideChapters ? item.slug : `chapters/${item.slug}`;
        const isSelected = idx === 0 ? "selected" : "";
        return `
          <li class="search-result-item ${isSelected}" data-index="${idx}">
            <a href="${linkHref}" class="search-result-link">
              <div class="search-result-part">${item.partTitle}</div>
              <div class="search-result-title">${highlightMatches(item.title, query)}</div>
              <div class="search-result-snippet">${highlightMatches(item.summary, query)}</div>
            </a>
          </li>
        `;
      })
      .join("");
  }

  function handleKeydown(e) {
    const items = searchResultsList.querySelectorAll(".search-result-item");
    if (!items.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      selectedIndex = (selectedIndex + 1) % items.length;
      updateSelection(items);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      selectedIndex = (selectedIndex - 1 + items.length) % items.length;
      updateSelection(items);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && items[selectedIndex]) {
        const link = items[selectedIndex].querySelector("a");
        if (link) link.click();
      }
    } else if (e.key === "Escape") {
      closeModal();
    }
  }

  function updateSelection(items) {
    items.forEach((item, idx) => {
      if (idx === selectedIndex) {
        item.classList.add("selected");
        item.scrollIntoView({ block: "nearest" });
      } else {
        item.classList.remove("selected");
      }
    });
  }

  // Bind global shortcuts
  document.addEventListener("keydown", (e) => {
    // Open on Ctrl+K, Cmd+K, or slash "/" if not typing in input
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      openModal();
    } else if (e.key === "/" && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
      e.preventDefault();
      openModal();
    } else if (e.key === "Escape" && searchModalBackdrop && searchModalBackdrop.classList.contains("open")) {
      closeModal();
    }
  });

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".search-trigger").forEach((btn) => {
      btn.addEventListener("click", openModal);
    });
  });

  window.SearchModal = { open: openModal, close: closeModal };
})();

