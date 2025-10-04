import * as dashboardServices from '../services/dashboard.service.js';
import * as profileService from '../services/profile.service.js';

export const showDashboard = async (req, res) => {
    try {
        // Get user ID from query parameter for testing, default to 1
        const userId = parseInt(req.query.userId) || 1;
        
        const userData = await profileService.fetchUserWithProfile(userId);
        
        if (!userData) {
            return res.status(404).render('dashboard/dashboard', {
                title: "Dashboard",
                error: "Profil utilisateur non trouvé",
                scripts: []
            });
        }

        const profileType = userData.profile_type;
        const isAthlete = profileType === 'athlete' || userData.athlete_discipline;
        const isChronic = userData.has_diabetes || userData.has_hypertension || userData.has_obesity;

        const dashboardData = await dashboardServices.getDashboardData(userId, userData);

        if (isAthlete) {
            res.render('dashboard/dashboard-sportif', {
                title: "Dashboard Sportif",
                user: userData,
                dashboardData: dashboardData,
                scripts: []
            });
        } else if (isChronic) {
            //chronic patient dashboard
            res.render('dashboard/dashboard-chronic', {
                title: "Dashboard Patients Chroniques",
                user: userData,
                dashboardData: dashboardData,
                scripts: []
            });
        } else {
            //general dashboard
            res.render('dashboard/dashboard', {
                title: "Dashboard",
                user: userData,
                dashboardData: dashboardData,
                scripts: []
            });
        }

    } catch (error) {
        console.error('Error loading dashboard:', error);
        res.status(500).render('dashboard/dashboard', {
            title: "Dashboard",
            error: "Erreur lors du chargement du tableau de bord",
            scripts: []
        });
    }
    
}