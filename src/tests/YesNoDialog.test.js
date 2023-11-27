import * as React from 'react';
import { fireEvent, screen, render } from '@testing-library/react';
import { YesNoDialog } from 'component/HelperComponents/YesNoDialog';

const question = 'Test question?';
const setOpen = jest.fn();
const response = jest.fn();

describe('YesNoDialog', () => {
  beforeEach(() => {
    render(
      <YesNoDialog
        open={true}
        setOpen={setOpen}
        question={question}
        response={response}
      />
    );
  });
  afterEach(() => {
    setOpen.mockClear();
    response.mockClear();
  });
  it('renders a "Yes" button, a "No" button, and displays an inputed question', () => {
    const yesButton = screen.getByText('Yes');
    const noButton = screen.getByText('No');
    expect(yesButton).toBeInTheDocument();
    expect(yesButton.type).toEqual('button');
    expect(noButton).toBeInTheDocument();
    expect(noButton.type).toEqual('button');
    expect(screen.getByText(question)).toBeInTheDocument();
  });
  it('calls the response function with "true", and calls the setOpen function with "false" when the "Yes" button is clicked', () => {
    fireEvent.click(screen.getByText('Yes'));
    expect(response).toHaveBeenCalledWith(true);
    expect(setOpen).toHaveBeenCalledWith(false);
  });
  it('calls the response function with "false", and calls the setOpen function with "false" when the "No" button is clicked', () => {
    fireEvent.click(screen.getByText('No'));
    expect(response).toHaveBeenCalledWith(false);
    expect(setOpen).toHaveBeenCalledWith(false);
  });
});
