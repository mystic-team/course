const getData = () => {
  let userDetails = JSON.parse(localStorage.getItem("userDetails"));
  let currentClassName = localStorage.getItem("currentClassName");
  document.getElementById("heading").innerHTML = `<div class="col-start-2 col-span-full"><span class="font-medium text-5xl"> ${currentClassName} </span></div>`;
  let html = "";
 
  userDetails.forEach((c) => {
    if (c.className == currentClassName) {
      for (let i = 0; i < c.links.length; i++) {
        html += `
        <div class="grid items-center justify-items-center text-3xl card col-start-2 col-end-12 cursor-pointer h-28">
          <a target="_blank" class="block" href="${c.links[i]}">${c.postDetails[i]} </a>
        </div>
        `;
      }
    }
  });


  document.getElementById("allLinks").innerHTML = html;
};
