const showClass = (className) => {
  let userDetails = {};
  if (localStorage.getItem("userDetails").length > 10) {
    userDetails = JSON.parse(localStorage.getItem("userDetails"));
    document.getElementById("email").value = userDetails.email;
  }
  let index = userDetails.className.indexOf(className);
  let students = userDetails.students[index];
  localStorage.setItem("currentClassName", className);
  localStorage.setItem("currentStudents", JSON.stringify(students));
  window.location.href = "/class";
};
const getData = () => {
  userDetails = document.getElementById("userDetails").value;
  //   if (localStorage.getItem("userDetails").length < 10)
  localStorage.setItem("userDetails", userDetails);
  userDetails = JSON.parse(userDetails);
  let className = userDetails.className;
  let btn = "";
  className.forEach((c) => {
    btn += `<button onclick='showClass("${c}")'>${c}</button> <br>`;
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
