import { db } from './firebase-config.js';
import { ref, get } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js';

document.addEventListener('DOMContentLoaded', async function() {
    const dayFilter = document.getElementById('dayFilter');
    const turnFilter = document.getElementById('turnFilter');
    const scheduleList = document.getElementById('scheduleList');
    let students = [];

    // Function to get students from Firebase
    async function loadStudents() {
        try {
            const studentsRef = ref(db, 'students');
            const snapshot = await get(studentsRef);
            if (snapshot.exists()) {
                students = [];
                snapshot.forEach((childSnapshot) => {
                    students.push({
                        id: childSnapshot.key,
                        ...childSnapshot.val()
                    });
                });
                console.log('Loaded students:', students);
            }
            return students;
        } catch (error) {
            console.error('Error loading students:', error);
            return [];
        }
    }
    
    // Function to render the schedule
    function renderSchedule() {
        const selectedDay = dayFilter.value;
        const selectedTurn = turnFilter.value;
        
        const filteredStudents = students.filter(student => {
            const matchDay = !selectedDay || student.dias.includes(selectedDay);
            const matchTurn = !selectedTurn || student.turnos.includes(selectedTurn);
            return matchDay && matchTurn;
        });

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
                    <td>${Array.isArray(student.dias) ? student.dias.join(', ') : student.dias}</td>
                    <td>${Array.isArray(student.turnos) ? student.turnos.join(', ') : student.turnos}</td>
                    <td>${Array.isArray(student.horarios) ? student.horarios.join(', ') : student.horarios}</td>
                </tr>`;
        });

        html += '</table>';
        scheduleList.innerHTML = html;
    }

    // Initialize data and render
    try {
        students = await loadStudents();
        renderSchedule();
        
        // Add event listeners
        dayFilter.addEventListener('change', renderSchedule);
        turnFilter.addEventListener('change', renderSchedule);
    } catch (error) {
        console.error('Error initializing schedule:', error);
        scheduleList.innerHTML = '<p class="error">Error al cargar los horarios</p>';
    }
});