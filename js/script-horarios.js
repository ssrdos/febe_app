document.addEventListener('DOMContentLoaded', function() {
    const dayFilter = document.getElementById('dayFilter');
    const turnFilter = document.getElementById('turnFilter');
    const scheduleList = document.getElementById('scheduleList');
    
    function renderSchedule() {
        const selectedDay = dayFilter.value;
        const selectedTurn = turnFilter.value;
        
        // Obtener estudiantes del localStorage
        const students = JSON.parse(localStorage.getItem('students') || '[]');
        
        // Filtrar estudiantes según los criterios seleccionados
        const filteredStudents = students.filter(student => {
            const matchDay = !selectedDay || student.dias.includes(selectedDay);
            const matchTurn = !selectedTurn || student.turnos.includes(selectedTurn);
            return matchDay && matchTurn;
        });

        // Renderizar resultados
        if (filteredStudents.length === 0) {
            scheduleList.innerHTML = '<p class="no-students">No hay alumnos en este horario</p>';
            return;
        }

        let html = '<table class="students-table">';
        html += `
            <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Días</th>
                <th>Turnos</th>
                <th>Horarios</th>
            </tr>`;

        filteredStudents.forEach(student => {
            html += `
                <tr>
                    <td>${student.nombre}</td>
                    <td>${student.apellido}</td>
                    <td>${student.dias.join(', ')}</td>
                    <td>${student.turnos.join(', ')}</td>
                    <td>${student.horarios.join(', ')}</td>
                </tr>`;
        });

        html += '</table>';
        scheduleList.innerHTML = html;
    }

    // Eventos para los filtros
    dayFilter.addEventListener('change', renderSchedule);
    turnFilter.addEventListener('change', renderSchedule);

    // Renderizar inicial
    renderSchedule();
});