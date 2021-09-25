import Router from 'express-promise-router';
import ResumeRouter from './ResumeRouter';
import TradesRouter from './TradesRouter';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/resume', ResumeRouter);
router.use('/trades', TradesRouter);

// Export the base-router
export default router;
