type Dish = {
    dish: string;
    ingredients: string[];
};
const orderDisplay = document.getElementById("order-display") as HTMLElement;
const ingredientList = document.getElementById("ingredient-list") as HTMLElement;
const submitOrderButton = document.getElementById("submit-order") as HTMLElement;
const scoreDisplay = document.getElementById("score") as HTMLElement;
const timerDisplay = document.getElementById("time") as HTMLElement;
const saveButton = document.getElementById("save-game") as HTMLElement;
const loadButton = document.getElementById("load-game") as HTMLElement;
const dishes: Dish[] = [
    { dish: "Toast 🍞", ingredients: ["🍞", "🧈"] },
    { dish: "Salad 🥗", ingredients: ["🥬", "🥕", "🥒"] },
    { dish: "Hot Dog 🌭", ingredients: ["🌭", "🍞", "🧅"] },
    { dish: "Pizza 🍕", ingredients: ["🍞", "🍅", "🧀"] },
    { dish: "Pasta 🍝", ingredients: ["🍝", "🍅", "🧀", "🌿"] },
    { dish: "Burger 🍔", ingredients: ["🥩", "🍞", "🧀", "🍅", "🥬"] },
    { dish: "Taco 🌮", ingredients: ["🌮", "🥩", "🧀", "🥬", "🍅"] },
    { dish: "Sushi 🍣", ingredients: ["🍚", "🐟", "🥢", "🥑", "🍋"] },
    { dish: "Ramen 🍜", ingredients: ["🍜", "🥩", "🥚", "🌿", "🧄", "🧅"] },
    { dish: "Feast 🍽️", ingredients: ["🍗", "🍖", "🍞", "🍷", "🥗", "🧁", "🍇"] }
];
let currentDish: Dish | null = null;
let score = 0;
let timer: number = 60;
let timerInterval: any;
let selectedIngredients: string[] = [];
const startTimer = () => {
    timerInterval = setInterval(() => {
        if (timer > 0) {
            timer--;
            timerDisplay.textContent = timer.toString();
        } else {
            clearInterval(timerInterval);
            alert("Time's up! Game Over!");
        }
    }, 1000);
};

const randomDish = (): Dish => {
    const randomIndex = Math.floor(Math.random() * dishes.length);
    return dishes[randomIndex];
};
const generateOrder = () => {
    currentDish = randomDish();
    orderDisplay.innerHTML = `<h3>${currentDish.dish}</h3>`;
    document.getElementById("ingredients-display")!.innerHTML = currentDish.ingredients.join(" ");
    selectedIngredients = [];
};
const updateScore = () => {
    scoreDisplay.textContent = score.toString();
};

const checkOrder = () => {
    if (currentDish && JSON.stringify(currentDish.ingredients.sort()) === JSON.stringify(selectedIngredients.sort())) {
        score += 10;
    }
    updateScore();
    generateOrder();
};
const saveGame = () => {
    const gameState = {
        score: score,
        timer: timer,
        currentDish: currentDish,
        selectedIngredients: selectedIngredients
    };
    localStorage.setItem("gameState", JSON.stringify(gameState));
};
const loadGame = () => {
    const savedState = localStorage.getItem("gameState");
    if (savedState) {
        const gameState = JSON.parse(savedState);
        score = gameState.score;
        timer = gameState.timer;
        currentDish = gameState.currentDish;
        selectedIngredients = gameState.selectedIngredients;

        updateScore();
        timerDisplay.textContent = timer.toString();
        if (currentDish) {
            orderDisplay.innerHTML = `<h3>${currentDish.dish}</h3>`;
            document.getElementById("ingredients-display")!.innerHTML = currentDish.ingredients.join(" ");
        }
        startTimer();
    }
};
const initGame = () => {
    score = 0;
    timer = 60;
    selectedIngredients = [];
    updateScore();
    generateOrder();
    startTimer();
};
submitOrderButton.addEventListener("click", () => {
    checkOrder();
});
ingredientList.addEventListener("click", (event: Event) => {
    const target = event.target as HTMLElement;
    if (target && target.dataset.ingredient) {
        const ingredient = target.dataset.ingredient!;
        if (!selectedIngredients.includes(ingredient)) {
            selectedIngredients.push(ingredient);
            const prepArea = document.getElementById("ingredients-display");
            prepArea!.innerHTML = selectedIngredients.join(" ");
        }
    }
});

saveButton.addEventListener("click", saveGame);
loadButton.addEventListener("click", loadGame);
const ingredients = ["🍞", "🧈", "🥬", "🥕", "🥒", "🌭", "🧅", "🍅", "🧀", "🍝", "🌿", "🥩", "🍚", "🐟", "🥢", "🥑", "🌮", "🍋", "🍜", "🥚", "🧄", "🍗", "🍖", "🍷", "🥗", "🧁", "🍇"];
ingredients.forEach(ingredient => {
    const ingredientDiv = document.createElement("div");
    ingredientDiv.textContent = ingredient;
    ingredientDiv.dataset.ingredient = ingredient;
    ingredientList.appendChild(ingredientDiv);
});

initGame();
