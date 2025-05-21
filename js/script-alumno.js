import { saveStudent } from './firebase-service.js';

document.addEventListener('DOMContentLoaded', () => {
    const studentForm = document.getElementById('studentForm');
    if (studentForm) {
        studentForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            try {
                const formData = {
                    nombre: document.querySelector('input[placeholder="NOMBRE"]').value,
                    apellido: document.querySelector('input[placeholder="APELLIDO"]').value,
                    dias: Array.from(document.querySelectorAll('input[name="dias"]:checked')).map(cb => cb.value),
                    turnos: Array.from(document.querySelectorAll('input[name="turnos"]:checked')).map(cb => cb.value),
                    horarios: Array.from(document.querySelectorAll('input[name="horarios"]:checked')).map(cb => cb.value),
                    cuota: document.getElementById('cuota').value,
                    mesAnio: document.getElementById('mesAnio').value,
                    metodoPago: document.getElementById('metodoPago').value
                };
                
                const saved = await saveStudent(formData);
                if (saved) {
                    alert('Alumno guardado correctamente');
                    studentForm.reset();
                } else {
                    alert('Error al guardar el alumno');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error al procesar el formulario');
            }
        });
    }
});