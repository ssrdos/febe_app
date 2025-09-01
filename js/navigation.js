// Sistema de navegación inteligente
class NavigationManager {
    constructor() {
        this.init();
    }

    init() {
        this.createBackButton();
        this.setupNavigationLogic();
    }

    createBackButton() {
        // Verificar si ya existe el botón
        if (document.querySelector('.back-button')) return;

        // No mostrar el botón en la página de login (index.html)
        if (window.location.pathname.endsWith('index.html') || 
            window.location.pathname === '/' || 
            window.location.pathname.endsWith('/')) {
            return;
        }

        const backButton = document.createElement('button');
        backButton.className = 'back-button';
        backButton.innerHTML = '←';
        backButton.title = 'Volver atrás';
        backButton.setAttribute('aria-label', 'Volver atrás');
        
        // Agregar el botón al body
        document.body.appendChild(backButton);
        
        // Agregar evento click
        backButton.addEventListener('click', () => this.handleBackNavigation());
        
        // Animación de entrada
        setTimeout(() => {
            backButton.style.animation = 'fadeInUp 0.6s ease-out';
        }, 100);
    }

    setupNavigationLogic() {
        // Detectar navegación y actualizar historial
        this.updateNavigationHistory();
    }

    handleBackNavigation() {
        const currentPage = window.location.pathname;
        
        // Lógica de navegación específica por página
        const navigationMap = {
            'ingresar.html': 'menu.html',
            'lista.html': 'menu.html',
            'horarios.html': 'menu.html',
            'abonados.html': 'menu.html',
            'no_abonados.html': 'menu.html',
            'menu.html': 'index.html'
        };

        // Obtener el nombre del archivo actual
        const currentFile = currentPage.split('/').pop() || 'index.html';
        
        // Determinar destino
        let destination = navigationMap[currentFile];
        
        // Si no hay mapeo específico, intentar usar el historial del navegador
        if (!destination) {
            if (window.history.length > 1) {
                window.history.back();
                return;
            } else {
                destination = 'menu.html';
            }
        }
        
        // Añadir efecto de salida antes de navegar
        this.addExitAnimation(() => {
            window.location.href = destination;
        });
    }

    addExitAnimation(callback) {
        const containers = document.querySelectorAll('.login-container, .menu-container, .form-container, .list-container');
        
        containers.forEach(container => {
            container.style.animation = 'fadeOut 0.3s ease-in';
        });
        
        setTimeout(callback, 300);
    }

    updateNavigationHistory() {
        // Guardar la página actual en sessionStorage para navegación inteligente
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navigationHistory = JSON.parse(sessionStorage.getItem('navigationHistory') || '[]');
        
        // Evitar duplicados consecutivos
        if (navigationHistory[navigationHistory.length - 1] !== currentPage) {
            navigationHistory.push(currentPage);
            
            // Mantener solo los últimos 5 elementos
            if (navigationHistory.length > 5) {
                navigationHistory.shift();
            }
            
            sessionStorage.setItem('navigationHistory', JSON.stringify(navigationHistory));
        }
    }
}

// Agregar CSS para animación de salida
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-20px);
        }
    }
`;
document.head.appendChild(style);

// Inicializar el sistema de navegación cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    new NavigationManager();
});

// También inicializar si el DOM ya está cargado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new NavigationManager();
    });
} else {
    new NavigationManager();
}

