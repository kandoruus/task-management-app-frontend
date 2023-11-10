import { ActionCreatorWithoutPayload } from '@reduxjs/toolkit';
import { AppDispatch } from 'app/store';
import { tasklistCtrlBtns } from 'helper/constants';
import React from 'react';
import { useDispatch } from 'react-redux';

export const TasklistControlPane: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  function getActionType(triggerId: string): ActionCreatorWithoutPayload {
    const action = tasklistCtrlBtns.find(
      (btn) => btn.id === triggerId
    )?.actionType;
    if (action === undefined)
      throw new Error('tasklistCtrlBtns list is corrupted, no action found');
    return action;
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      dispatch(getActionType((event.target as HTMLButtonElement).id)());
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="tasklist-control-pane">
      {tasklistCtrlBtns.map((button) => (
        <button
          id={button.id}
          className={button.className}
          onClick={handleClick}
          value={button.value}
          key={button.id}
        >
          {button.value}
        </button>
      ))}
    </div>
  );
};
