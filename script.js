document.addEventListener('DOMContentLoaded', () => {
    // Populate the categories dropdown
    const categoriesDropdown = document.querySelector('#categories-dropdown .dropdown-menu');
    const categories = ['Science', 'History', 'Technology', 'Conspiracy', 'Mystery'];
    categories.forEach(category => {
        const a = document.createElement('a');
        a.href = '#';
        a.classList.add('dropdown-item');
        a.textContent = category;
        categoriesDropdown.appendChild(a);
    });
});
