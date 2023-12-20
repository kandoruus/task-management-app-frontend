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

// Use throughout your app instead of plain `useDispatch` and `useSelector`
type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
