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

  // h2 += `
  //     <h2 class="text-3xl row-start-${rowsCount} col-start-1 col-span-full" > <img class="w-7 inline" src="./static/imgs/pencil.svg"> Semester - ${c.sem} </h2>
  //     `;
  // html = `
  //     <div class="logsign grid items-center justify-items-center card h-28 row-start-${rowsCount} col-start-${colCount} col-span-4 cursor-pointer" onclick='showClass("${c.className}")'>
  //       <span class="text-3xl">${c.className}</span>
  //     </div>
  let html = "";
  let h2="";
  let rowsCount = 1;
  let colCount = 1;
  let semCount = 0;
  userDetails.forEach((c,index,array) => {
    let [links, postDetails, sem, className] = [
      c.links,
      c.postDetails,
      c.sem,
      c.className,
    ];
    if(semCount !== sem)
    {
      h2 += `
      <h2 class="text-3xl row-start-${rowsCount} col-start-1 col-span-full" > <img class="w-7 inline" src="./static/imgs/pencil.svg"> Semester - ${sem} </h2>
      `;
      console.log(h2)
      semCount = sem;
      colCount = 1;
      rowsCount++;
    }
      html = `<div class="logsign grid items-center justify-items-center card h-28 row-start-${rowsCount} col-start-${colCount} col-span-4 cursor-pointer" onclick=showClass('${className}') >
       <span class="text-3xl">
        ${className} 
        </span>
      </div>
      `;
      h2 += html;
      colCount += 4;
      if(colCount>12){
        colCount = 1;
        rowsCount++;
      }
      if (array[index + 1] && array[index + 1].sem != semCount) {
        rowsCount++;
      }
  });
  document.getElementById("allClass").innerHTML = h2;
  console.log(currentUser);
};
