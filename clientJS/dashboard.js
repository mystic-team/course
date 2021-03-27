const showClass = (className) => {
  let userDetails = {};
  if (localStorage.getItem("userDetails").length > 10) {
    userDetails = JSON.parse(localStorage.getItem("userDetails"));
    document.getElementById("email").value = userDetails.email;
  }
  userDetails.sorted.forEach((c) => {
    if (c.className == className) {
      students = c.students;
      localStorage.setItem("currentStudents", JSON.stringify(students));
    }
  });
  localStorage.setItem("currentClassName", className);
  window.location.href = "/class";
};
const getData = () => {
  userDetails = document.getElementById("userDetails").value;
  //   if (localStorage.getItem("userDetails").length < 10)
  localStorage.setItem("userDetails", userDetails);
  userDetails = JSON.parse(userDetails);
  let btn = "";
  userDetails.sorted.forEach((c) => {
    btn += `<button onclick='showClass("${c.className}")'>${c.className}</button> <br>`;
  });
  document.getElementById("allClasses").innerHTML = btn;
};
const addClass = () => {
  let userDetails = {};
  if (localStorage.getItem("userDetails").length > 10) {
    userDetails = JSON.parse(localStorage.getItem("userDetails"));
    document.getElementById("email").value = userDetails.email;
  }
  form = document.getElementById("form");
  if (form.style.display == "block") {
    form.style.display = "none";
  } else {
    form.style.display = "block";
  }
};
