document.getElementById('studentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Obtener valores del formulario
    const student = {
        nombre: document.querySelector('input[placeholder="NOMBRE"]').value,
        apellido: document.querySelector('input[placeholder="APELLIDO"]').value,
        dias: Array.from(document.querySelectorAll('input[name="dias"]:checked')).map(cb => cb.value),
        turnos: Array.from(document.querySelectorAll('input[name="turnos"]:checked')).map(cb => cb.value),
        horarios: Array.from(document.querySelectorAll('input[name="horarios"]:checked')).map(cb => cb.value),
        cuota: document.getElementById('cuota').value,
        mesAnio: document.getElementById('mesAnio').value,
        metodoPago: document.getElementById('metodoPago').value
    };

    // Obtener estudiantes existentes o crear array vacío
    let students = JSON.parse(localStorage.getItem('students') || '[]');
    
    // Agregar nuevo estudiante
    students.push(student);
    
    // Guardar en localStorage
    localStorage.setItem('students', JSON.stringify(students));
    
    // Mostrar mensaje y resetear el formulario
    alert('Alumno guardado correctamente');
    e.target.reset();
});