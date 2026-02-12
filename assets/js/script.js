// Funciones generales del sitio
document.addEventListener('DOMContentLoaded', function() {
    // Configurar funcionalidad de búsqueda
    const searchBox = document.querySelector('.search-box');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchBox && searchBtn) {
        searchBtn.addEventListener('click', function() {
            performSearch();
        });
        
        searchBox.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    function performSearch() {
        const query = searchBox.value.trim();
        if (query) {
            alert(`Búsqueda realizada: "${query}"\n\nEn un sitio real, esto mostraría resultados para tu búsqueda.`);
        } else {
            alert('Por favor, escribe algo para buscar.');
        }
    }
    
    // Configurar enlaces de páginas en el footer
    const page2Link = document.getElementById('page2Link');
    const page3Link = document.getElementById('page3Link');
    
    if (page2Link) {
        page2Link.href = '2page.html';
    }
    
    if (page3Link) {
        page3Link.href = '3page.html';
    }
});
