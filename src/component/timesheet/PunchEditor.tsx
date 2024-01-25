import { Box } from '@mui/material';
import { LocalPunch, TaskOption } from 'app/types';
import { PunchInput } from 'component/timesheet/PunchInput';
import { TaskSelector } from 'component/timesheet/TaskSelector';
import { format } from 'date-fns';
import { setTimeStampTime, setTimeStampDate } from 'helper/functions';
import React from 'react';

export const PunchEditor: React.FC<{
  punch: LocalPunch;
  update: (punch: LocalPunch) => void;
}> = ({ punch, update }) => {
  const handleTaskChange = (newTask: TaskOption) => {
    update({ ...punch, taskId: newTask.id, taskName: newTask.label });
  };
  const handlePunchInTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    update({
      ...punch,
      punchIn: setTimeStampTime(punch.punchIn, e.target.value),
    });
  };
  const handlePunchInDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    update({
      ...punch,
      punchIn: setTimeStampDate(punch.punchIn, e.target.value),
    });
  };
  const handlePunchOutTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    update({
      ...punch,
      punchOut: setTimeStampTime(punch.punchOut || Date.now(), e.target.value),
      isPunchedOut: true,
    });
  };
  const handlePunchOutDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    update({
      ...punch,
      punchOut: setTimeStampDate(punch.punchOut || Date.now(), e.target.value),
      isPunchedOut: true,
    });
  };

  return (
    <Box className="punch-editor">
      <Box sx={{ m: '10px auto', width: '35ch' }}>
        <TaskSelector
          label="Task"
          value={{ label: punch.taskName, id: punch.taskId }}
          onChange={handleTaskChange}
        />
      </Box>
      <PunchInput
        id={'view-punch-in-time'}
        label={'Start Time'}
        type={'time'}
        value={format(punch.punchIn, 'HH:mm')}
        onChange={handlePunchInTimeChange}
      />
      <PunchInput
        id={'view-punch-in-date'}
        label={'Start Date'}
        type={'date'}
        value={format(punch.punchIn, 'yyyy-MM-dd')}
        onChange={handlePunchInDateChange}
      />
      <PunchInput
        id={'view-punch-out-time'}
        label={'End Time'}
        type={'time'}
        value={format(punch.punchOut || Date.now(), 'HH:mm')}
        onChange={handlePunchOutTimeChange}
      />
      <PunchInput
        id={'view-punch-out-date'}
        label={'End Date'}
        type={'date'}
        value={format(punch.punchOut || Date.now(), 'yyyy-MM-dd')}
        onChange={handlePunchOutDateChange}
      />
    </Box>
  );
};
