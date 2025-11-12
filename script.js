// Function to parse CSV text into an array of objects (from previous step)
function parseCSV(csvText) {
        // Note: Use a simple manual split or a library like Papa Parse for robust parsing
        const lines = csvText.trim().split('\n'); 
        const headers = lines[0].split(','); 
        const data = [];
    
        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',');
            if (values.length === headers.length) {
                const obj = {};
                for (let j = 0; j < headers.length; j++) {
                    obj[headers[j]] = values[j];
                }
                data.push(obj);
            }
        }
        return { headers, data };
    }
    
    // Function to build the HTML table and place it inside the container
    function buildTable(headers, data) {
        const container = document.getElementById('csvTableContainer');
        
        // Create the table element
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');
    
        // Build table header row
        let headerHtml = '<tr>';
        headers.forEach(header => {
            headerHtml += `<th>${header}</th>`;
        });
        headerHtml += '</tr>';
        thead.innerHTML = headerHtml;
    
        // Build table body rows
        let bodyHtml = '';
        data.forEach(row => {
            bodyHtml += '<tr>';
            headers.forEach(header => {
                bodyHtml += `<td>${row[header]}</td>`;
            });
            bodyHtml += '</tr>';
        });
        tbody.innerHTML = bodyHtml;
    
        // Append header and body to the table
        table.appendChild(thead);
        table.appendChild(tbody);
    
        // Append the complete table to the container div
        container.appendChild(table);
    }
    
    // Fetch the CSV file and display it
    fetch('points.csv') // Make sure 'data.csv' is in the right location
        .then(response => response.text())
        .then(csvText => {
            const parsedData = parseCSV(csvText);
            buildTable(parsedData.headers, parsedData.data);
        })
        .catch(error => {
            console.error('Error fetching the CSV file:', error);
        });
    


        