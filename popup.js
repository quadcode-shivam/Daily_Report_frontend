const addReportButton = document.getElementById('addReportButton');
const viewReportButton = document.getElementById('viewReportButton');
const reportPopup = document.getElementById('reportPopup');
const viewReportPopup = document.getElementById('viewReportPopup');
const reportTableBody = document.getElementById('reportTable').querySelector('tbody');
const pageInfo = document.getElementById('pageInfo');
const prevPageButton = document.getElementById('prevPage');
const nextPageButton = document.getElementById('nextPage');
const downloadCsvButton = document.getElementById('downloadCsvButton');

let currentPage = 1;
let totalPages = 1;
const itemsPerPage = 5;


function hideButtons() {
    addReportButton.style.display = 'none';
    viewReportButton.style.display = 'none';
}


function showButtons() {
    addReportButton.style.display = 'inline-block';
    viewReportButton.style.display = 'inline-block';
}


addReportButton.addEventListener('click', () => {
    reportPopup.style.display = 'block';
    hideButtons();
});


document.getElementById('closeAddPopup').addEventListener('click', () => {
    reportPopup.style.display = 'none';
    showButtons();
});


document.getElementById('reportForm').addEventListener('submit', async (event) => {
    event.preventDefault(); 

    const reportData = {
        task_description: document.getElementById('taskDescription').value,
        hours_worked: parseFloat(document.getElementById('hoursWorked').value),
        issues: document.getElementById('issues').value || null
    };

    try {
        const response = await fetch('http://localhost:8000/api/report', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reportData)
        });

        if (response.ok) {
            alert('Report submitted successfully!');
            document.getElementById('reportForm').reset(); 
            reportPopup.style.display = 'none'; 
            showButtons();
            currentPage = 1; 
            await fetchReports();
        } else {
            alert('Error submitting report. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error submitting report. Please check your connection.');
    }
});

viewReportButton.addEventListener('click', async () => {
    viewReportPopup.style.display = 'block';
    hideButtons();
    await fetchReports();
});

document.getElementById('closeViewPopup').addEventListener('click', () => {
    viewReportPopup.style.display = 'none';
    showButtons();
});

async function fetchReports() {
    try {
        const response = await fetch(`http://localhost:8000/api/reports?page=${currentPage}&perPage=${itemsPerPage}`);
        if (response.ok) {
            const data = await response.json();
            populateReportTable(data.reports);
            totalPages = data.totalPages; 
            updatePagination();
        } else {
            alert('Error fetching reports.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error fetching reports. Please check your connection.');
    }
}

function populateReportTable(reports) {
    reportTableBody.innerHTML = ''; 

    reports.forEach((report) => {
        const row = document.createElement('tr');
        
      
        row.innerHTML = `
            <td>${report.task_description}</td>
            <td class="text-center" style="width: 200px;">
                <div class="d-flex justify-content-between">
                    <button class="btn btn-danger btn-sm" onclick="deleteReport(${report.id})">
                        <i class="fas fa-trash-alt"></i> Remove
                    </button>
                </div>
            </td>
        `;

       
        row.addEventListener('click', () => toggleDetails(report.id));

        reportTableBody.appendChild(row);

  
        const detailsRow = document.createElement('tr');
        detailsRow.id = `details-${report.id}`;
        detailsRow.style.display = 'none'; 

        detailsRow.innerHTML = `
             <td colspan="2">
                <div class="p-3 bg-light border rounded">
                    <strong class="mb-2">Issues Faced</strong>
                    <p class="mb-3 text-secondary" style="font-size:12px">${report.issues || 'No issues reported.'}</p>
                    <div class="d-flex justify-content-between text-light">
                        <span class="badge bg-primary">Created At: ${new Date(report.created_at).toLocaleTimeString()}, ${new Date(report.created_at).toLocaleDateString()}</span>
                        <span class="badge bg-primary">Updated At: ${new Date(report.updated_at).toLocaleTimeString()}, ${new Date(report.updated_at).toLocaleDateString()}</span>
                    </div>
                </div>
            </td>
        `;

        reportTableBody.appendChild(detailsRow);
    });
}


function toggleDetails(reportId) {
    const detailsRow = document.getElementById(`details-${reportId}`);
    detailsRow.style.display = detailsRow.style.display === 'none' ? 'table-row' : 'none';
}

async function fetchAllReports() {
    const allReports = [];
    let currentPage = 1;
    const perPage = 100;

    while (true) {
        try {
            const response = await fetch(`http://localhost:8000/api/reports?page=${currentPage}&perPage=${perPage}`);
            if (!response.ok) {
                console.error('Error fetching all reports:', response.statusText);
                break; 
            }
            const data = await response.json();
            allReports.push(...data.reports);
            if (currentPage >= data.totalPages) break; 
            currentPage++;
        } catch (error) {
            console.error('Error fetching all reports:', error);
            break;
        }
    }
    return allReports;
}

downloadCsvButton.addEventListener('click', async () => {
    try {
        const reports = await fetchAllReports();
        console.log('Fetched Reports for CSV:', reports); 

        if (reports.length === 0) {
            alert('No reports available for download.');
            return;
        }

      
        const csvHeaders = 'Task Description,Hours Worked,Issues\n';
        const csvContent = 'data:text/csv;charset=utf-8,' + 
            csvHeaders + 
            reports.map(report => 
                `${report.task_description || 'N/A'},${report.hours_worked || 0},${report.issues || 'None'}`
            ).join('\n');

    
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'daily_reports.csv');
        document.body.appendChild(link);
        link.click(); 
        document.body.removeChild(link); 
        URL.revokeObjectURL(url);

    } catch (error) {
        console.error('Error downloading CSV:', error);
        alert('Error downloading CSV. Please try again.');
    }
});


async function deleteReport(reportId) {
    if (confirm('Are you sure you want to delete this report?')) {
        try {
            const response = await fetch(`http://localhost:8000/api/report/${reportId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert('Report deleted successfully.');
                fetchReports(); 
            } else {
                alert('Error deleting report.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error deleting report. Please check your connection.');
        }
    }
}

function updatePagination() {
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    prevPageButton.disabled = currentPage === 1;
    nextPageButton.disabled = currentPage === totalPages;
}


prevPageButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        fetchReports();
    }
});

nextPageButton.addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;
        fetchReports();
    }
});
