//component based on this article: https://dev.to/lizlaffitte/persisting-data-using-cookies-in-react-apps-45pn
//updated for new version of react-router-dom per: https://reactrouter.com/en/main/upgrading/v5#upgrade-all-switch-elements-to-routes and: https://stackoverflow.com/questions/76049065/react-router-dom-v6-10-redirect-function-isnt-working-programmatically-redirec
import { AccountMasterPane } from 'component/account/AccountMasterPane/AccountMasterPane';
import { HomeMasterPane } from 'component/home/HomeMasterPane/HomeMasterPane';
import { WelcomeMasterPane } from 'component/welcome/WelcomeMasterPane/WelcomeMasterPane';
import { TasklistMasterPane } from 'component/tasks/TasklistMasterPane/TasklistMasterPane';
import { TimesheetMasterPane } from 'component/timesheet/TimesheetMasterPane/TimesheetMasterPane';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { PAGES } from 'helper/constants';
import { MasterWrapper } from 'component/master/MasterWrapper/MasterWrapper';

export const AppRouter: React.FC = () => {
  const welcomeMasterPane = <WelcomeMasterPane />;
  return (
    <Routes>
      <Route path="/" element={<MasterWrapper />}>
        <Route path={PAGES.HOME} element={<HomeMasterPane />} />
        <Route path={PAGES.WELCOME} element={welcomeMasterPane} />
        <Route path={PAGES.LOGIN} element={welcomeMasterPane} />
        <Route path={PAGES.SIGNUP} element={welcomeMasterPane} />
        <Route path={PAGES.TASKS} element={<TasklistMasterPane />} />
        <Route path={PAGES.TIMESHEET} element={<TimesheetMasterPane />} />
        <Route path={PAGES.ACCOUNT} element={<AccountMasterPane />} />
      </Route>
    </Routes>
  );
};
