import React from 'react';
import './App.css';
import { AccountMasterPane } from 'component/account/AccountMasterPane';
import { HomeMasterPane } from 'component/home/HomeMasterPane';
import { MasterWrapper } from 'component/master/MasterWrapper';
import { TasklistMasterPane } from 'component/tasks/TasklistMasterPane';
import { TimesheetMasterPane } from 'component/timesheet/TimesheetMasterPane';
import { WelcomeMasterPane } from 'component/welcome/WelcomeMasterPane';
import { PAGES } from 'helper/constants';
import { Routes, Route } from 'react-router-dom';

export function App(): JSX.Element {
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
}
