const getData = () => {
  let currentClassName = localStorage.getItem("currentClassName");
  let currentStudents = localStorage.getItem("currentStudents");
  document.getElementById("heading").innerHTML =
    "This is your " + currentClassName + "'s class";
};
