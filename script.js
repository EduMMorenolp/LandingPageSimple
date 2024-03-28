console.log("hola")

document.addEventListener("DOMContentLoaded", function() {
    
    let habilidades = document.getElementById("habilidades");

    const skills = ["HTML", "CSS"];

    habilidades.innerHTML = skills.join(", ");
});