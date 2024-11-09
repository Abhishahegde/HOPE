// Function to update Daily Steps and store in DB
function updateSteps() {
    const steps = document.getElementById("stepsInput").value;
    const stepsValue = document.getElementById("stepsValue");
    const stepsProgress = document.getElementById("stepsProgress").querySelector(".progress");

    // Set the value and update the progress bar
    stepsValue.textContent = `${steps} steps`;
    stepsProgress.style.width = `${(steps / 10000) * 100}%`;

    // Send data to server
    fetch('save_data.php', {
        method: 'POST',
        body: new URLSearchParams({
            'steps': steps,
            'type': 'steps'
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    });
}

// Function to update Calories Intake and store in DB
function updateCalories() {
    const calories = document.getElementById("caloriesInput").value;
    const caloriesValue = document.getElementById("caloriesValue");
    const caloriesProgress = document.getElementById("caloriesProgress").querySelector(".progress");

    // Set the value and update the progress bar
    caloriesValue.textContent = `${calories} kcal`;
    caloriesProgress.style.width = `${(calories / 2250) * 100}%`;

    // Send data to server
    fetch('save_data.php', {
        method: 'POST',
        body: new URLSearchParams({
            'calories': calories,
            'type': 'calories'
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    });
}

// Function to update Calories Burned and store in DB
function updateCaloriesBurned() {
    const caloriesBurned = document.getElementById("caloriesBurnedInput").value;
    const caloriesBurnedValue = document.getElementById("caloriesBurnedValue");
    const caloriesBurnedProgress = document.getElementById("caloriesBurnedProgress").querySelector(".progress");

    // Set the value and update the progress bar
    caloriesBurnedValue.textContent = `${caloriesBurned} kcal`;
    caloriesBurnedProgress.style.width = `${(caloriesBurned / 2250) * 100}%`;

    // Send data to server
    fetch('save_data.php', {
        method: 'POST',
        body: new URLSearchParams({
            'caloriesBurned': caloriesBurned,
            'type': 'caloriesBurned'
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    });
}
