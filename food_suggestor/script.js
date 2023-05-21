const container = document.getElementsByClassName("container")[0];
const foodName = document.getElementById("foodName");
const foodImage = document.getElementById("foodImage");
const foodIngredients = document.getElementById("foodIngredients");
const foodInstructions = document.getElementById("foodInstructions");
const food_categories = document.getElementById("food_categories");

const search_food = document.getElementById("search-food");
const search_food_ingredient = document.getElementById("search-food-ingredient");
const ingredient_search_results = document.getElementById("ingredient-search-results");

const ferror = document.getElementsByClassName("error")[0];

let url = "https://www.themealdb.com/api/json/v1/1/";

async function displayFood(fname){

    search_food.value = "";
    search_food_ingredient.value = "";

    ferror.classList.remove("active");
    let newURL = url + "random.php";
    if(fname != null){
        newURL = url + "search.php?s=" + fname;
    }
    const response = await fetch(newURL);
    const jsonData = await response.json();
    console.log(jsonData);

    if(jsonData.meals==null){
        displayError();
        return;
    }
    let meal = jsonData.meals[0];
    let name = jsonData.meals[0].strMeal;
    let image = jsonData.meals[0].strMealThumb;
    let ingredients = [];
    let ing = [meal.strIngredient1,meal.strIngredient2,meal.strIngredient3,meal.strIngredient4,meal.strIngredient5,meal.strIngredient7,meal.strIngredient8,meal.strIngredient9,meal.strIngredient10,meal.strIngredient11,meal.strIngredient12,meal.strIngredient12,meal.strIngredient13,meal.strIngredient14,meal.strIngredient15,meal.strIngredient16,meal.strIngredient17,meal.strIngredient18,meal.strIngredient19,meal.strIngredient20];
    let instructions = jsonData.meals[0].strInstructions;

    for(let i = 1; i<=20; i++){
        if(ing[i].length!=0){
            ingredients.push(ing[i]);
        }else{
            break;
        }
    }

    foodName.innerText = name;
    foodImage.src = image;
    foodIngredients.innerText = ingredients;
    foodInstructions.innerText = instructions;

}
displayFood();

// Check food Avalaibility
async function foodAvailable(fname){
    let newURL = url + "search.php?s=" + fname;
    const response = await fetch(newURL);
    const jsonData = await response.json();
    console.log(jsonData);

    if(jsonData.meals==null){
        return false;
    }
    return true;
}

// Show all categories
async function show_categories(){
    let catURL = "https://www.themealdb.com/api/json/v1/1/categories.php";
    const response = await fetch(catURL);
    const jsonData = await response.json();
    console.log(jsonData);

    categoriesArr = jsonData.categories;
    console.log(categoriesArr);

    
    for(let i=0;i<14;i++){

        let category = categoriesArr[i];

        if(await foodAvailable(category.strCategory)===false){
            continue;
        }

        let card = document.createElement('div');
        card.classList.add("card");
        let info = document.createElement('div');
        info.classList.add("card-info");
        let fname = document.createElement('h3');
        let desc = document.createElement('p');
        let image = document.createElement('img');
        image.classList.add("card-img");

        card.onclick = ()=>{displayFood(category.strCategory)};

        fname.innerHTML = category.strCategory;
        desc.innerHTML = category.strCategoryDescription.slice(0,40)+"...";
        image.src = category.strCategoryThumb;
        card.appendChild(image);
        info.appendChild(fname);
        info.appendChild(desc);
        card.appendChild(info);
        food_categories.appendChild(card);
    }
}
show_categories();

// Search by Ingredients
async function searchByIngredient(search){

    ingredient_search_results.textContent = "";

    let newURL = url + "filter.php?i=" + search;
    const response = await fetch(newURL);
    const jsonData = await response.json();
    console.log(jsonData);

    const mealsArr = jsonData.meals;

    if(mealsArr==null){
        displayError();
    }

    for(let i=0;i<mealsArr.length && i<10;i++){

        let meal = mealsArr[i];

        let card = document.createElement('div');
        card.classList.add("card");
        let info = document.createElement('div');
        info.classList.add("card-info");
        let fname = document.createElement('h3');
        let image = document.createElement('img');
        image.classList.add("card-img");

        card.onclick = ()=>{displayFood(meal.strMeal)};

        fname.innerHTML = meal.strMeal;
        image.src = meal.strMealThumb;
        card.appendChild(image);
        info.appendChild(fname);
        card.appendChild(info);
        ingredient_search_results.appendChild(card);
    }
}

// Error Function
function displayError(){
    ferror.classList.add("active");
}

// Event Listeners
search_food.addEventListener('keypress', (event)=>{
    if(event.key=="Enter"){
        let value = search_food.value;
        displayFood(value);
    }
})
search_food_ingredient.addEventListener('keypress', (event)=>{
    if(event.key=="Enter"){
        let value = search_food_ingredient.value;
        searchByIngredient(value);
    }
})