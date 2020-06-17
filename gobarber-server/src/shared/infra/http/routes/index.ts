import { Router } from 'express';

import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';

const routes = Router();

// Session Routes
routes.use('/sessions', sessionsRouter);

// User Routes
routes.use('/users', usersRouter);

// Appointments Routes
routes.use('/appointments', appointmentsRouter);

export default routes;
