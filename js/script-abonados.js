async function viewPaymentHistory(studentId) {
    try {
        const historyRef = ref(db, `payments/${studentId}`);
        const snapshot = await get(historyRef);
        const modal = document.getElementById('paymentHistoryModal');
        const content = document.getElementById('paymentHistoryContent');
        
        let html = '<table class="payment-history-table">';
        html += `
            <tr>
                <th>Fecha</th>
                <th>Monto</th>
                <th>Método</th>
                <th>Mes Abonado</th>
            </tr>`;

        if (snapshot.exists()) {
            snapshot.forEach((childSnapshot) => {
                const payment = childSnapshot.val();
                html += `
                    <tr>
                        <td>${new Date(payment.fecha).toLocaleDateString()}</td>
                        <td>$${payment.monto}</td>
                        <td>${payment.metodoPago}</td>
                        <td>${payment.mesAbonado}</td>
                    </tr>`;
            });
        } else {
            html += '<tr><td colspan="4">No hay historial de pagos</td></tr>';
        }

        html += '</table>';
        content.innerHTML = html;
        modal.style.display = 'block';
    } catch (error) {
        console.error('Error loading payment history:', error);
        alert('Error al cargar el historial de pagos');
    }
}

function closePaymentHistory() {
    document.getElementById('paymentHistoryModal').style.display = 'none';
}