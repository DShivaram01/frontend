
window.addEventListener("load", function () {
  const firstBox = document.getElementById("ch1");
  if (firstBox) {
    firstBox.focus();
  }

  const submitBtn = document.getElementById("gpaSubmit");
  const resetBtn  = document.getElementById("gpaReset");

  if (submitBtn) {
    submitBtn.addEventListener("click", calculateGPA);
  }
  if (resetBtn) {
    resetBtn.addEventListener("click", clearGPA);
  }
});

function gradeToPoints(letter) {
  if (!letter) return null;

  const g = letter.trim().toUpperCase();
  switch (g) {
    case "A": return 4;
    case "B": return 3;
    case "C": return 2;
    case "D": return 1;
    case "F": return 0;
    default:  return null; 
  }
}

function calculateGPA() {
  const chIds = ["ch1", "ch2", "ch3", "ch4", "ch5"];
  const grIds = ["gr1", "gr2", "gr3", "gr4", "gr5"];

  let totalQualityPoints = 0; 
  let totalCredits = 0;       
  let usedCourses = 0;        

  for (let i = 0; i < chIds.length; i++) {
    const chInput = document.getElementById(chIds[i]);
    const grInput = document.getElementById(grIds[i]);

    const chVal = chInput.value.trim();
    const grVal = grInput.value.trim();

    if (chVal === "" && grVal === "") {
      continue;
    }

    if (chVal === "" || grVal === "") {
      alert("Please enter BOTH credit hours and grade for Course " + (i + 1) + ".");
      return;
    }

    const credits = parseFloat(chVal);
    const points  = gradeToPoints(grVal);

    if (isNaN(credits) || credits <= 0) {
      alert("Please enter a valid positive number of credit hours for Course " + (i + 1) + ".");
      return;
    }

    if (points === null) {
      alert("Please enter a valid letter grade (A, B, C, D, or F) for Course " + (i + 1) + ".");
      return;
    }

    totalQualityPoints += points * credits;
    totalCredits       += credits;
    usedCourses++;
  }

  if (usedCourses < 2) {
    alert("Please enter at least 2 courses (both credit hours and grade).");
    document.getElementById("gpaResult").value = "";
    return;
  }

  if (totalCredits === 0) {
    alert("Total credit hours cannot be zero.");
    document.getElementById("gpaResult").value = "";
    return;
  }

  const gpa = totalQualityPoints / totalCredits;

  document.getElementById("gpaResult").value = gpa.toFixed(2);
}

function clearGPA() {
  const ids = [
    "ch1","ch2","ch3","ch4","ch5",
    "gr1","gr2","gr3","gr4","gr5",
    "gpaResult"
  ];

  ids.forEach(function (id) {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });

  const firstBox = document.getElementById("ch1");
  if (firstBox) {
    firstBox.focus();
  }
}
