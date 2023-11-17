import React from 'react';
import { useAppDispatch } from 'app/hooks';
import { AppDispatch } from 'app/store';
import { ctrlBtnClick, tasklistCtrlBtns } from 'helper/componentConfig';

export const TasklistControlPane: React.FC = () => {
  const dispatch: AppDispatch = useAppDispatch();

  const getActionType = (triggerId: string): ctrlBtnClick => {
    const action = tasklistCtrlBtns.find(
      (btn) => btn.id === triggerId
    )?.onClick;
    if (action === undefined) {
      throw new Error('tasklistCtrlBtns list is corrupted, no action found');
    }
    return action;
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      getActionType((event.target as HTMLButtonElement).id)(dispatch);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="tasklist-control-pane" data-testid="tasklist-control-pane">
      {tasklistCtrlBtns.map((button) => (
        <button
          id={button.id}
          className={button.className && ' ctrl-btn'}
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
