// Firebase Authentication Login
import { auth } from './firebase-config.js';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js';

// Esperar a que el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');
    
    if (!loginForm) {
        console.error('Login form not found');
        return;
    }
    
    // Manejar el envío del formulario de login
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('clave').value;
        
        // Ocultar mensaje de error previo
        if (errorMessage) {
            errorMessage.style.display = 'none';
            errorMessage.textContent = '';
        }
        
        // Validar campos
        if (!email || !password) {
            showError('Por favor, completa todos los campos');
            return;
        }
        
        // Deshabilitar el botón durante la autenticación
        const submitButton = loginForm.querySelector('.btn-ingresar');
        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'INICIANDO SESIÓN...';
        
        try {
            // Iniciar sesión con Firebase Authentication
            await signInWithEmailAndPassword(auth, email, password);
            
            // Si la autenticación es exitosa, redirigir al menú
            window.location.href = 'menu.html';
        } catch (error) {
            console.error('Error en autenticación:', error);
            
            // Mostrar mensaje de error según el código de error
            let errorMsg = 'Error al iniciar sesión. Por favor, intenta nuevamente.';
            
            switch (error.code) {
                case 'auth/user-not-found':
                    errorMsg = 'No existe una cuenta con este correo electrónico.';
                    break;
                case 'auth/wrong-password':
                    errorMsg = 'Contraseña incorrecta.';
                    break;
                case 'auth/invalid-email':
                    errorMsg = 'El formato del correo electrónico no es válido.';
                    break;
                case 'auth/user-disabled':
                    errorMsg = 'Esta cuenta ha sido deshabilitada.';
                    break;
                case 'auth/too-many-requests':
                    errorMsg = 'Demasiados intentos fallidos. Por favor, intenta más tarde.';
                    break;
                case 'auth/network-request-failed':
                    errorMsg = 'Error de conexión. Por favor, verifica tu conexión a internet.';
                    break;
                default:
                    errorMsg = error.message || 'Error al iniciar sesión. Por favor, intenta nuevamente.';
            }
            
            showError(errorMsg);
        } finally {
            // Rehabilitar el botón
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });
    
    // Función para mostrar errores
    function showError(message) {
        if (errorMessage) {
            errorMessage.textContent = message;
            errorMessage.style.display = 'block';
        } else {
            // Usar alerta personalizada si está disponible
            if (window.customAlert) {
                window.customAlert(message);
            }
        }
    }
});

// Verificar el estado de autenticación al cargar la página
onAuthStateChanged(auth, (user) => {
    // Si el usuario ya está autenticado y está en la página de login, redirigir al menú
    if (user && window.location.pathname.includes('index.html')) {
        window.location.href = 'menu.html';
    }
});

// Exportar función de logout para usar en otras páginas
export async function logout() {
    try {
        await signOut(auth);
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
        if (window.customError) {
            await window.customError('Error al cerrar sesión. Por favor, intenta nuevamente.');
        }
    }
}

// También hacer disponible globalmente para compatibilidad
window.logout = logout;
