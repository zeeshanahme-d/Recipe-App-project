// IIFE  Immediately  Invoke function Expression
(async function () {

    const response = await fetch("./recipes.json");
    const recipes = await response.json();

    const searchInput = document.getElementById("searchInput");
    const btnElem = document.getElementById("searchBtn");
    const listElem = document.getElementById("recipe-list");
    const detailsElem = document.getElementById("recipeDetailsContainer");


    function loadRecipeDetails(recipe) {
        detailsElem.innerHTML = `
        <h2 class="title">${recipe.title}</h2>
        <br>
        <h3>Ingredients:</h3>
        <br/>
        <ul>${recipe.ingredients.map(function (ingredients) {
            return "<li>" + ingredients + "</li>"
        }).join("")}</ul>
       <br/>
       <h3>Instructions:</h3>
       <br/>
       <div>${recipe.instructions}
        `
    }

    function displaySearchResults(results) {
        listElem.innerHTML = "";
        results.forEach(function (recipe) {
            const li = document.createElement("li");
            const listItem = `
          <div class="title">${recipe.title}</div>
          <div class="description">${recipe.description}</div>  `;
            li.innerHTML = listItem;
            li.addEventListener("click", function () {
                loadRecipeDetails(recipe);
            })
            listElem.appendChild(li);
        });
    };

    function search() {
        let query = searchInput.value.toLowerCase();
        const results = recipes.filter(function (recipe) {
            return (recipe.title.toLowerCase().includes(query) ||
                recipe.ingredients.join("").toLowerCase().includes(query));

        });

        displaySearchResults(results);
    };

    btnElem.addEventListener("click", search);

})();

