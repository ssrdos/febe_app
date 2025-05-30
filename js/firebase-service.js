import { db } from './firebase-config.js';
import { ref, set, get, onValue, push } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js';

export const saveStudent = async (student) => {
    try {
        const studentsRef = ref(db, 'students');
        const newStudentRef = push(studentsRef);
        
        await set(newStudentRef, {
            ...student,
            timestamp: Date.now()
        });
        
        console.log('Data saved successfully');
        return true;
    } catch (error) {
        console.error('Error saving data:', error);
        if (error.code === 'PERMISSION_DENIED') {
            alert('Error: No tienes permiso para guardar datos. Por favor, actualiza la página.');
        } else {
            alert('Error al guardar los datos. Por favor, intenta nuevamente.');
        }
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

export const savePaymentHistory = async (studentId, paymentData) => {
    try {
        const historyRef = ref(db, `payments/${studentId}`);
        const newPaymentRef = push(historyRef);
        await set(newPaymentRef, {
            fecha: paymentData.fecha,
            monto: paymentData.monto,
            metodoPago: paymentData.metodoPago,
            mesAbonado: paymentData.mesAbonado,
            timestamp: Date.now()
        });
        return true;
    } catch (error) {
        console.error('Error saving payment history:', error);
        return false;
    }
};