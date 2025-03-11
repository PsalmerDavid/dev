document.getElementById('excelFile').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        displayTable(jsonData);
    };
    reader.readAsArrayBuffer(file);
});

function displayTable(data) {
    const table = document.getElementById('excelTable');
    const thead = table.querySelector('thead');
    const tbody = table.querySelector('tbody');

    // Clear previous table content
    thead.innerHTML = "";
    tbody.innerHTML = "";

    // Define the columns to be displayed (adjust as needed)
    const columnsToDisplay = ['ID', 'Name', 'Dep'];

    // Create table header with the specified columns
    const headerRow = document.createElement('tr');
    columnsToDisplay.forEach(col => {
        const th = document.createElement('th');
        th.textContent = col;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    // Populate table rows with only the desired columns
    data.forEach(row => {
        const tr = document.createElement('tr');
        columnsToDisplay.forEach(key => {
            const td = document.createElement('td');
            td.textContent = row[key] !== undefined ? row[key] : "";
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
}
