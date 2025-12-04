// Funciones helper para reemplazar alert() y confirm() con modales personalizados
// Este archivo debe cargarse después de custom-alert.js

(function() {
    'use strict';
    
    // Esperar a que custom-alert esté disponible
    function initAlertHelpers() {
        if (!window.customAlert || !window.customConfirm) {
            // Si custom-alert aún no está disponible, intentar de nuevo
            setTimeout(initAlertHelpers, 100);
            return;
        }

        // Guardar funciones originales como respaldo
        const originalAlert = window.alert;
        const originalConfirm = window.confirm;

        // Reemplazar alert()
        window.alert = async function(message) {
            if (window.customAlert) {
                await window.customAlert(message, 'Información');
            } else {
                originalAlert(message);
            }
        };

        // Reemplazar confirm()
        window.confirm = async function(message) {
            if (window.customConfirm) {
                return await window.customConfirm(message, 'Confirmar');
            } else {
                return originalConfirm(message);
            }
        };

        // Funciones helper adicionales
        window.showAlert = async function(message, title = 'Información', type = 'info') {
            switch(type) {
                case 'success':
                    await window.customSuccess(message, title);
                    break;
                case 'error':
                    await window.customError(message, title);
                    break;
                case 'warning':
                    await window.customWarning(message, title);
                    break;
                default:
                    await window.customAlert(message, title);
            }
        };

        window.showConfirm = async function(message, title = 'Confirmar') {
            return await window.customConfirm(message, title);
        };

        console.log('Alertas personalizadas activadas');
    }

    // Inicializar cuando el DOM esté listo o inmediatamente si ya lo está
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAlertHelpers);
    } else {
        initAlertHelpers();
    }
})();

