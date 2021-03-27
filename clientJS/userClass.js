const getData = () => {
  let userDetails = JSON.parse(localStorage.getItem("userDetails"));
  let currentClassName = localStorage.getItem("currentClassName");
  document.getElementById("heading").innerHTML =
    "This is your " + currentClassName + "'s class";
  let html = "";
  userDetails.forEach((c) => {
    if (c.className == currentClassName) {
      for (let i = 0; i < c.links.length; i++) {
        html += `<a href="${c.links[i]}">${c.postDetails[i]} </a> <br>`;
      }
    }
  });
  document.getElementById("allLinks").innerHTML = html;
};
