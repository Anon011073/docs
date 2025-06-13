document.addEventListener("DOMContentLoaded", () => {
    const link = document.getElementById("categories-link");
    const popup = document.getElementById("category-popup");
  
    link.addEventListener("click", (e) => {
      e.preventDefault();
      popup.classList.toggle("hidden");
    });
  
    // Optional: close if clicked outside
    document.addEventListener("click", (e) => {
      if (!link.contains(e.target) && !popup.contains(e.target)) {
        popup.classList.add("hidden");
      }
    });
  });
  