import { TableRow, TableCell, IconButton } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useAppSelector, useTaskNamesFromPunchList } from 'app/hooks';
import { selectPunchCtrl } from 'app/slices/punchCtrlSlice';
import { TimePunch, TimesheetRowProps } from 'app/types';
import { SmTableCell } from 'component/_styled-mui-components/SmTableCell';
import { format, formatDuration } from 'date-fns';
import { durationFormatOptions } from 'helper/constants';
import {
  getTotalDurationWithinInterval,
  isPunchInInterval,
  shouldUseExtraPadding,
} from 'helper/functions';
import React from 'react';

export const TimesheetRow: React.FC<TimesheetRowProps> = ({
  interval,
  isHourlyView,
}) => {
  const punchlist: TimePunch[] = useAppSelector((state) =>
    selectPunchCtrl(state).punchlist.filter((punch) => {
      return isPunchInInterval(interval, punch);
    })
  );
  const taskNames = useTaskNamesFromPunchList(punchlist);

  const getTotalTime = (): string => {
    return formatDuration(
      getTotalDurationWithinInterval(punchlist, interval),
      durationFormatOptions
    );
  };

  return (
    <TableRow>
      <SmTableCell
        sx={{
          paddingLeft: shouldUseExtraPadding(interval, isHourlyView)
            ? 'calc(16px + 0.525rem)'
            : '16px',
        }}
      >
        {format(interval.start, isHourlyView ? 'h:mm aaa' : 'M/d/yy')}
      </SmTableCell>
      <SmTableCell>{getTotalTime()}</SmTableCell>
      <TableCell>{taskNames}</TableCell>
      <SmTableCell sx={{ p: '0px' }}>
        <IconButton sx={{ height: '30px', width: '30px' }}>
          <EditOutlinedIcon sx={{ height: '18px', width: '18px' }} />
        </IconButton>
      </SmTableCell>
    </TableRow>
  );
};
