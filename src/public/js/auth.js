document.getElementById('registrationForm')?.addEventListener('submit', function (e) {
  e.preventDefault();

  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (password !== confirmPassword) {
    alert('Passwords do not match. Please try again.');
    return;
  }

  this.submit(); 
});

function calculateCalorieGoal() {
  const age = document.getElementById('age')?.value;
  const gender = document.getElementById('gender')?.value;
  const height = document.getElementById('height')?.value;
  const weight = document.getElementById('weight')?.value;
  const activityLevel = document.getElementById('activityLevel')?.value;
  const goals = document.getElementById('goals')?.value;

  if (age && gender && height && weight && activityLevel && goals) {
    let bmr;
    if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    let activityMultiplier = 1.2;
    if (activityLevel === 'lightly-active') activityMultiplier = 1.375;
    else if (activityLevel === 'moderately-active') activityMultiplier = 1.55;
    else if (activityLevel === 'very-active') activityMultiplier = 1.725;
    else if (activityLevel === 'extremely-active') activityMultiplier = 1.9;

    let goalAdjustment = 0;
    if (goals === 'lose-weight') goalAdjustment = -500;
    else if (goals === 'gain-weight' || goals === 'build-muscle') goalAdjustment = 500;

    const calorieGoal = Math.round(bmr * activityMultiplier + goalAdjustment);

    const calorieGoalInput = document.getElementById('calorieGoal');
    if (calorieGoalInput) calorieGoalInput.value = calorieGoal;

    const recommendationText = document.querySelector('.text-sm.text-slate-400');
    if (recommendationText) {
      recommendationText.textContent = `Based on your stats, we recommend approximately ${calorieGoal} calories per day`;
    }
  }
}

['age', 'gender', 'height', 'weight', 'activityLevel', 'goals'].forEach(id => {
  const element = document.getElementById(id);
  if (element) element.addEventListener('change', calculateCalorieGoal);
});