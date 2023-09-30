let btnSwitch = document.getElementById("switch");

btnSwitch.addEventListener("click", ()=>{
    document.body.classList.toggle("dark")
    btnSwitch.classList.toggle("active")
})


