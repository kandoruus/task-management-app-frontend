import React from 'react';
import { useAppDispatch } from 'app/hooks';
import { AppDispatch } from 'app/store';
import { ctrlBtnClick, tasklistCtrlBtns } from 'helper/componentConfig';

export const TasklistControlPane: React.FC = () => {
  const dispatch: AppDispatch = useAppDispatch();

  const getActionType = (triggerId: string): ctrlBtnClick => {
    const action = tasklistCtrlBtns.find(
      (btn) => btn.id === triggerId
    )?.actionType;
    if (action === undefined) {
      throw new Error('tasklistCtrlBtns list is corrupted, no action found');
    }
    return action;
  };

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