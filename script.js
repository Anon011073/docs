document.addEventListener('DOMContentLoaded', () => {
    const categoriesButton = document.querySelector('.categories-button');
    const categoriesContent = document.querySelector('.categories-content');

    categoriesButton.addEventListener('click', () => {
        categoriesContent.style.display = categoriesContent.style.display === 'block' ? 'none' : 'block';
    });

    // Close the dropdown if the user clicks outside of it
    window.addEventListener('click', (event) => {
        if (!event.target.matches('.categories-button')) {
            if (categoriesContent.style.display === 'block') {
                categoriesContent.style.display = 'none';
            }
        }
    });

    // Populate some dummy categories
    const categories = ['Science', 'History', 'Technology', 'Conspiracy', 'Mystery'];
    categories.forEach(category => {
        const a = document.createElement('a');
        a.href = '#';
        a.textContent = category;
        categoriesContent.appendChild(a);
    });
});
