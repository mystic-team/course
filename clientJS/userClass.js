const getData = () => {
  let userDetails = JSON.parse(localStorage.getItem("userDetails"));
  let currentClassName = localStorage.getItem("currentClassName");
  document.getElementById("heading").innerHTML = `<div class="col-start-2 col-span-full"><span class="font-medium text-5xl"> ${currentClassName} </span></div>`;
  let html = "";
  let imgsrc = "other.png";
  userDetails.forEach((c) => {
    if (c.className == currentClassName) {
      for (let i = 0; i < c.links.length; i++) {
        if(c.format[i] == "pdf")
        {
          imgsrc = "document.png";
        }
        else if(c.format[i] == "mp4" || c.format == "wav")
        {
          imgsrc = "video.png";
        }
        html += `
        <a href="${c.links[i]}" target="_blank" class="grid grid-cols-2 items-center justify-items-start text-3xl card col-start-2 col-end-12 cursor-pointer h-28">
          <img class="col-start-1 pl-5" src='../../../static/imgs/${imgsrc}'>
          <div>${c.postDetails[i]} </div>
        </a>
        `;
        imgsrc = "other.png";
      }
    }
  });


  document.getElementById("allLinks").innerHTML = html;
};
