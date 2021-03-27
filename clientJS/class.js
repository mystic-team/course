const getData = () => {
  let userDetails = JSON.parse(localStorage.getItem("userDetails"));
  let currentClassName = localStorage.getItem("currentClassName");
  let currentStudents = JSON.parse(localStorage.getItem("currentStudents"));
  document.getElementById("heading").innerHTML = "This is your " + currentClassName + "'s class";
  document.getElementById("email").value = userDetails.email;
  document.getElementById("className").value = currentClassName;
  let list = "";
  let listOfStudents = document.querySelector('.listOfStudents');
  for (let index = 0; index < currentStudents.length; index++) {
    list += `
    <h3 class="logsign text-2xl p-2 text-white">
      ${currentStudents[index]}  
    </h3>
    `
  }
  listOfStudents.innerHTML = list;
  let html = "";
  userDetails.sorted.forEach((c) => {
    if (c.className == currentClassName) {
      for (let i = 0; i < c.links.length; i++) {
        html += `
        <div class="grid items-center justify-items-center text-3xl card col-start-4 col-span-full cursor-pointer h-28 ">
          <a target="_blank" class="block" href="${c.links[i]}">${c.postDetails[i]} </a>
        </div>
        `;
      }
    }
  });
  document.getElementById("allLinks").innerHTML = html;
};


