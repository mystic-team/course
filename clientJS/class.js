const getData = () => {
  let userDetails = JSON.parse(localStorage.getItem("userDetails"));
  let currentClassName = localStorage.getItem("currentClassName");
  let currentStudents = localStorage.getItem("currentStudents");
  document.getElementById("heading").innerHTML =
    "This is your " + currentClassName + "'s class";
  document.getElementById("email").value = userDetails.email;
  document.getElementById("className").value = currentClassName;
};
