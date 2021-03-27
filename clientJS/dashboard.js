const getData = () => {
  userDetails = document.getElementById("userDetails").value;
  console.log(JSON.parse(userDetails));
  localStorage.setItem("userDetails", userDetails);
};
