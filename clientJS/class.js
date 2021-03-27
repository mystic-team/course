const getData = () => {
  let userDetails = JSON.parse(localStorage.getItem("userDetails"));
  let currentClassName = localStorage.getItem("currentClassName");
  let currentStudents = localStorage.getItem("currentStudents");
  document.getElementById("heading").innerHTML =
    "This is your " + currentClassName + "'s class";
  document.getElementById("email").value = userDetails.email;
  document.getElementById("className").value = currentClassName;
  let html = "";
  userDetails.sorted.forEach((c) => {
    if (c.className == currentClassName) {
      for (let i = 0; i < c.links.length; i++) {
        html += `<a href="${c.links[i]}">${c.postDetails[i]} </a> <br>`;
      }
    }
  });
  document.getElementById("allLinks").innerHTML = html;
};
