// logueo con usuario y clave predefinidos
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const usuario = document.getElementById('usuario').value;
    const clave = document.getElementById('clave').value;

    if (usuario === 'feberuiz' && clave === '33939239fr') {
        window.location.href = 'menu.html';
    } else {
        alert('Usuario o contraseña incorrectos');
    }
});

// filepath: c:\Users\ssrdo\Documents\app_febe\js\script-base.js
// Replace localStorage with Firebase
function saveStudents(students) {
    db.ref('students').set(students);
}

function getStudents() {
    return db.ref('students').once('value')
        .then(snapshot => snapshot.val() || []);
}

