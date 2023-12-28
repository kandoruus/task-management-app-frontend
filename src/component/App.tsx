import React, { useEffect } from 'react';
import './App.css';
import { AccountMasterPane } from 'component/account/AccountMasterPane';
import { HomeMasterPane } from 'component/home/HomeMasterPane';
import { MasterWrapper } from 'component/master/MasterWrapper';
import { TasklistMasterPane } from 'component/tasks/TasklistMasterPane';
import { TimesheetMasterPane } from 'component/timesheet/TimesheetMasterPane';
import { WelcomeMasterPane } from 'component/welcome/WelcomeMasterPane';
import { COOKIES, PAGES, SESSION_LOGGED_OUT } from 'helper/constants';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { ProtectedRoute } from 'component/_helper-components/ProtectedRoute';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { appCtrlSlice, selectAppCtrl, logout } from 'app/slices/appCtrlSlice';
import { AppDispatch } from 'app/store';

export function App(): JSX.Element {
  const { sessionData } = useAppSelector((state) => selectAppCtrl(state));
  const dispatch: AppDispatch = useAppDispatch();
  const [cookies] = useCookies([
    COOKIES.USERNAME,
    COOKIES.SESSIONCODE,
    COOKIES.LOGIN,
  ]);

  const welcomeMasterPane = <WelcomeMasterPane />;

  useEffect(() => {
    if (
      sessionData === SESSION_LOGGED_OUT &&
      cookies[COOKIES.LOGIN] === COOKIES.LOGIN
    ) {
      dispatch(
        appCtrlSlice.actions.login({
          username: cookies[COOKIES.USERNAME],
          sessionCode: cookies[COOKIES.SESSIONCODE],
        })
      );
    } else if (
      sessionData !== SESSION_LOGGED_OUT &&
      cookies[COOKIES.LOGIN] === undefined
    ) {
      dispatch(logout());
    }
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path={PAGES.HOME} element={<MasterWrapper />}>
          <Route
            element={
              <ProtectedRoute
                redirectTo={PAGES.HOME}
                isAuthenticated={cookies[COOKIES.LOGIN] === undefined}
              />
            }
          >
            <Route path={PAGES.WELCOME} element={welcomeMasterPane} />
            <Route path={PAGES.LOGIN} element={welcomeMasterPane} />
            <Route path={PAGES.SIGNUP} element={welcomeMasterPane} />
          </Route>
          <Route
            element={
              <ProtectedRoute
                redirectTo={PAGES.WELCOME}
                isAuthenticated={cookies[COOKIES.LOGIN] !== undefined}
              />
            }
          >
            <Route index element={<HomeMasterPane />} />
            <Route path={PAGES.TASKS} element={<TasklistMasterPane />} />
            <Route path={PAGES.TIMESHEET} element={<TimesheetMasterPane />} />
            <Route path={PAGES.ACCOUNT} element={<AccountMasterPane />} />
          </Route>
          <Route path="*" element={<Navigate to={PAGES.HOME} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
