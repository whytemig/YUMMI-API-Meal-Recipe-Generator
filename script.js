let allergy = "";

async function getTheData(input) {
	try {
		const appId = "a4b3829f";
		const appKey = "330a149b22308c8631a0185a33d77792";

		const response = await fetch(
			`https://api.edamam.com/search?q=${input}&app_id=${appId}&app_key=${appKey}&from=0&to=27&excluded=${allergy}&mealType=dinner&mealType=breakfast&mealType=lunch`
		);
		clearResults();
		const data = await response.json();
		const arrayOfData = data.hits;


		arrayOfData.forEach((foodInfo, index) => {
			let recipeCalories = Math.round(
				Math.round(foodInfo.recipe.calories) / foodInfo.recipe.yield
			);


      // console.log(foodInfo.recipe.dishType)
      let dishType = foodInfo.recipe.dishType;
			let recipeUri = foodInfo.recipe.uri;

			let recipeLabel = foodInfo.recipe.label;
			let recipeImage = foodInfo.recipe.image;
			const foodDigest = foodInfo.recipe.digest;
			const ingredients = foodInfo.recipe.ingredientLines;


			const resultDiv = document.querySelector(".resultdiv");
			const foodCardsDiv = document.createElement("div");
			foodCardsDiv.classList.add(`card-container`);

			let nutrientsLabelsHTML = "";
			for (let k = 0; k < foodDigest.length; k++) {
				// console.log(foodDigest[k].label);
				let nutrientsLabel = foodDigest[k].label;
				let nutrientsQuantity =

					Math.round(foodDigest[k].total / foodInfo.recipe.yield) +
					foodDigest[k].unit;
				nutrientsLabelsHTML += `<div class="container-fluid text-center">
        <hr>
        <div class="row">
          <div class="col fs-4">
            ${nutrientsLabel}
          </div>
          <div class="col fs-4">
            ${nutrientsQuantity}
          </div>
        </div>
      </div>`;
				
			}
			foodCardsDiv.innerHTML = `

        <div class="card bg-success-subtle shadow rounded" style="width: 25rem;" id="${recipeUri}">
      <img src="${recipeImage}" class="card-img-top food-image" alt="food name container-fluid">

      <div class="card-body d-grid">
        <h2 class="card-title text-center fw-bold fs-2 text-uppercase h2 my-0">${recipeLabel}</h2>
        <h5 class="card-text text-center fs-3 my-0 fw-bold text-light">--${recipeCalories} kcal /plate--</h5>
      </div>
      <div class="p-3 border border-warning border-start-0 rounded-end text-center bg-warning h2 text-bg-warning fw-bold fs-3 text-uppercase my-0 dishtype">
        -->${dishType}<--
        </div>
      <div class="d-flex justify-content-evenly gap-4  x-card-body">
        <button type="button" class="btn text-bg-primary bg-danger fw-bold fs-5 rounded-pill shadow my-3" data-bs-toggle="modal" data-bs-target="#modal-${index}" style=width:12rem height: 15rem>
    Total Nutrients
  </button>
  <button type="button" class="btn text-bg-primary bg-danger fw-bold fs-5 rounded-pill shadow my-3" data-bs-toggle="modal" data-bs-target="#ingredients-modal-${index}">
                Ingredients
              </button>
  </div>
  <div class="modal fade" id="modal-${index}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="modal-${index}-label" aria-hidden="true">
  <div class="modal-dialog modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-3 fw-bolder" id="modal-${index}-label">${recipeLabel} Nutrients</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body text-center">
          ${nutrientsLabelsHTML}
        <hr>
      </div>
      <div class="modal-footer myfooter">
        <button type="button" class="btn text-bg-primary bg-danger fw-bold fs-5 rounded-pill shadow my-3" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
    </div>
    </div>
    <div class="modal fade " id="ingredients-modal-${index}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="ingredients-modal-${index}-label" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-3 fw-bold" id="ingredients-modal-${index}-label">${recipeLabel} Ingredients</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body ">
          <ul>
            ${ingredients

							.map((ingredient) => `<li class="fs-4">${ingredient}</li>`)

							.join("")}
          </ul>
          <h2>Instructions: </h2>
          <a href="${recipeUri}">Click to watch the Insructions</a>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn text-bg-primary bg-danger fw-bold fs-5 rounded-pill shadow my-3" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>`;

			resultDiv.append(foodCardsDiv);

      const searchInput = document.querySelector(".search-input").value
  if(searchInput==""){
    resultDiv.innerHTML = "";
  }


	
  
    });
  }catch(error){
    console.log("Error:", error)
  }
}

let filterInput = document.querySelector(".filter-input");
let filterBtn = document.querySelector(".filter-btn");

async function getRecipe() {
	try {
		const searchInput = document.querySelector(".search-input").value;
    		await getTheData(searchInput);
	} catch (error) {
		console.log("Error:", error);
	}

}

function clearResults() {
	const resultDiv = document.querySelector(".resultdiv");
	resultDiv.innerHTML = "";
}


function searchRecipe() {
  	getRecipe();
}

document.querySelector("#search-button").addEventListener("click", searchRecipe);


filterBtn.addEventListener("click", (e) => {
	e.preventDefault();
	allergy = filterInput.value.replaceAll(",", "&excluded=").toLowerCase().trim();
	getRecipe();
});

searchRecipe();


