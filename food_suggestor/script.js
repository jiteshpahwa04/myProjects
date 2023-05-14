const foodName = document.getElementById("foodName");
const foodImage = document.getElementById("foodImage");
const foodIngredients = document.getElementById("foodIngredients");
const foodInstructions = document.getElementById("foodInstructions");

const url = "https://www.themealdb.com/api/json/v1/1/random.php";

async function displayFood(){
    const response = await fetch(url);
    const jsonData = await response.json();
    console.log(jsonData);

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