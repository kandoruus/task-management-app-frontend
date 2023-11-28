import * as React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { TasklistViewer } from './TasklistViewer';
import { renderWithProviders, getMockTasklist } from 'helper/testUtils';
import { initialTaskCtrlState } from 'app/taskCtrlSlice';
import { initialTaskEditorState } from 'app/taskEditorSlice';
import { TASKS_PER_PAGE } from 'helper/constants';
import { setupStore } from 'app/store';

describe('TasklistViewer', () => {
  const mocklist = getMockTasklist(101);
  it('renders TasklistViewer with no TaskCards', () => {
    renderWithProviders(<TasklistViewer />);
    expect(screen.getByTestId('tasklist-viewer')).toBeInTheDocument();
    expect(screen.getAllByRole('button').length).toEqual(4);
    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('<')).toBeInTheDocument();
    expect(screen.getByText('1 of 1')).toBeInTheDocument();
    expect(screen.getByText('>')).toBeInTheDocument();
    expect(screen.getByText('Last')).toBeInTheDocument();
  });
  it('displays TaskCards when tasklist is not empty', () => {
    const mockTasklistLength = 2;
    renderWithProviders(<TasklistViewer />, {
      preloadedState: {
        taskCtrl: {
          ...initialTaskCtrlState,
          tasklist: mocklist.slice(0, mockTasklistLength),
        },
        taskEditor: initialTaskEditorState,
      },
    });
    for (let i = 0; i < mockTasklistLength; i++) {
      expect(screen.getByText('mock name ' + i)).toBeInTheDocument();
    }
    expect(screen.queryByText('mock name ' + mockTasklistLength)).toBeNull();
  });
  it('displays 25 TaskCards and has additional pages if tasklist is greater than 25', () => {
    const mockTasklistLength = 26;
    renderWithProviders(<TasklistViewer />, {
      preloadedState: {
        taskCtrl: {
          ...initialTaskCtrlState,
          tasklist: mocklist.slice(0, mockTasklistLength),
        },
        taskEditor: initialTaskEditorState,
      },
    });
    for (let i = 0; i < TASKS_PER_PAGE; i++) {
      expect(screen.getByText('mock name ' + i)).toBeInTheDocument();
    }
    expect(screen.queryByText('mock name ' + TASKS_PER_PAGE)).toBeNull();
    expect(screen.getByText('1 of 2')).toBeInTheDocument();
  });
  describe('with a large tasklist', () => {
    const store = {
      ...setupStore({
        taskCtrl: {
          ...initialTaskCtrlState,
          tasklist: mocklist,
          page: 3,
        },
        taskEditor: initialTaskEditorState,
      }),
    };
    beforeEach(() => {
      renderWithProviders(<TasklistViewer />, { store });
    });
    it('displays exactly 25 TaskCards, the correct current page, and the correct number of pages', async () => {
      expect(
        screen.queryByText('mock name ' + 2 * TASKS_PER_PAGE - 1)
      ).toBeNull();
      const cards = await screen.findAllByText(/mock name \d+/);
      expect(cards).toHaveLength(25);
      expect(cards[0].textContent).toEqual('mock name ' + 2 * TASKS_PER_PAGE);
      expect(cards[24].textContent).toEqual(
        'mock name ' + (3 * TASKS_PER_PAGE - 1)
      );
      expect(screen.queryByText('mock name ' + 3 * TASKS_PER_PAGE)).toBeNull();
      expect(screen.getByText('3 of 5')).toBeInTheDocument();
    });
    it('navigates to the next page when the > button is clicked', async () => {
      fireEvent.click(screen.getByText('>'));
      expect(
        screen.queryByText('mock name ' + 3 * TASKS_PER_PAGE - 1)
      ).toBeNull();
      const cards = await screen.findAllByText(/mock name \d+/);
      expect(cards).toHaveLength(25);
      expect(cards[0].textContent).toEqual('mock name ' + 3 * TASKS_PER_PAGE);
      expect(cards[24].textContent).toEqual(
        'mock name ' + (4 * TASKS_PER_PAGE - 1)
      );
      expect(screen.queryByText('mock name ' + 4 * TASKS_PER_PAGE)).toBeNull();
      expect(screen.getByText('4 of 5')).toBeInTheDocument();
    });
    it('navigates to the previous page when the < button is clicked', async () => {
      fireEvent.click(screen.getByText('<'));
      expect(await screen.findByText('3 of 5')).toBeInTheDocument();
      fireEvent.click(screen.getByText('<'));
      expect(screen.queryByText('mock name ' + TASKS_PER_PAGE - 1)).toBeNull();
      const cards = await screen.findAllByText(/mock name \d+/);
      expect(cards).toHaveLength(25);
      expect(cards[0].textContent).toEqual('mock name ' + TASKS_PER_PAGE);
      expect(cards[24].textContent).toEqual(
        'mock name ' + (2 * TASKS_PER_PAGE - 1)
      );
      expect(screen.queryByText('mock name ' + 2 * TASKS_PER_PAGE)).toBeNull();
      expect(screen.getByText('2 of 5')).toBeInTheDocument();
    });
    it('navigates to the last page when the Last button is clicked', () => {
      fireEvent.click(screen.getByText('Last'));
      expect(screen.queryByText('mock name 99')).toBeNull();
      expect(screen.getByText('mock name 100')).toBeInTheDocument();
      expect(screen.queryByText('mock name 101')).toBeNull();
      expect(screen.getByText('5 of 5')).toBeInTheDocument();
    });
    it('does not change the page when the > is clicked and the current page is the last page', async () => {
      expect(screen.getByText('5 of 5')).toBeInTheDocument();
      fireEvent.click(screen.getByText('>'));
      expect(screen.queryByText('mock name 99')).toBeNull();
      expect(screen.getByText('mock name 100')).toBeInTheDocument();
      expect(screen.queryByText('mock name 101')).toBeNull();
      expect(screen.getByText('5 of 5')).toBeInTheDocument();
    });
    it('navigates to the first page when the First button is clicked', async () => {
      fireEvent.click(screen.getByText('First'));
      const cards = await screen.findAllByText(/mock name \d+/);
      expect(cards).toHaveLength(25);
      expect(cards[0].textContent).toEqual('mock name 0');
      expect(cards[24].textContent).toEqual(
        'mock name ' + (TASKS_PER_PAGE - 1)
      );
      expect(screen.queryByText('mock name ' + TASKS_PER_PAGE)).toBeNull();
      expect(screen.getByText('1 of 5')).toBeInTheDocument();
    });
    it('does not change the page when the < is clicked and the current page is the first page', async () => {
      expect(screen.getByText('1 of 5')).toBeInTheDocument();
      fireEvent.click(screen.getByText('<'));
      const cards = await screen.findAllByText(/mock name \d+/);
      expect(cards).toHaveLength(25);
      expect(cards[0].textContent).toEqual('mock name 0');
      expect(cards[24].textContent).toEqual(
        'mock name ' + (TASKS_PER_PAGE - 1)
      );
      expect(screen.queryByText('mock name ' + TASKS_PER_PAGE)).toBeNull();
      expect(screen.getByText('1 of 5')).toBeInTheDocument();
    });
  });
});
