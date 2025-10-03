import * as profileService from './profile.service.js';
import * as dashboardRepo from '../persistence/dashboard.repository.js';

export const getDashboardData = async (userId, userData) => {
    try {
        // fetch real data
        const todayNutrition = await dashboardRepo.getTodayNutrition(userId);
        const todayMeals = await dashboardRepo.getTodayMeals(userId);
        const recentMeals = await dashboardRepo.getRecentMeals(userId, 3);
        const todayHealthMetrics = await dashboardRepo.getTodayHealthMetrics(userId);
        const nutritionTrends = await dashboardRepo.getNutritionTrends(userId, 7);

        const baseData = {
            userName: `${userData.first_name} ${userData.last_name}`,
            profileType: userData.profile_type,
            
            bmi: profileService.calculateBMI(userData.current_weight_kg, userData.height_cm),
            bmiCategory: profileService.getBMICategory(profileService.calculateBMI(userData.current_weight_kg, userData.height_cm)),
            
            isAthlete: userData.profile_type === 'athlete' || userData.athlete_discipline,
            isChronic: userData.has_diabetes || userData.has_hypertension || userData.has_obesity,
            
            healthConditions: {
                diabetes: userData.has_diabetes,
                hypertension: userData.has_hypertension,
                obesity: userData.has_obesity
            },
            
            todayNutrition: todayNutrition || {
                calories_consumed: 0,
                protein_g: 0,
                carbs_g: 0,
                fats_g: 0,
                water_intake_l: 0,
                sodium_mg: 0,
                sugar_g: 0
            },
            
            todayMeals: todayMeals,
            recentMeals: recentMeals,
            
            todayHealthMetrics: todayHealthMetrics,
            
            nutritionTrends: nutritionTrends
        };

        if (baseData.isAthlete) {
            baseData.athleteMetrics = await getAthleteMetrics(userId, userData);
        }
        
        if (baseData.isChronic) {
            baseData.chronicMetrics = await getChronicMetrics(userId, userData);
        }

        baseData.generalMetrics = await getGeneralMetrics(userData);

        return baseData;
    } catch (error) {
        console.error('Error getting dashboard data:', error);
        throw error;
    }
};

const getAthleteMetrics = async (userId, userData) => {
    const todayTraining = await dashboardRepo.getTodayTrainingSessions(userId);
    const weeklyTraining = await dashboardRepo.getWeeklyTrainingSessions(userId);
    
    return {
        discipline: userData.athlete_discipline || 'Non spécifié',
        trainingFrequency: userData.training_frequency || 'Non spécifié',
        performanceGoals: [
            'Optimisation des macros pour la performance',
            'Récupération musculaire optimale',
            'Hydratation et électrolytes'
        ],
        recommendedMacros: {
            protein: calculateProteinNeeds(userData, 'athlete'),
            carbs: calculateCarbNeeds(userData, 'athlete'),
            fats: calculateFatNeeds(userData, 'athlete')
        },
        todayTraining: todayTraining,
        weeklyTraining: weeklyTraining,
        totalCaloriesBurned: todayTraining.reduce((sum, session) => sum + (session.calories_burned || 0), 0)
    };
};

const getChronicMetrics = async (userId, userData) => {
    const recentBloodSugar = await dashboardRepo.getRecentHealthMetrics(userId, 'blood_sugar', 7);
    const recentBloodPressure = await dashboardRepo.getRecentHealthMetrics(userId, 'blood_pressure_systolic', 7);
    const medicationLogs = await dashboardRepo.getMedicationLogs(userId);
    
    const metrics = {
        conditions: [],
        recommendations: [],
        monitoring: [],
        recentBloodSugar: recentBloodSugar,
        recentBloodPressure: recentBloodPressure,
        medicationLogs: medicationLogs
    };

    if (userData.has_diabetes) {
        metrics.conditions.push('Diabète');
        metrics.recommendations.push('Surveillance de l\'index glycémique');
        metrics.monitoring.push('Glycémie');
    }

    if (userData.has_hypertension) {
        metrics.conditions.push('Hypertension');
        metrics.recommendations.push('Limitation du sodium');
        metrics.monitoring.push('Tension artérielle');
    }

    if (userData.has_obesity) {
        metrics.conditions.push('Obésité');
        metrics.recommendations.push('Déficit calorique contrôlé');
        metrics.monitoring.push('Poids et IMC');
    }

    return metrics;
};

const getGeneralMetrics = async (userData) => {
    return {
        currentWeight: userData.current_weight_kg,
        targetWeight: userData.target_weight_kg,
        height: userData.height_cm,
        activityLevel: userData.activity_level,
        weightGoal: userData.profile_type === 'weight_loss' ? 'Perte de poids' : 
                   userData.profile_type === 'weight_gain' ? 'Prise de masse' : 'Maintien'
    };
};

const calculateProteinNeeds = (userData, profileType) => {
    const weight = userData.current_weight_kg;
    if (profileType === 'athlete') {
        return Math.round(weight * 1.6); 
    }
    return Math.round(weight * 1.2);
};

const calculateCarbNeeds = (userData, profileType) => {
    const weight = userData.current_weight_kg;
    if (profileType === 'athlete') {
        return Math.round(weight * 6);
    }
    return Math.round(weight * 4); 
};

const calculateFatNeeds = (userData, profileType) => {
    const weight = userData.current_weight_kg;
    if (profileType === 'athlete') {
        return Math.round(weight * 1.2); 
    }
    return Math.round(weight * 1); 
};

