function changecolor1(){
  document.getElementById("htmlDiv").style.color="red";
}
function changecolor2(){
  document.getElementById("htmlDiv").style.color="white";
}
function changecolor3(){
  document.getElementById("cssDiv").style.color="red";
}
function changecolor4(){
  document.getElementById("cssDiv").style.color="yellow";
}
function changecolor5() {
  docuement.getElementById("cssDiv").style.color="silver";
}

function changecolor6(){
  document.getElementById("htmlDiv").style.color="golden";
}
window.addEventListener('load', () => { // Wait for the page to load
  const skillsDiv = document.getElementById('htmlDiv');

  skillsDiv.addEventListener('mouseover', () => {
    skillsDiv.style.transform = 'scale(1.05)'; // Scale up slightly on hover
  });

  skillsDiv.addEventListener('mouseout', () => {
    skillsDiv.style.transform = 'scale(1)'; // Return to normal size
  });
});
