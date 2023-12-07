//component based on this article: https://dev.to/lizlaffitte/persisting-data-using-cookies-in-react-apps-45pn
//updated for new version of react-router-dom per: https://reactrouter.com/en/main/upgrading/v5#upgrade-all-switch-elements-to-routes and: https://stackoverflow.com/questions/76049065/react-router-dom-v6-10-redirect-function-isnt-working-programmatically-redirec
import { AccountMasterPane } from 'component/account/AccountMasterPane/AccountMasterPane';
import { HomeMasterPane } from 'component/home/HomeMasterPane/HomeMasterPane';
import { WelcomeMasterPane } from 'component/welcome/WelcomeMasterPane/WelcomeMasterPane';
import { TasklistMasterPane } from 'component/tasks/TasklistMasterPane/TasklistMasterPane';
import { TimesheetMasterPane } from 'component/timesheet/TimesheetMasterPane/TimesheetMasterPane';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  ACCOUNT_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  SIGNUP_ROUTE,
  TASKS_ROUTE,
  TIMESHEET_ROUTE,
  WELCOME_ROUTE,
} from 'helper/constants';
import { MasterWrapper } from 'component/master/MasterWrapper/MasterWrapper';

export const AppRouter: React.FC = () => {
  const welcomeMasterPane = <WelcomeMasterPane />;
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<MasterWrapper data-testid="master-wrapper" />}
        >
          <Route path={HOME_ROUTE} element={<HomeMasterPane />} />
          <Route path={WELCOME_ROUTE} element={welcomeMasterPane} />
          <Route path={LOGIN_ROUTE} element={welcomeMasterPane} />
          <Route path={SIGNUP_ROUTE} element={welcomeMasterPane} />
          <Route path={TASKS_ROUTE} element={<TasklistMasterPane />} />
          <Route path={TIMESHEET_ROUTE} element={<TimesheetMasterPane />} />
          <Route path={ACCOUNT_ROUTE} element={<AccountMasterPane />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
