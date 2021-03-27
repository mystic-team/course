const showClass = (className, email) => {
  let userDetails = {};
  localStorage.setItem("currentClassName", className);
  window.location.href = "/userClass";
};

const getData = () => {
  let userDetails = document.getElementById("userDetails").value;
  localStorage.setItem("userDetails", userDetails);
  document.getElementById("userDetails").value = "";
  document.getElementById("data").innerHTML = "";
  userDetails = JSON.parse(userDetails);
  userDetails = userDetails.sort((a, b) => a.sem - b.sem);
  localStorage.setItem("userDetails", JSON.stringify(userDetails));
  let currentUser = [];
  let html = "";
  userDetails.forEach((c) => {
    let [links, postDetails, sem, className] = [
      c.links,
      c.postDetails,
      c.sem,
      c.className,
    ];
    html += `<button onclick=showClass('${className}') > ${className} </button>`;
  });
  document.getElementById("allClass").innerHTML = html;
  console.log(currentUser);
};
