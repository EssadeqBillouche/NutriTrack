import * as dashboardServices from '../services/dashboard.service.js';

export const showDashboard = (req, res) => {
    res.render('dashboard/dashboard');
}