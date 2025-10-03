import * as mealRepositories from '../persistence/meals.repository.js';

export const analyzeMealImage = async (buffer, mimetype) => {
    return {
        foods: [],
        nutrients: {},
        message: 'AI analysis would be implemented here'
    };
};

export const fetchMeals = async (userId) => {
    return await mealRepositories.getMealsByUserId(userId);
}

export const getMealWithImage = async (userId, image) => {
    return await mealRepositories.getMealByUserAndImage(userId, image);
}