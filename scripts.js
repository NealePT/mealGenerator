const getMeal = () => {
  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      createMeal(data.meals[0]);
    });
};

const getMealElement = document.getElementById("getMealButton");
getMealElement.addEventListener("click", getMeal);

const mealContainerElement = document.getElementById("mealContainer");

const createMeal = meal => {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
    } else {
      break;
    }
  }
  const newInnerHTML = `
		<div>
			<div>
        <h2>${meal.strMeal}</h2>
        <div class="imagediv">
          <img src="${meal.strMealThumb}" alt="Meal Image">
        </div>
        <div class="containerTags">
          ${meal.strCategory ? `<p><strong>Category:</strong> ${meal.strCategory}</p>` : ""}
          ${meal.strArea ? `<p><strong>Origin:</strong> ${meal.strArea}</p>` : ""}
          ${meal.strTags ? `<p><strong>Tags:</strong> ${meal.strTags.split(",").join(", &nbsp;")}</p>` : ""}
        </div>
        <div class="ingredientsContainer">
          <h5>Ingredients:</h5>
          <ul>
            ${ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("")}
          </ul>
        </div>
			</div>
      <h5>Instructions:</h5>
			<div class="instructions">
        <p>${meal.strInstructions.split(".").join(". <br><br>")}</p>
			</div>
      ${meal.strYoutube ? `
        <h5>Recipe Video:</h5>
        <div class="videoWrapper">
          <iframe width="420" height="315"
          src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}">
          </iframe>
        </div>`
      : ""}
    </div>
    `;

  mealContainerElement.innerHTML = newInnerHTML;
};