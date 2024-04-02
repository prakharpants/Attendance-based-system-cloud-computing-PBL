// Sample student data
const students = [
  { name: "AKSHAR", rollNo: "1", prn: "2114110249" },
  { name: "ABHISHEK ANAND", rollNo: "2", prn: "2114110250" },
  { name: "SHUBHAM RAHUL ATHALE", rollNo: "3", prn: "2114110251" },
  { name: "YASH BHARDWAJ", rollNo: "4", prn: "2114110252" },
  { name: "PALAK UDAYSING CHANDEL", rollNo: "5", prn: "2114110253" },
  { name: "PRATEEK CHATURVEDI", rollNo: "6", prn: "2114110254" },
  { name: "MANISH CHAURASIA", rollNo: "7", prn: "2114110255" },
  { name: "HARSHIT GAUR", rollNo: "8", prn: "2114110256" },
  { name: "SHRUTI JAIN", rollNo: "9", prn: "2114110258" },
  { name: "BHASKAR JAISWAL", rollNo: "10", prn: "2114110259" },
  { name: "AYUSH KUMAR JHA", rollNo: "11", prn: "2114110260" },
  { name: "AMZAD RAZAA KHAN", rollNo: "12", prn: "2114110261" },
  { name: "PUNEET KUMAR", rollNo: "13", prn: "2114110262" },
  { name: "ANIKET KUMAR", rollNo: "14", prn: "2114110263" },
  { name: "UJJAWAL KUMAR", rollNo: "15", prn: "2114110264" },
  { name: "PALLAVI KUMARI", rollNo: "16", prn: "2114110266" },
  { name: "PRAKHAR PANT", rollNo: "17", prn: "2114110267" },
  { name: "NEHAL PARASHAR", rollNo: "18", prn: "2114110268" },
  { name: "MANU PRATAP SINGH PARIHAR", rollNo: "19", prn: "2114110269" },
  { name: "NILANSHI PUROHIT", rollNo: "20", prn: "2114110270" },
];

// Function to populate the student dropdown
function populateStudentDropdown() {
  const dropdown = document.getElementById("student-dropdown");
  students.forEach((student) => {
    const option = document.createElement("option");
    option.value = student.name;
    option.textContent = `${student.name} - ${student.rollNo}`; // Include roll number
    dropdown.appendChild(option);
  });
}

// Function to handle form submission
async function handleFormSubmit(event) {
  event.preventDefault();

  const date = document.getElementById("attendance-date").value;
  const studentName = document.getElementById("student-dropdown").value;
  const attendanceStatus = document.querySelector(
    'input[name="attendanceStatus"]:checked'
  ).value;

  // Basic client-side validation (optional)
  if (!date || !studentName || !attendanceStatus) {
    alert("Please fill out all required fields.");
    return;
  }

  const requestData = { date, student: studentName, attendanceStatus };

  try {
    const response = await fetch("http://localhost:5501/attendance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    });

    console.log("Response status:", response.status);
    console.log("Response headers:", response.headers);
    console.log("Response body:", await response.text());

    if (response.status === 201) {
      console.log("Attendance submitted successfully");

      // Update UI to indicate success
      const attendanceList = document.getElementById("attendance-list");
      const listItem = document.createElement("li");
      listItem.innerHTML = `
        <span class="date">${date}</span>
        <span class="name">${studentName}</span>
        <span class="roll">${
          students.find((s) => s.name === studentName).rollNo
        }</span>
        <span class="prn">${
          students.find((s) => s.name === studentName).prn
        }</span>
        <span class="status">${attendanceStatus}</span>
      `;
      attendanceList.appendChild(listItem);

      // Optionally, clear the form or disable submission until next entry
    } else {
      const responseData = await response.text(); // Capture response text from server
      console.error("Error sending request:", responseData);
      alert("An error occurred. Please try again later.");
    }
  } catch (err) {
    console.error("Error sending request:", err);
    alert("An error occurred. Please try submitting again later.");
  }
}

// Populate student dropdown on page load
document.addEventListener("DOMContentLoaded", () => {
  populateStudentDropdown();
});

// Event listener for form submission
const attendanceForm = document.getElementById("attendance-form");
attendanceForm.addEventListener("submit", handleFormSubmit);
