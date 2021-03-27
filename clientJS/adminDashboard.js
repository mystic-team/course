const getData = () => {
  let teachers = document.getElementById("teachers").value;
  let students = document.getElementById("students").value;
  localStorage.setItem("teachers", teachers);
  localStorage.setItem("students", students);
};
