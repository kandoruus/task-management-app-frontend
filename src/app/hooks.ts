import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import { useState } from 'react';
import { selectTaskCtrl } from 'app/slices/taskCtrlSlice';

//useModal hook base on this article: https://upmostly.com/tutorials/modal-components-react-custom-hooks
export const useModal = (): [boolean, () => void] => {
  const [isOpen, setIsOpen] = useState(false);

  function toggle() {
    setIsOpen(!isOpen);
  }

  return [isOpen, toggle];
};

//get the tasklist filtered by a list of ids
export const useTasklistByIds = (taskIds: string[]) => {
  return useAppSelector((state) =>
    selectTaskCtrl(state).tasklist.filter((task) => {
      return taskIds.includes(task._id);
    })
  );
};
//use for get the names of tasks associated with the ids referenced in the punchlist
export const useTaskNamesFromPunchList = (punchlist: TimePunch[]): string => {
  const listOfTaskIds = getTaskIdsFromPunchlist(punchlist);
  const listOfTasks = useTasklistByIds(listOfTaskIds);
  const listOfTaskNames = matchTaskIdsToNames(listOfTasks, listOfTaskIds);
  return listOfTaskNames.join(', ');
};
//get the name of the task associated with the provided id, return a blank string if no match is found
export const useTaskNameFromId = (id: string): string => {
  const task = useAppSelector((state) => {
    return selectTaskCtrl(state).tasklist.find((task) => task._id === id);
  });
  return task?.data.name || '';
};

// Use throughout your app instead of plain `useDispatch` and `useSelector`
type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
