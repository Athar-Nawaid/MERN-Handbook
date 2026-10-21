/**
 * Reading Progress & Revision Manager
 * Safely persists completed chapters and revision bookmarks to localStorage
 */

(function () {
  const STORAGE_KEY = "fullstack_book_progress";

  function getStoredData() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { completed: [], bookmarks: [] };
      const parsed = JSON.parse(raw);
      return {
        completed: Array.isArray(parsed.completed) ? parsed.completed : [],
        bookmarks: Array.isArray(parsed.bookmarks) ? parsed.bookmarks : []
      };
    } catch (e) {
      console.warn("localStorage unavailable for reading progress.");
      return { completed: [], bookmarks: [] };
    }
  }

  function persistData(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      window.dispatchEvent(new CustomEvent("book-progress-updated", { detail: data }));
    } catch (e) {
      console.warn("Unable to save progress to localStorage.");
    }
  }

  const ProgressManager = {
    isCompleted(chapterId) {
      const data = getStoredData();
      return data.completed.includes(Number(chapterId));
    },

    toggleCompleted(chapterId) {
      const id = Number(chapterId);
      const data = getStoredData();
      const idx = data.completed.indexOf(id);
      if (idx > -1) {
        data.completed.splice(idx, 1);
      } else {
        data.completed.push(id);
      }
      persistData(data);
      return data.completed.includes(id);
    },

    isBookmarked(chapterId) {
      const data = getStoredData();
      return data.bookmarks.includes(Number(chapterId));
    },

    toggleBookmark(chapterId) {
      const id = Number(chapterId);
      const data = getStoredData();
      const idx = data.bookmarks.indexOf(id);
      if (idx > -1) {
        data.bookmarks.splice(idx, 1);
      } else {
        data.bookmarks.push(id);
      }
      persistData(data);
      return data.bookmarks.includes(id);
    },

    getStats() {
      const data = getStoredData();
      const total = (window.ALL_CHAPTERS && window.ALL_CHAPTERS.length) || 45;
      const completedCount = data.completed.length;
      const percent = Math.round((completedCount / total) * 100);
      return {
        completedCount,
        total,
        percent,
        bookmarkedCount: data.bookmarks.length,
        completedList: data.completed,
        bookmarkedList: data.bookmarks
      };
    },

    updateUI() {
      const stats = this.getStats();

      // Update text progress percentages
      document.querySelectorAll(".progress-percentage-text").forEach((el) => {
        el.textContent = `${stats.percent}%`;
      });

      document.querySelectorAll(".progress-fraction-text").forEach((el) => {
        el.textContent = `${stats.completedCount} / ${stats.total}`;
      });

      // Update progress bars
      document.querySelectorAll(".progress-bar-fill").forEach((el) => {
        el.style.width = `${stats.percent}%`;
      });

      // Update sidebar icons
      document.querySelectorAll("[data-chapter-id]").forEach((el) => {
        const id = Number(el.getAttribute("data-chapter-id"));
        const dot = el.querySelector(".chapter-status-dot");
        if (dot) {
          dot.classList.remove("completed", "bookmarked");
          if (stats.completedList.includes(id)) {
            dot.classList.add("completed");
            dot.setAttribute("title", "Completed");
          } else if (stats.bookmarkedList.includes(id)) {
            dot.classList.add("bookmarked");
            dot.setAttribute("title", "Bookmarked for revision");
          }
        }
      });

      // Update in-chapter action buttons if present
      const completeBtn = document.getElementById("btn-toggle-complete");
      const bookmarkBtn = document.getElementById("btn-toggle-bookmark");
      const currentChapterId = completeBtn ? Number(completeBtn.getAttribute("data-chapter-id")) : null;

      if (completeBtn && currentChapterId) {
        const done = stats.completedList.includes(currentChapterId);
        completeBtn.classList.toggle("completed", done);
        completeBtn.innerHTML = done
          ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Completed`
          : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle></svg> Mark Complete`;
      }

      if (bookmarkBtn && currentChapterId) {
        const bookmarked = stats.bookmarkedList.includes(currentChapterId);
        bookmarkBtn.classList.toggle("bookmarked", bookmarked);
        bookmarkBtn.innerHTML = bookmarked
          ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg> Bookmarked`
          : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg> Save for Revision`;
      }
    }
  };

  window.ProgressManager = ProgressManager;

  document.addEventListener("DOMContentLoaded", () => {
    ProgressManager.updateUI();

    window.addEventListener("book-progress-updated", () => {
      ProgressManager.updateUI();
    });
  });
})();

