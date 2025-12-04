// Sistema de alertas y confirmaciones personalizadas
class CustomAlert {
    constructor() {
        this.init();
    }

    init() {
        // Crear contenedor de modales si no existe
        if (!document.getElementById('custom-modal-container')) {
            const container = document.createElement('div');
            container.id = 'custom-modal-container';
            container.innerHTML = `
                <div id="custom-modal-overlay" class="custom-modal-overlay" style="display: none;">
                    <div class="custom-modal">
                        <div class="custom-modal-header">
                            <h3 id="custom-modal-title" class="custom-modal-title"></h3>
                        </div>
                        <div class="custom-modal-body">
                            <p id="custom-modal-message"></p>
                        </div>
                        <div class="custom-modal-footer" id="custom-modal-footer">
                        </div>
                    </div>
                </div>
            `;
            document.body.appendChild(container);
        }
    }

    show(options) {
        return new Promise((resolve) => {
            const overlay = document.getElementById('custom-modal-overlay');
            const title = document.getElementById('custom-modal-title');
            const message = document.getElementById('custom-modal-message');
            const footer = document.getElementById('custom-modal-footer');

            // Configurar título
            title.textContent = options.title || 'Información';
            
            // Configurar mensaje
            message.textContent = options.message || '';
            
            // Limpiar footer
            footer.innerHTML = '';

            // Crear botones
            if (options.type === 'confirm') {
                // Botón de cancelar
                const cancelBtn = document.createElement('button');
                cancelBtn.className = 'custom-modal-btn custom-modal-btn-cancel';
                cancelBtn.textContent = options.cancelText || 'Cancelar';
                cancelBtn.onclick = () => {
                    this.hide();
                    resolve(false);
                };

                // Botón de confirmar
                const confirmBtn = document.createElement('button');
                confirmBtn.className = 'custom-modal-btn custom-modal-btn-confirm';
                confirmBtn.textContent = options.confirmText || 'Confirmar';
                confirmBtn.onclick = () => {
                    this.hide();
                    resolve(true);
                };

                footer.appendChild(cancelBtn);
                footer.appendChild(confirmBtn);
            } else {
                // Solo botón de aceptar
                const okBtn = document.createElement('button');
                okBtn.className = 'custom-modal-btn custom-modal-btn-ok';
                okBtn.textContent = options.okText || 'Aceptar';
                okBtn.onclick = () => {
                    this.hide();
                    resolve(true);
                };
                
                footer.appendChild(okBtn);
            }

            // Configurar tipo de modal (success, error, warning, info)
            overlay.className = 'custom-modal-overlay';
            if (options.type) {
                overlay.classList.add(`custom-modal-${options.type}`);
            }

            // Mostrar modal
            overlay.style.display = 'flex';

            // Cerrar al hacer clic fuera del modal
            overlay.onclick = (e) => {
                if (e.target === overlay && !options.preventClose) {
                    if (options.type === 'confirm') {
                        this.hide();
                        resolve(false);
                    } else {
                        this.hide();
                        resolve(true);
                    }
                }
            };

            // Cerrar con ESC
            const handleEsc = (e) => {
                if (e.key === 'Escape') {
                    if (options.type === 'confirm') {
                        this.hide();
                        resolve(false);
                    } else {
                        this.hide();
                        resolve(true);
                    }
                    document.removeEventListener('keydown', handleEsc);
                }
            };
            document.addEventListener('keydown', handleEsc);
        });
    }

    hide() {
        const overlay = document.getElementById('custom-modal-overlay');
        if (overlay) {
            overlay.style.display = 'none';
        }
    }

    async alert(message, title = 'Información') {
        await this.show({
            type: 'info',
            title: title,
            message: message
        });
    }

    async confirm(message, title = 'Confirmar') {
        return await this.show({
            type: 'confirm',
            title: title,
            message: message
        });
    }

    async success(message, title = 'Éxito') {
        await this.show({
            type: 'success',
            title: title,
            message: message
        });
    }

    async error(message, title = 'Error') {
        await this.show({
            type: 'error',
            title: title,
            message: message
        });
    }

    async warning(message, title = 'Advertencia') {
        await this.show({
            type: 'warning',
            title: title,
            message: message
        });
    }
}

// Crear instancia global
const customAlert = new CustomAlert();

// Reemplazar funciones nativas
window.customAlert = customAlert.alert.bind(customAlert);
window.customConfirm = customAlert.confirm.bind(customAlert);
window.customSuccess = customAlert.success.bind(customAlert);
window.customError = customAlert.error.bind(customAlert);
window.customWarning = customAlert.warning.bind(customAlert);

// Sobrescribir funciones nativas del navegador (opcional, comentado por seguridad)
// Descomenta estas líneas si quieres reemplazar completamente alert() y confirm()
/*
window.originalAlert = window.alert;
window.originalConfirm = window.confirm;

window.alert = async function(message) {
    await customAlert.alert(message);
};

window.confirm = async function(message) {
    return await customAlert.confirm(message);
};
*/

