const apiUrl = 'http://localhost:3000/meals';

// Function to fetch meals from the API
async function fetchMeals() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const meals = await response.json();
        displayMeals(meals);
    } catch (error) {
        console.error('Error fetching meals:', error);
    }
}

// Function to add a meal
async function addMeal(event) {
    event.preventDefault();

    const mealName = document.getElementById('meal-name').value;
    const calories = document.getElementById('calories').value;
    const date = document.getElementById('date').value;

    const newMeal = { name: mealName, calories: parseInt(calories), date };
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newMeal),
        });

        if (!response.ok) {
            throw new Error('Failed to add meal');
        }

        document.getElementById('meal-form').reset();
        fetchMeals();
    } catch (error) {
        console.error('Error adding meal:', error);
    }
}

// Function to display meals
function displayMeals(meals) {
    const mealList = document.getElementById('meal-list');
    mealList.innerHTML = meals.map(meal =>
        `<tr>
            <td>${meal.name}</td>
            <td>${meal.calories}</td>
            <td>${meal.date}</td>
            <td><button onclick="deleteMeal('${meal.id}')">Delete</button></td>
        </tr>`
    ).join('');
}

// Function to delete a meal
async function deleteMeal(id) {
    console.log('Deleting meal with ID:', id);
    try {
        const response = await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
        if (!response.ok) {
            const errorDetails = await response.text(); // Get error details
            console.error('Failed to delete meal:', errorDetails);
            throw new Error('Failed to delete meal');
        }
        
        fetchMeals();
    } catch (error) {
        console.error('Error deleting meal:', error);
    }
}

// Fetch meals when the page loads
document.addEventListener('DOMContentLoaded', fetchMeals);
document.getElementById('meal-form').addEventListener('submit', addMeal);
