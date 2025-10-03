import pool from '../config/db.js';

export const getMealsByUserId = async (userId) => {
    try {
        const result = await pool.query(
            `SELECT 
            u.id AS user_id,
            u.first_name,
            u.last_name,
            m.id AS meal_id,
            m.meal_type,
            m.meal_date,
            m.meal_time,
            m.total_calories,
            m.total_proteins,
            m.total_carbs,
            m.total_fats,
            m.total_sugar,
            m.total_sodium,
            m.image_url,
            m.ai_analysis_source,
            m.ai_confidence_score,
            m.created_at
        FROM public.users u
        JOIN public.meals m ON u.id = m.user_id
        WHERE u.id = $1
        ORDER BY m.meal_date DESC, m.meal_time DESC`,
            [userId]
        );

        return result.rows;
    } catch (error) {
        console.error('Error fetching meals:', error.message);
        throw error;
    }
};

export const getMealByUserAndImage = async (userId, imageUrl) => {
    try {
        const result = await pool.query(
            `SELECT 
            u.id AS user_id,
            u.first_name,
            u.last_name,
            m.id AS meal_id,
            m.meal_type,
            m.meal_date,
            m.meal_time,
            m.image_url,
            m.ai_confidence_score
        FROM public.users u
        JOIN public.meals m ON u.id = m.user_id
        WHERE u.id = $1
        AND m.image_url = $2`,
            [userId, imageUrl]
        );

        return result.rows[0];
    } catch (error) {
        console.error('Error fetching meal by image:', error.message);
        throw error;
    }
};