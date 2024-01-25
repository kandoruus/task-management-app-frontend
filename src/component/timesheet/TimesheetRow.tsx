import { TableRow, TableCell } from '@mui/material';
import { useTimesheetRowData } from 'app/hooks';
import { TimesheetRowProps } from 'app/types';
import { SmTableCell } from 'component/_styled-mui-components/SmTableCell';
import React from 'react';

export const TimesheetRow: React.FC<TimesheetRowProps> = ({
  interval,
  viewDay,
}) => {
  const { intervalAsString, taskNames, totalTime } =
    useTimesheetRowData(interval);
  return (
    <TableRow
      onClick={() => {
        viewDay(interval);
      }}
    >
      <SmTableCell>{intervalAsString}</SmTableCell>
      <SmTableCell>{totalTime}</SmTableCell>
      <TableCell>{taskNames}</TableCell>
    </TableRow>
  );
};
