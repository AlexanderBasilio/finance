        // Set dynamic user name
        const userName = "John Doe"; // Replace with dynamic value
        document.getElementById('userName').textContent = userName;

        // Function to add a new row to a table
        function addRow(tableId) {
            const table = document.getElementById(tableId).querySelector('tbody');
            const newRow = document.createElement('tr');

            const fields = ["date", "", "text", "number"];

            fields.forEach((type, index) => {
                const newCell = document.createElement('td');
                if (type === "") {
                    newCell.className = "month-cell";
                } else {
                    const input = document.createElement('input');
                    input.type = type;
                    if (type === "date") input.onchange = function() { updateMonth(input) };
                    input.placeholder = index === 2 ? "Descripción" : "Monto";
                    newCell.appendChild(input);
                }
                newRow.appendChild(newCell);
            });

            table.appendChild(newRow);
        }

        // Function to update the month cell based on the date input
        function updateMonth(dateInput) {
            const date = new Date(dateInput.value);
            const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
            if (!isNaN(date)) {
                const monthCell = dateInput.parentElement.nextElementSibling;
                monthCell.textContent = monthNames[date.getMonth()];
            }
        }

        // Function to calculate totals
        function calculateTotals() {
            const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
            const ingresosTable = document.getElementById('ingresosTable').querySelectorAll('tbody tr');
            const egresosTable = document.getElementById('egresosTable').querySelectorAll('tbody tr');

            const ingresosTotales = new Array(12).fill(0);
            const egresosTotales = new Array(12).fill(0);

            ingresosTable.forEach(row => {
                const cells = row.querySelectorAll('td');
                if (cells.length === 4 && cells[3].querySelector('input').value) {
                    const mes = months.indexOf(cells[1].textContent.trim());
                    if (mes !== -1) ingresosTotales[mes] += parseFloat(cells[3].querySelector('input').value);
                }
            });

            egresosTable.forEach(row => {
                const cells = row.querySelectorAll('td');
                if (cells.length === 4 && cells[3].querySelector('input').value) {
                    const mes = months.indexOf(cells[1].textContent.trim());
                    if (mes !== -1) egresosTotales[mes] += parseFloat(cells[3].querySelector('input').value);
                }
            });

            const saldo = ingresosTotales.map((ingreso, index) => ingreso - egresosTotales[index]);

            updateSummaryRow('ingresosTotalesRow', ingresosTotales);
            updateSummaryRow('egresosTotalesRow', egresosTotales);
            updateSummaryRow('saldoRow', saldo);
        }

        function updateSummaryRow(rowId, data) {
            const row = document.getElementById(rowId);
            row.innerHTML = data.map(value => `<td>${value.toFixed(2)}</td>`).join('');
        }