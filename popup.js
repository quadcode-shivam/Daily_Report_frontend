const addReportButton = document.getElementById('addReportButton');
const viewReportButton = document.getElementById('viewReportButton');
const reportPopup = document.getElementById('reportPopup');
const viewReportPopup = document.getElementById('viewReportPopup');
const reportTableBody = document.getElementById('reportTable').querySelector('tbody');

// Function to hide both buttons
function hideButtons() {
    addReportButton.style.display = 'none';
    viewReportButton.style.display = 'none';
}

// Function to show both buttons
function showButtons() {
    addReportButton.style.display = 'inline-block';
    viewReportButton.style.display = 'inline-block';
}

// Show the add report popup and hide buttons
addReportButton.addEventListener('click', () => {
    reportPopup.style.display = 'block';
    hideButtons();
});

// Close add report popup
document.getElementById('closeAddPopup').addEventListener('click', () => {
    reportPopup.style.display = 'none';
    showButtons();
});

// Submit new report
document.getElementById('reportForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

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
            document.getElementById('reportForm').reset(); // Reset the form fields
            // Optionally, you can close the window or redirect
            window.close(); // Closes the current window/tab
        } else {
            alert('Error submitting report. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error submitting report. Please check your connection.');
    }
});

// Show the view report popup and fetch reports
viewReportButton.addEventListener('click', async () => {
    viewReportPopup.style.display = 'block';
    hideButtons();
    await fetchReports();
});

// Close view report popup
document.getElementById('closeViewPopup').addEventListener('click', () => {
    viewReportPopup.style.display = 'none';
    showButtons();
});

// Fetch reports and populate the table
async function fetchReports() {
    try {
        const response = await fetch('http://localhost:8000/api/reports');
        if (response.ok) {
            const reports = await response.json();
            populateReportTable(reports);
        } else {
            alert('Error fetching reports.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error fetching reports. Please check your connection.');
    }
}

function populateReportTable(reports) {
    reportTableBody.innerHTML = ''; // Clear previous rows

    reports.forEach((report) => {
        const row = document.createElement('tr');
        
        // Create a main row for task title, edit, and delete buttons
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

        // Add click event to toggle accordion details
        row.addEventListener('click', () => toggleDetails(report.id));

        reportTableBody.appendChild(row);

        // Create a hidden row for additional details (accordion content)
        const detailsRow = document.createElement('tr');
        detailsRow.id = `details-${report.id}`;
        detailsRow.style.display = 'none';  // Hide by default

        detailsRow.innerHTML = `
             <td colspan="2">
                <div class="p-3 bg-light border rounded">
                    <Strong class="mb-2"> Issues Faced</Strong>
                    <p class="mb-3 text-secondory" style="font-size:12px">${report.issues || 'No issues reported.'}</p>
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

// Function to toggle the display of details row
function toggleDetails(reportId) {
    const detailsRow = document.getElementById(`details-${reportId}`);
    detailsRow.style.display = detailsRow.style.display === 'none' ? 'table-row' : 'none';
}


async function deleteReport(reportId) {
    if (confirm('Are you sure you want to delete this report?')) {
        try {
            const response = await fetch(`http://localhost:8000/api/report/${reportId}`, { method: 'DELETE' });
            if (response.ok) {
                alert('Report deleted successfully');
                await fetchReports();
            } else {
                alert('Error deleting report.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error deleting report. Please check your connection.');
        }
    }
}
