let searchInput = document.getElementById("searchInput");
let resultCountries = document.getElementById("resultCountries");
let spinner = document.getElementById("spinner");

let options = {
    method: "GET"
};
let url = "https://apis.ccbp.in/countries-data";

function results(i) {
    let {
        flag,
        name,
        population
    } = i;
    //console.log(flag);
    let countryContainer1 = document.createElement("div");
    countryContainer1.classList.add("col-12", "col-md-6");
    resultCountries.appendChild(countryContainer1);

    let countryContainer = document.createElement("div");
    countryContainer.classList.add("country-card", "d-flex", "flex-row");
    countryContainer1.appendChild(countryContainer);

    let flagimg = document.createElement("img");
    flagimg.src = flag;
    flagimg.classList.add("country-flag");
    countryContainer.appendChild(flagimg);

    let divContainer = document.createElement("div");
    divContainer.classList.add("ml-3");
    countryContainer.appendChild(divContainer);

    let namepara = document.createElement("p");
    namepara.textContent = name;
    namepara.classList.add("country-name");
    divContainer.appendChild(namepara);

    let populationPara = document.createElement("p");
    populationPara.textContent = population;
    populationPara.classList.add("country-population");
    divContainer.appendChild(populationPara);

}

function displayResults(data) {
    for (let i of data) {

        results(i);
    }
}

fetch(url, options)
    .then(function(res) {
        return res.json();
    })
    .then(function(data) {
        //console.log(data);
        displayResults(data);
    });

searchInput.addEventListener("keyup", function(e) {
    // if (e.key === "Enter") {

    let val = searchInput.value;
    if (val === "") {
        return;
    }
    spinner.classList.toggle("d-none");
    resultCountries.classList.toggle("d-none");
    fetch(url, options)
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {
            spinner.classList.toggle("d-none");
            resultCountries.classList.toggle("d-none");

            resultCountries.textContent = "";
            for (let j of data) {
                if (j.name.includes(val)) {

                    results(j);
                    console.log(j);
                }
            }
            //console.log(data);
            //displayResults(data);
        })
    //}
});