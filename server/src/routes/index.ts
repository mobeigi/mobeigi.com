import Router from 'express-promise-router';
import ResumeRouter from './ResumeRouter';
import TradesRouter, { updateLast365CalendarDaysXmlFile } from './TradesRouter';
import { syncSpyDailyOpenClose } from './TradesRouter/Polygon';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/resume', ResumeRouter);
router.use('/trades', TradesRouter);

// Perform initial updates on start
// TODO: We're skipping this during test as DB connection is failing but proper fix would be to mock the DB.
if (process.env.NODE_ENV !== 'test') {
  void updateLast365CalendarDaysXmlFile();
  void syncSpyDailyOpenClose();
}

// Export the base-router
export default router;
