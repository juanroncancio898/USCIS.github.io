// Archivo de administración para gestionar códigos de acceso a páginas
document.addEventListener('DOMContentLoaded', function() {
    const accessCodeInput = document.getElementById('accessCode');
    const submitCodeBtn = document.getElementById('submitCode');
    const codeMessage = document.getElementById('codeMessage');
    
    // Códigos de acceso definidos
    const accessCodes = {
        'page2': '2page.html',  // Código para acceder a página 2
        'page3': '3page.html'   // Código para acceder a página 3
    };
    
    if (submitCodeBtn) {
        submitCodeBtn.addEventListener('click', function() {
            const code = accessCodeInput.value.trim().toLowerCase();
            
            if (code === '' || code === ' ') {
                showMessage('Por favor, ingresa un código.', 'error');
                return;
            }
            
            if (accessCodes[code]) {
                showMessage('¡Acceso concedido! Redirigiendo...', 'success');
                setTimeout(() => {
                    window.location.href = accessCodes[code];
                }, 1500);
            } else {
                showMessage('Código incorrecto. Intenta de nuevo.', 'error');
                accessCodeInput.value = '';
            }
        });
        
        // Permitir envío con Enter
        accessCodeInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                submitCodeBtn.click();
            }
        });
    }
    
    function showMessage(text, type) {
        if (codeMessage) {
            codeMessage.textContent = text;
            codeMessage.className = 'message ' + type;
            codeMessage.style.display = 'block';
        }
    }
});
