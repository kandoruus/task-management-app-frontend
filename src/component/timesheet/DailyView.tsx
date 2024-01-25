import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import 'component/timesheet/_styles.css';
import { TimeInterval, TimePunch } from 'app/types';
import {
  getIntervalAsString,
  getTimeIntervalWithinInterval,
} from 'helper/functions';
import { eachHourOfInterval } from 'date-fns';
import {
  useModal,
  usePunchlistInInterval,
  useTaskInfoFromPunchList,
} from 'app/hooks';
import { BLANK_PUNCH, PX_PER_MS } from 'helper/constants';
import { PunchViewer } from 'component/timesheet/PunchViewer';

export interface DailyViewProps {
  open: boolean;
  day: TimeInterval;
  onClose: () => void;
}

export const DailyView: React.FC<DailyViewProps> = ({ open, day, onClose }) => {
  const punchlist = usePunchlistInInterval(day);
  const taskInfo = useTaskInfoFromPunchList(punchlist);
  const [dateString, setDateString] = useState<string>();
  const [hours] = useState(eachHourOfInterval(day));
  const scrollPane: React.MutableRefObject<HTMLDivElement | null> =
    useRef(null);
  const [punchViewIsOpen, togglePunchView] = useModal();
  const [punchToView, setPunchToView] = useState(BLANK_PUNCH);
  const [punchViewAnchor, setPunchViewAnchor] = useState<null | HTMLElement>(
    null
  );
  const [punchViewerHeight, setPunchViewerHeight] = useState(535.5);

  const punchPaperProps = (
    interval: TimeInterval,
    taskId: string
  ): { left: string; width: number; top: string } => {
    const left = PX_PER_MS * (interval.start - day.start) + 'px';
    const width = PX_PER_MS * (interval.end - interval.start);
    const taskIndex = taskInfo.findIndex((info) => info.id === taskId);
    const top = taskIndex * 53 + 'px';
    return { left, width, top };
  };

  const viewPunch = (punch: TimePunch) => {
    setPunchToView(punch);
    togglePunchView();
  };

  const closePunch = () => {
    setPunchViewAnchor(null);
    togglePunchView();
  };

  useEffect(() => {
    if (scrollPane.current !== null) {
      scrollPane.current.scrollLeft = 1350;
    }
  }, [scrollPane.current]);

  useEffect(() => {
    if (punchViewerHeight !== Math.max(554.5, taskInfo.length * 53 + 24.5)) {
      setPunchViewerHeight(Math.max(554.5, taskInfo.length * 53 + 24.5));
    }
  }, [taskInfo.length]);

  useEffect(() => {
    setDateString(getIntervalAsString(day.start));
  }, [day]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        className="viewer-wrapper"
        sx={{ borderColor: 'primary.main', width: '75vw' }}
      >
        <Typography
          className="viewer-header"
          sx={{ bgcolor: 'primary.main' }}
          color="common.white"
          variant="body1"
        >
          {'Daily Activity for ' + dateString}
        </Typography>
        <Box className="viewer-pane">
          <Box
            ref={scrollPane}
            sx={{
              width: '100%',
              textWrap: 'nowrap',
              overflowX: 'auto',
            }}
          >
            <Table sx={{ height: '100%' }}>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      height: '24.5px',
                      padding: '0',
                    }}
                  >
                    {hours.map((date, index) => (
                      <Box
                        className="hour-row"
                        key={index}
                        sx={{
                          height: punchViewerHeight + 'px',
                          textAlign: 'center',
                          width: '150px',
                        }}
                      >
                        {getIntervalAsString(date.getTime(), true)}
                      </Box>
                    ))}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell
                    sx={{
                      height: '530px',
                      padding: 0,
                      position: 'relative',
                      borderBottom: 'none',
                    }}
                  >
                    {punchlist.map((punch, index) => {
                      const { top, width, left } = punchPaperProps(
                        getTimeIntervalWithinInterval(
                          punch.punchIn,
                          punch.punchOut,
                          day
                        ),
                        punch.taskId
                      );
                      const taskName = taskInfo.find(
                        (info) => info.id === punch.taskId
                      )?.name as string;
                      const hoverWidth = Math.max(
                        width,
                        7.9 * taskName?.length + 32
                      );
                      return (
                        <Paper
                          key={index}
                          sx={{
                            position: 'absolute',
                            height: '52px',
                            padding: '16px',
                            bgcolor: 'primary.main',
                            color: 'common.white',
                            overflow: 'hidden',
                            top,
                            left,
                            width: width + 'px',
                            '&:hover': {
                              width: hoverWidth + 'px',
                              overflow: 'visible',
                              cursor: 'pointer',
                              zIndex: 2,
                            },
                          }}
                          onClick={(e) => {
                            setPunchViewAnchor(e.currentTarget);
                            viewPunch(punch);
                          }}
                        >
                          {taskName}
                        </Paper>
                      );
                    })}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        </Box>
        <PunchViewer
          open={punchViewIsOpen}
          punch={punchToView}
          anchorEl={punchViewAnchor}
          onClose={closePunch}
        />
      </Box>
    </Modal>
  );
};
