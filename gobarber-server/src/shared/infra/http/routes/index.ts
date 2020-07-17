import { Router } from 'express';

import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import passwordsRouter from '@modules/users/infra/http/routes/passwords.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import providersRouter from '@modules/appointments/infra/http/routes/providers.routes';

const routes = Router();

// Session Routes
routes.use('/sessions', sessionsRouter);

// User Routes
routes.use('/users', usersRouter);

// Profile Routes
routes.use('/profile', profileRouter);

// Appointments Routes
routes.use('/appointments', appointmentsRouter);

// Passwords Routes
routes.use('/passwords', passwordsRouter);

// Providers Routes
routes.use('/providers', providersRouter);

export default routes;
