import { db } from './firebase-config.js';
import { ref, set, get, onValue, push } from 'https://www.gstatic.com/firebasejs/9.x.x/firebase-database.js';

export const saveStudent = async (student) => {
    try {
        const studentsRef = ref(db, 'students');
        const newStudentRef = push(studentsRef);
        await set(newStudentRef, student);
        console.log('Data saved successfully');
        return true;
    } catch (error) {
        console.error('Error saving data:', error);
        return false;
    }
};

export const getStudents = async () => {
    try {
        const studentsRef = ref(db, 'students');
        const snapshot = await get(studentsRef);
        if (snapshot.exists()) {
            const students = [];
            snapshot.forEach((childSnapshot) => {
                students.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            return students;
        }
        return [];
    } catch (error) {
        console.error('Error getting data:', error);
        return [];
    }
};

export const testConnection = () => {
    const connectedRef = ref(db, '.info/connected');
    onValue(connectedRef, (snap) => {
        if (snap.val() === true) {
            console.log('Connected to Firebase');
        } else {
            console.log('Not connected to Firebase');
        }
    });
};