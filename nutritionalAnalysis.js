// THIS FUNCTION RETRIEVES THE DATA FROM THE API
async function yumi(query) {
	try {
		const response = await fetch(
			`https://api.api-ninjas.com/v1/nutrition?query=${query}`,
			{ headers: { "X-API-Key": "paEfZ8VuuOPRgz4VJzTisA==EfoMS4U6ui7DpNQp" } }
		);
		const data = await response.json();
		console.dir(data[0]);

		//THIS PRINTS THE DATA TO THE WEBPAGE
		let template = `
		<body class="container bg-warning-subtle">
		<!-- Navbar with all the links associated with the Food App -->
		<nav class="navbar bg-success fixed-top">
			<!-- This is where you can add a class to change the menu color scheme -->
			<div class="container-fluid justify-content-between">
				<img
					src="/image/newicon3-hs.png"
					style="max-width: 60px"
					class="thumbnail img-fluid"
				/>
				<!-- this is where the logo will be placed -->
				<button
					class="navbar-toggler bg-light"
					type="button"
					data-bs-toggle="offcanvas"
					data-bs-target="#offcanvasDarkNavbar"
					aria-controls="offcanvasDarkNavbar"
					aria-label="Toggle navigation"
				>
					<!-- above is where you change the color of the toggle bar -->
					<span class="navbar-toggler-icon"></span>
				</button>
				<div
					class="offcanvas offcanvas-end text-white"
					tabindex="-1"
					id="offcanvasDarkNavbar"
					aria-labelledby="offcanvasDarkNavbarLabel"
				>
					<div class="offcanvas-header bg-warning-subtle">
						<!-- color scheme div -->
						<h5
							class="offcanvas-title text-dark fs-1 fw-bolder"
							id="offcanvasDarkNavbarLabel"
						>
							MENU
						</h5>
						<!-- color scheme for the MENU title -->
						<button
							type="button"
							class="btn-close btn-close"
							data-bs-dismiss="offcanvas"
							aria-label="Close"
						></button>
					</div>
					<div class="offcanvas-body bg-warning-subtle">
						<ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
							<li
								class="nav-item text-capitalize text-center border border-dark border-rounded my-3 fw-bold fs-5"
							>
								<a class="nav-link active" aria-current="page" href="home.html"
									>Home</a
								>
							</li>
							<li
								class="nav-item text-capitalize text-center border border-dark border-rounded my-3 fw-bold fs-5"
							>
								<a class="nav-link active" aria-current="page" href=""
									>Favorites</a
								>
							</li>
							<li
								class="nav-item text-capitalize text-center border border-dark border-rounded my-3 fw-bold fs-5"
							>
								<a
									class="nav-link active"
									aria-current="page"
									href="analyze.html"
									>Analyze My Ingrdients</a
								>
							</li>
							<li
								class="nav-item text-capitalize text-center border border-dark border-rounded my-3 fw-bold fs-5"
							>
								<a class="nav-link active" aria-current="page" href="about.html"
									>About Us</a
								>
							</li>
							<!-- i added some style but it can be changed, i was just testing out the features. -->
						</ul>
					</div>
				</div>
			</div>
		</nav>
		<br />
		<br />

		<div class="my-4">
			<h2 class="text-center mt-2 fs-2 fw-light"></h2>
		</div>

		<h1>Nutrition Facts</h1>
		<h4>Serving size  ${data[0].serving_size_g} g</h4>
		<table class="table">
		<tbody>
		  <tr>
			<th scope="row">Calories</th>
			<td>${data[0].calories}</td>
		  </tr>
		  <tr>
			<th scope="row">Total Fat</th>
			<td>${data[0].fat_total_g} g</td>
		  </tr>
		  <tr>
			<th scope="row">Saturated Fat</th>
			<td>${data[0].fat_saturated_g} g</td>
		  </tr>				  
		  <tr>
			<th scope="row">Cholesterol</th>
			<td>${data[0].cholesterol_mg} mg</td>
		  </tr>				  <tr>
			<th scope="row">Sodium</th>
			<td>${data[0].sodium_mg} mg</td>
		  </tr>
		  <tr>
			<th scope="row">Total Carbohydrates</th>
			<td>${data[0].carbohydrates_total_g} g</td>
		  </tr>
		  <tr>
			<th scope="row">Fiber</th>
			<td>${data[0].fiber_g} g</td>
		  </tr>
		  <tr>
			<th scope="row">Sugars</th>
			<td>${data[0].sugar_g} g</td>
		  </tr>
		  <tr>
			<th scope="row">Protein</th>
			<td>${data[0].protein_g} g</td>
		  </tr>
		
		</tbody>
		</table>
		</body>
		

		<button class="btn btn-success active"><a
		class="  nav-link active"
		aria-current="page"
		href="analyze.html"
		>Back</a></button>
		
		`;
		document.body.innerHTML = template;
	} catch (error) {
		console.dir("error", error);
	}
}

//THIS FUNCTION ACCEPTS SEARCH BAR INPUT, PRINTS THE NUTRITIONAL ANALYSIS TO THE CONSOLE.
function getNutritionalAnalysis() {
	let searchBox = document.querySelector(".search-bar");
	const searchBtn = document.querySelector("#searchBtn");
	searchBtn.addEventListener("click", (e) => {
		e.preventDefault();
		let query = searchBox.value;
		// console.log(input);
		yumi(query);
		if (searchBtn) {
			// searchBox.value = '';
		}
	});
	// console.dir(array.length);
}
getNutritionalAnalysis();
