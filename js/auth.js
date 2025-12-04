// Authentication utility functions
import { auth } from './firebase-config.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js';

// Verificar si el usuario está autenticado
export function requireAuth() {
    return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                resolve(user);
            } else {
                reject(new Error('Usuario no autenticado'));
                // Redirigir al login si no está autenticado
                if (!window.location.pathname.includes('index.html')) {
                    window.location.href = 'index.html';
                }
            }
        });
    });
}

// Obtener el usuario actual
export function getCurrentUser() {
    return auth.currentUser;
}

// Verificar autenticación al cargar la página (excepto en index.html)
export function checkAuth() {
    const isLoginPage = window.location.pathname.includes('index.html') || 
                        window.location.pathname === '/' ||
                        window.location.pathname.endsWith('/');
    
    if (isLoginPage) {
        // Si está en la página de login y ya está autenticado, redirigir al menú
        onAuthStateChanged(auth, (user) => {
            if (user) {
                window.location.href = 'menu.html';
            }
        });
    } else {
        // Si está en otra página, verificar autenticación
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                window.location.href = 'index.html';
            }
        });
    }
}

