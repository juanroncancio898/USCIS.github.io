// Funcionalidad general de la página (búsqueda, A-Number y controles de color)
document.addEventListener('DOMContentLoaded', function () {
    // --- Búsqueda ---
    // Preferir la caja de búsqueda en el header; si no existe, tomar la primera disponible
    const searchBox = document.querySelector('header .search-box') || document.querySelector('.search-box');
    const searchBtn = document.querySelector('.search-btn');

    function performSearch() {
        if (!searchBox) return;
        const query = (searchBox.value || '').trim();
        if (query) {
            alert(`Búsqueda realizada: "${query}"\n\nEn un sitio real, esto mostraría resultados para tu búsqueda.`);
        } else {
            alert('Por favor, escribe algo para buscar.');
        }
    }

    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }

    if (searchBox) {
        searchBox.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') performSearch();
        });
    }

    // --- Campo A-Number: mantener prefijo "A-" y permitir solo dígitos ---
    (function setupANumberInput() {
        const prefix = 'A-';
        const input = document.getElementById('aNumberInput');
        if (!input) return;

        // Asegurar prefijo al iniciar
        if (!input.value || !input.value.startsWith(prefix)) input.value = prefix;

        // Colocar caret al final (después del prefijo)
        function placeCaretToEnd() {
            try {
                const pos = Math.max(input.value.length, prefix.length);
                input.setSelectionRange(pos, pos);
            } catch (err) {
                // ignore if selection not supported
            }
        }

        input.addEventListener('focus', function () {
            if (!input.value.startsWith(prefix)) input.value = prefix;
            // small timeout to ensure correct placement
            setTimeout(placeCaretToEnd, 0);
        });

        // Evitar borrar o mover el caret antes del prefijo
        input.addEventListener('keydown', function (e) {
            const selStart = input.selectionStart || 0;
            if ((e.key === 'Backspace' || e.key === 'Delete') && selStart <= prefix.length) {
                e.preventDefault();
                return;
            }
            if (e.key === 'ArrowLeft' && selStart <= prefix.length) {
                e.preventDefault();
                return;
            }
        });

        // Normalizar contenido: mantener prefijo y quitar no-dígitos
        function sanitize() {
            let val = input.value || '';
            if (!val.startsWith(prefix)) val = prefix + val;
            const rest = val.slice(prefix.length).replace(/[^0-9]/g, '');
            input.value = prefix + rest;
        }

        input.addEventListener('input', function () {
            sanitize();
        });

        // Manejar pegado para extraer solo dígitos
        input.addEventListener('paste', function (e) {
            e.preventDefault();
            const pasted = (e.clipboardData || window.clipboardData).getData('text') || '';
            const digits = pasted.replace(/[^0-9]/g, '');
            const current = input.value.startsWith(prefix) ? input.value.slice(prefix.length) : '';
            input.value = prefix + (current + digits).replace(/[^0-9]/g, '');
            placeCaretToEnd();
        });

        // Al perder foco, opcionalmente formatear a 9 dígitos (agregar ceros a la izquierda)
        input.addEventListener('blur', function () {
            const rest = input.value.slice(prefix.length).replace(/[^0-9]/g, '');
            if (rest.length > 0 && rest.length < 9) {
                // rellenar con ceros a la izquierda hasta 9 dígitos
                const padded = rest.padStart(9, '0');
                input.value = prefix + padded;
            }
        });
    })();

    // --- Controles de personalización de color (panel admin) ---
    const bgColorPicker = document.getElementById('bgColor');
    const textColorPicker = document.getElementById('textColor');
    const applyColorsBtn = document.getElementById('applyColors');

    if (applyColorsBtn) {
        applyColorsBtn.addEventListener('click', function () {
            if (bgColorPicker && textColorPicker) {
                const paragraphArea = document.querySelector('.paragraph-area');
                if (paragraphArea) {
                    paragraphArea.style.backgroundColor = bgColorPicker.value;
                    paragraphArea.style.color = textColorPicker.value;
                    localStorage.setItem('paragraphBgColor', bgColorPicker.value);
                    localStorage.setItem('paragraphTextColor', textColorPicker.value);
                    alert('Colores aplicados correctamente. Se han guardado para futuras visitas.');
                }
            }
        });

        // Cargar colores guardados
        const savedBgColor = localStorage.getItem('paragraphBgColor');
        const savedTextColor = localStorage.getItem('paragraphTextColor');
        if (savedBgColor || savedTextColor) {
            const paragraphArea = document.querySelector('.paragraph-area');
            if (paragraphArea) {
                if (savedBgColor) paragraphArea.style.backgroundColor = savedBgColor;
                if (savedTextColor) paragraphArea.style.color = savedTextColor;
                if (bgColorPicker && savedBgColor) bgColorPicker.value = savedBgColor;
                if (textColorPicker && savedTextColor) textColorPicker.value = savedTextColor;
            }
        }
    }

    // --- Validación de código de acceso (panel de acceso) ---
    const validAccessCode = "538243"; // Cambia este valor para configurar el código permitido
    const accessInput = document.getElementById('accessCode');
    const submitBtn = document.getElementById('submitCode');
    const codeMessage = document.getElementById('codeMessage');

    if (accessInput && submitBtn) {
        submitBtn.addEventListener('click', function () {
            const code = (accessInput.value || '').trim();
            if (code === validAccessCode) {
                codeMessage.style.display = 'block';
                codeMessage.className = 'message success';
                codeMessage.textContent = 'Access granted! Redirecting...';
                setTimeout(function () {
                    window.location.href = '2page.html';
                }, 1200);
            } else {
                codeMessage.style.display = 'block';
                codeMessage.className = 'message error';
                codeMessage.textContent = 'Invalid code. Please try again.';
            }
        });
    }
});