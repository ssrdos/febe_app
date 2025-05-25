import { saveStudent } from './firebase-service.js';

document.addEventListener('DOMContentLoaded', () => {
    const studentForm = document.getElementById('studentForm');
    
    // Add input event listeners for validation
    const nombreInput = document.querySelector('input[placeholder="NOMBRE"]');
    const apellidoInput = document.querySelector('input[placeholder="APELLIDO"]');

    function validateNameInput(input) {
        const value = input.value;
        const lettersOnly = /^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ\s]+$/;
        
        if (!lettersOnly.test(value)) {
            input.setCustomValidity('Solo se permiten letras y espacios');
            input.reportValidity();
            return false;
        }
        
        input.setCustomValidity('');
        return true;
    }

    nombreInput.addEventListener('input', (e) => {
        validateNameInput(e.target);
    });

    apellidoInput.addEventListener('input', (e) => {
        validateNameInput(e.target);
    });

    if (studentForm) {
        studentForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Validate both fields before submission
            const isNombreValid = validateNameInput(nombreInput);
            const isApellidoValid = validateNameInput(apellidoInput);

            if (!isNombreValid || !isApellidoValid) {
                return;
            }

            try {
                const formData = {
                    nombre: nombreInput.value.trim(),
                    apellido: apellidoInput.value.trim(),
                    dias: Array.from(document.querySelectorAll('input[name="dias"]:checked')).map(cb => cb.value),
                    turnos: Array.from(document.querySelectorAll('input[name="turnos"]:checked')).map(cb => cb.value),
                    horarios: Array.from(document.querySelectorAll('input[name="horarios"]:checked')).map(cb => cb.value),
                    cuota: document.getElementById('cuota').value,
                    mesAnio: new Date(document.getElementById('fechaPago').value).toISOString().slice(0,7), // Get YYYY-MM
                    fechaPago: document.getElementById('fechaPago').value, // Will now store only the date
                    metodoPago: document.getElementById('metodoPago').value,
                    timestamp: Date.now()
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

    window.deleteAllStudents = async function() {
        if (confirm('¿Está seguro que desea eliminar TODOS los alumnos? Esta acción no se puede deshacer.')) {
            if (confirm('¿REALMENTE desea eliminar todos los registros? Esta es su última advertencia.')) {
                try {
                    const studentsRef = ref(db, 'students');
                    await remove(studentsRef);
                    students = [];
                    renderTable(students);
                    alert('Todos los alumnos han sido eliminados correctamente');
                } catch (error) {
                    console.error('Error deleting all students:', error);
                    alert('Error al eliminar los alumnos');
                }
            }
        }
    };
});