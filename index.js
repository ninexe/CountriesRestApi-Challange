const contriesElem = document.querySelector(".contries");
const dropDown= document.querySelector(".dropDown")
const dropElem= document.querySelector(".drop")
const region= document.querySelectorAll(".region")
const search= document.querySelector(".search")
const toggle= document.querySelector(".toggle")
const moon= document.querySelector(".moon")
const pre_carremento = document.querySelector("div.pre-carregamento");
getCountry();

async function getCountry(){
    pre_carremento.style.opacity = "0";
    setTimeout(() => {
        pre_carremento.style.display = "none";
    }, 2000);
    const url=await fetch("https://restcountries.com/v2/all");
    const res=await url.json();
    res.forEach(element => {
        showCountry(element); 
    });
}

function showCountry(data){
    const contry = document.createElement("div")
    contry.classList.add("contry")
    contry.innerHTML= `
    <div class="country-img">
        <img src="${data.flag}" alt="">
    </div>
    <div class="country-info">
        <h5 class="countryName">${data.name}</h5>
        <p><strong>Sigla:</strong> ${data.alpha2Code}</p>
        <p class="regionName"><strong>Região:</strong> ${data.region}</p>
    </div>`;
    contriesElem.appendChild(contry)
    contry.addEventListener("click", ()=>{
        showCountryDetail(data);
    })
}

dropDown.addEventListener("click",()=>{
    dropElem.classList.toggle("showDropDown")
})

const regionName= document.getElementsByClassName("regionName")
const countryName= document.getElementsByClassName("countryName")
region.forEach(element =>{
    element.addEventListener("click", ()=> {
        Array.from(regionName).forEach(elem => {
            if (elem.innerText.includes(element.innerText) || element.innerText=="Todos" ) {
                elem.parentElement.parentElement.style.display="grid"
            }else{
                elem.parentElement.parentElement.style.display="none"
            }
        });
    })
})

search.addEventListener("input", ()=>{
    Array.from(countryName).forEach(elem => {
        if (elem.innerText.toLowerCase().includes(search.value.toLowerCase())) {
            elem.parentElement.parentElement.style.display="grid"
        }else{
            elem.parentElement.parentElement.style.display="none"
        }
    });
})
toggle.addEventListener("click", ()=>{
    document.body.classList.toggle("dark")
    moon.classList.toggle("fas")
})

const countryModal=document.querySelector(".countryModal");
function showCountryDetail(data){
    countryModal.classList.toggle("show");
    countryModal.innerHTML=`
    <button class="back">Back</button>
    <div class="modal">
        <div class="leftModal">
            <img src="${data.flag}" alt="">
        </div>
        <div class="rightModal">
            <h1>${data.name}</h1>
            <div class="modalInfo">
                <div class="innerLeft inner">
                    <p><strong>População:</strong> ${data.population}</p>
                    <p><strong>TimerZone:</strong> ${data.timezones}</p>
                    <p><strong>Moeda:</strong> ${data.currencies.map(elem=>elem.name)}</p>
                    
                </div>
                <div class="innerRight inner">
                    <p><strong>Capital:</strong> ${data.capital}</p>
                    <p><strong>Linguagem:</strong> ${data.languages.map(elem=>elem.nativeName)}</p>
                </div>
            </div>
        </div>
    </div>`;
    const back=countryModal.querySelector(".back")
    back.addEventListener("click", ()=> {
        countryModal.classList.toggle("show");
    })
}


