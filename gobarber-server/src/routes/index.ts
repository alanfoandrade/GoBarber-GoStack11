import { Router } from 'express';

import sessionsRouter from './sessions.routes';
import usersRouter from './users.routes';
import appointmentsRouter from './appointments.routes';

const routes = Router();

// Session Routes
routes.use('/sessions', sessionsRouter);

// User Routes
routes.use('/users', usersRouter);

// Appointments Routes
routes.use('/appointments', appointmentsRouter);

export default routes;
