import { db } from './firebase-config.js';
import { ref, get } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js';

document.addEventListener('DOMContentLoaded', async function() {
    const dayFilter = document.getElementById('dayFilter');
    const turnFilter = document.getElementById('turnFilter');
<<<<<<< HEAD
    const hourFilter = document.getElementById('hourFilter');
=======
>>>>>>> 1c02ea6807929384094183e93d1bb4b56ce6ac16
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
    
<<<<<<< HEAD
    // Function to populate hour filter with actual data
    function populateHourFilter() {
        const allHours = new Set();
        
        students.forEach(student => {
            if (student.horarios) {
                const horarios = Array.isArray(student.horarios) ? student.horarios : [student.horarios];
                horarios.forEach(hora => {
                    if (hora && hora.trim()) {
                        allHours.add(hora.trim());
                    }
                });
            }
        });
        
        // Sort hours
        const sortedHours = Array.from(allHours).sort((a, b) => {
            const timeA = new Date(`2000-01-01 ${a}`);
            const timeB = new Date(`2000-01-01 ${b}`);
            return timeA - timeB;
        });
        
        // Clear existing options except the first one
        const hourFilter = document.getElementById('hourFilter');
        hourFilter.innerHTML = '<option value="">Todas las horas</option>';
        
        // Add sorted hours
        sortedHours.forEach(hora => {
            const option = document.createElement('option');
            option.value = hora;
            option.textContent = hora;
            hourFilter.appendChild(option);
        });
        
        console.log('Available hours:', sortedHours);
    }
    
    // Function to render the schedule with modern card design
    function renderSchedule() {
        const selectedDay = dayFilter.value;
        const selectedTurn = turnFilter.value;
        const selectedHour = hourFilter.value;
        
        console.log('Filters:', { selectedDay, selectedTurn, selectedHour });
        
        const filteredStudents = students.filter(student => {
            const matchDay = !selectedDay || (student.dias && student.dias.includes(selectedDay));
            const matchTurn = !selectedTurn || (student.turnos && student.turnos.includes(selectedTurn));
            const matchHour = !selectedHour || (student.horarios && student.horarios.includes(selectedHour));
            
            console.log('Student:', student.nombre, {
                dias: student.dias,
                turnos: student.turnos,
                horarios: student.horarios,
                matchDay,
                matchTurn,
                matchHour
            });
            
            return matchDay && matchTurn && matchHour;
        });
        
        console.log('Filtered students:', filteredStudents.length);

        if (filteredStudents.length === 0) {
            scheduleList.innerHTML = '<p class="no-students">📅 No hay alumnos en este horario</p>';
            return;
        }

        // Create summary
        const totalStudents = filteredStudents.length;
        const uniqueDays = [...new Set(filteredStudents.flatMap(s => 
            Array.isArray(s.dias) ? s.dias : (s.dias ? [s.dias] : [])
        ))];
        const uniqueTurns = [...new Set(filteredStudents.flatMap(s => 
            Array.isArray(s.turnos) ? s.turnos : (s.turnos ? [s.turnos] : [])
        ))];
        const uniqueHours = [...new Set(filteredStudents.flatMap(s => 
            Array.isArray(s.horarios) ? s.horarios : (s.horarios ? [s.horarios] : [])
        ))];

        let html = `
            <div class="schedule-summary">
                <div class="summary-item">
                    <span class="summary-number">${totalStudents}</span>
                    <span class="summary-label">Alumnos</span>
                </div>
                <div class="summary-item">
                    <span class="summary-number">${uniqueDays.length}</span>
                    <span class="summary-label">Días</span>
                </div>
                <div class="summary-item">
                    <span class="summary-number">${uniqueTurns.length}</span>
                    <span class="summary-label">Turnos</span>
                </div>
                <div class="summary-item">
                    <span class="summary-number">${uniqueHours.length}</span>
                    <span class="summary-label">Horas</span>
                </div>
            </div>
        `;

        if (selectedDay) {
            // Show students for selected day
            html += '<div class="schedule-grid">';
            
            // Group by turn if a specific day is selected
            const turns = ['mañana', 'siesta', 'tarde', 'noche'];
            turns.forEach(turn => {
                const turnStudents = filteredStudents.filter(student => 
                    student.turnos.includes(turn)
                );
                
                if (turnStudents.length > 0) {
                    html += `
                        <div class="schedule-day-card">
                            <h3 class="schedule-day-title">${turn.toUpperCase()}</h3>
                            ${turnStudents.map(student => createStudentCard(student, turn)).join('')}
                        </div>
                    `;
                }
            });
            
            html += '</div>';
        } else if (selectedHour) {
            // Show students for selected hour
            html += '<div class="schedule-grid">';
            
            const days = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
            days.forEach(day => {
                const dayStudents = filteredStudents.filter(student => 
                    student.dias.includes(day)
                );
                
                if (dayStudents.length > 0) {
                    const dayDisplayNames = {
                        'lunes': 'LUNES',
                        'martes': 'MARTES', 
                        'miercoles': 'MIÉRCOLES',
                        'jueves': 'JUEVES',
                        'viernes': 'VIERNES',
                        'sabado': 'SÁBADO'
                    };
                    
                    html += `
                        <div class="schedule-day-card">
                            <h3 class="schedule-day-title">${dayDisplayNames[day]} - ${selectedHour}</h3>
                            ${dayStudents.map(student => createStudentCard(student)).join('')}
                        </div>
                    `;
                }
            });
            
            html += '</div>';
        } else {
            // Show by days when no specific day or hour is selected
            html += '<div class="schedule-grid">';
            
            const days = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
            days.forEach(day => {
                const dayStudents = filteredStudents.filter(student => 
                    student.dias.includes(day)
                );
                
                if (dayStudents.length > 0) {
                    const dayDisplayNames = {
                        'lunes': 'LUNES',
                        'martes': 'MARTES', 
                        'miercoles': 'MIÉRCOLES',
                        'jueves': 'JUEVES',
                        'viernes': 'VIERNES',
                        'sabado': 'SÁBADO'
                    };
                    
                    html += `
                        <div class="schedule-day-card">
                            <h3 class="schedule-day-title">${dayDisplayNames[day]}</h3>
                            ${dayStudents.map(student => createStudentCard(student)).join('')}
                        </div>
                    `;
                }
            });
            
            html += '</div>';
        }

        scheduleList.innerHTML = html;
    }

    // Function to create individual student cards
    function createStudentCard(student, highlightTurn = null) {
        const turnClass = highlightTurn ? `turn-${highlightTurn}` : '';
        
        // Ensure arrays and handle edge cases
        const horarios = Array.isArray(student.horarios) ? student.horarios : 
                        (student.horarios ? [student.horarios] : []);
        const turnos = Array.isArray(student.turnos) ? student.turnos : 
                      (student.turnos ? [student.turnos] : []);
        const dias = Array.isArray(student.dias) ? student.dias : 
                    (student.dias ? [student.dias] : []);
        
        const selectedHour = hourFilter.value;

        return `
            <div class="student-schedule-card ${turnClass}">
                <div class="student-name">${student.nombre} ${student.apellido}</div>
                <div class="student-details">
                    <div class="student-detail-item">
                        <strong>Días:</strong>
                        <span>${dias.length > 0 ? dias.join(', ') : 'No especificado'}</span>
                    </div>
                    <div class="student-detail-item">
                        <strong>Turnos:</strong>
                        <span>${turnos.length > 0 ? turnos.join(', ') : 'No especificado'}</span>
                    </div>
                    <div class="student-detail-item">
                        <strong>Horarios:</strong>
                        <div style="display: flex; flex-wrap: wrap; gap: 4px; margin-top: 4px;">
                            ${horarios.length > 0 ? horarios.map(h => {
                                const isHighlighted = selectedHour && h === selectedHour;
                                return `<span class="time-slot ${isHighlighted ? 'time-slot-highlighted' : ''}">${h}</span>`;
                            }).join('') : '<span class="time-slot">No especificado</span>'}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Initialize data and render
    try {
        students = await loadStudents();
        populateHourFilter(); // Populate hour filter with actual data
=======
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
>>>>>>> 1c02ea6807929384094183e93d1bb4b56ce6ac16
        renderSchedule();
        
        // Add event listeners
        dayFilter.addEventListener('change', renderSchedule);
        turnFilter.addEventListener('change', renderSchedule);
<<<<<<< HEAD
        hourFilter.addEventListener('change', renderSchedule);
=======
>>>>>>> 1c02ea6807929384094183e93d1bb4b56ce6ac16
    } catch (error) {
        console.error('Error initializing schedule:', error);
        scheduleList.innerHTML = '<p class="error">Error al cargar los horarios</p>';
    }
});