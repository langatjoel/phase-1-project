// Event listener for fetching a random cocktail.
document.getElementById('fetchCocktailButton').addEventListener('click' , fetchCocktail);

// Event listener for searching for a cocktail.
document.getElementById('searchInput').addEventListener('input' , searchCocktail);
 
// Function to fetch a random cocktail.
function fetchCocktail(){
    // Fetch a random cocktail from the API
    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then(response => response.json())
    .then(data => {
        // Call the function to display the fetched cocktail.
        displayCocktail(data.drinks[0]);
    })
    .catch(error => console.error('Error fetch cocktail:' , error));
}

// Function to display a cocktail .
function displayCocktail(cocktail){
    const cocktailInfo = document.getElementById('cocktailInfo');
    
    // Display the cocktail information in the HTML.
  
    cocktailInfo.innerHTML = `
        <h2>${cocktail.strDrink}</h2>
        <img src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink}">
        <p>${cocktail.strInstructions}</p>
    `;
}

// Function to search for a cocktail.
function searchCocktail(event){
    const searchTerm = event.target.value.toLowerCase();
    
    // Fetch cocktails from the API based on the search term
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`)
        .then(response => response.json())
        .then(data => {
            // Call a function to display the filtered cocktails
            displayFilteredCocktails(data.drinks);
        })
        .catch(error => console.error('Error searching for cocktails:', error));

}

// Function to display filtered cocktails
function displayFilteredCocktails(cocktails){
    const cocktailInfo = document.getElementById('cocktailInfo');
    //Clear previous content
    cocktailInfo.innerHTML = '';


  // Check if cocktails were found
  if (cocktails) {
    // Iterate over each cocktail and display it
    cocktails.forEach(cocktail => {
        cocktailInfo.innerHTML += `
            <div>
                <h2>${cocktail.strDrink}</h2>
                <img src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink}">
                <p>${cocktail.strInstructions}</p>
            </div>
        `;
    });
} else {
    // Display a message if no cocktails were found
    cocktailInfo.innerHTML = '<p>No cocktails found.</p>';
}

}