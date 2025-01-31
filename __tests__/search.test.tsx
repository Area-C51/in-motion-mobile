import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { ReactTestInstance } from "react-test-renderer"; 
import App from '../app/(tabs)/search';

describe('Search Component', () => {
  it('search bar placeholder text renders', () => {
    const { getByPlaceholderText } = render(<App />);
    expect(getByPlaceholderText('Search exercises by name')).toBeTruthy();
  });
  it('search bar input value updates', () => {
    const { getByPlaceholderText } = render(<App />);
    const searchInput = getByPlaceholderText('Search exercises by name');

    fireEvent.changeText(searchInput, 'Pushups');
    expect(searchInput.props.value).toBe('Pushups');
  });

  it('search settings button opens the menu', () => {
    const { getByLabelText } = render(<App />);
    const menuButton = getByLabelText('Open search settings');

    fireEvent.press(menuButton);
    expect(getByLabelText('Toggle Dropdowns')).toBeTruthy();
  });

  it('basic search submitted when Enter is pressed', async () => {
    const { getByPlaceholderText } = render(<App />);
    const searchInput = getByPlaceholderText('Search exercises by name');

    fireEvent.changeText(searchInput, 'Squats');
    fireEvent(searchInput, 'submitEditing');

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/search?')
      );
    });
  });
  it('alert shows if submitted search is empty', async () => {
    const { getByLabelText } = render(<App />);
    const searchButton = getByLabelText('Search for exercises with dropdowns');

    jest.spyOn(global, 'alert').mockImplementation(() => {});

    fireEvent.press(searchButton);

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith(
        'Please enter a search term or select a filter'
      );
    });
  });
});

describe('Exercise Component - Image Expand', () => {
  it('submits search, waits for images,expands when tapped, and collapses when tapped again', async () => {
    const {
      getByPlaceholderText,
      getByLabelText,
      getAllByLabelText,
      queryByLabelText,
    } = render(<App />);

    // Enter "Pushups" into the search bar
    const searchInput = getByPlaceholderText('Search exercises by name');
    fireEvent.changeText(searchInput, 'Pushups');
    fireEvent(searchInput, 'submitEditing'); // Trigger search

    // Wait for images to populate (Fix: Cast as an array)
    await waitFor(() => {
      const images = getAllByLabelText(
        /Exercise image for/i
      ) as ReactTestInstance[];
      expect(images.length).toBeGreaterThan(0);
    });

    // Tap on the first image to expand
    const images = getAllByLabelText(
      /Exercise image for/i
    ) as ReactTestInstance[];
    fireEvent.press(images[0]);

    // Ensure modal appears with full-screen image
    await waitFor(() => {
      expect(getByLabelText('Image full screen view')).toBeTruthy();
    });

    // Close the modal by tapping outside
    const modalBackground = getByLabelText('Close the image modal');
    fireEvent.press(modalBackground);

    // Ensure the modal disappears
    await waitFor(() => {
      expect(queryByLabelText('Image full screen view')).toBeNull();
    });
  });
});

describe('Exercise Component - Details Expand', () => {
  it('submits search, waits for exercise details, expands when tapped, and collapses when tapped again', async () => {
    const {
      getByPlaceholderText,
      getByLabelText,
      getByText,
    } = render(<App />);

    // Enter "Pushups" into the search bar
    const searchInput = getByPlaceholderText('Search exercises by name');
    fireEvent.changeText(searchInput, 'Pushups');
    fireEvent(searchInput, 'submitEditing'); // Trigger search

    // Wait for exercise details to populate and tap to expand exercise details
    await waitFor(() => {
      const details = getByLabelText('Expand Exercise Details');
      fireEvent.press(details);
      expect(getByText('Force: Pushups')).toBeTruthy();
      expect(getByLabelText('Expand Exercise Details')).not.toBeTruthy();
    });

    // Tap again to collapse exercise details
    const details = getByLabelText('Expanded Exercise Details');
      fireEvent.press(details);
      expect(getByLabelText('Expand Exercise Details')).toBeTruthy();
      expect(getByText('Force: Pushups')).not.toBeTruthy();
  });
});

// *add to workout button opens menu to select workout (menu does not exist at this time)
// muscle dropdown/spinner opens when tapped
// *correct muscle selected when tapped from dropdown/spinner (feature may not work at this time, need to check)
// category dropdown/spinner opens when tapped
// *correct category selected when tapped from dropdown/spinner (feature may not work at this time, need to check)
// *submit button submits with dropdown/spinner selections (dependent on the above 2 features)

// oauth
// saving workouts to users

// ------ Structure / General
// Method	Purpose
// test() / it()	Defines a test case
// describe()	Groups related tests
// expect().toBe()	Exact match
// expect().toEqual()	Deep equality
// expect().toHaveProperty()	Object property check
// expect().toContain()	Checks if array contains value
// expect().toMatch()	Regex match for strings
// expect().toHaveBeenCalled()	Checks if a mock function was called
// expect().resolves.toBe()	Tests resolved promises
// jest.fn()	Creates a mock function
// jest.mock()	Mocks entire modules
// jest.spyOn()	Spies on object methods
// beforeEach() / afterEach()	Runs before/after each test
// beforeAll() / afterAll()	Runs before/after all tests

// ----- React Native Testing Library Methods
// getByText(text)	Finds an element by its text content
// getByPlaceholderText(placeholder)	Finds an input field by placeholder text
// getByTestId(testID)	Finds an element by testID attribute
// queryByText(text)	Like getByText(), but returns null if not found (instead of throwing an error)
// queryByTestId(testID)	Like getByTestId(), but returns null if not found
// findByText(text)	Async version of getByText(), waits for the element to appear
// fireEvent.press(element)	Simulates pressing a button
// fireEvent.changeText(input, value)	Simulates typing into a TextInput field
// fireEvent.scroll(scrollView, { y: 500 })	Simulates scrolling in a ScrollView
// fireEvent.focus(element)	Simulates focus on an input field
// fireEvent.blur(element)	Simulates blur (losing focus)

// ----- Assertions & Expectations
// expect().toBeTruthy()	Checks if a value is truthy (true, non-empty string, non-zero number, etc.)
// expect().toBeFalsy()	Checks if a value is falsy (false, 0, "", null, undefined, NaN)
// expect().toBeDefined()	Ensures a variable is not undefined
// expect().toBeUndefined()	Ensures a variable is undefined
// expect().toBeNull()	Ensures a variable is null
// expect().toHaveLength(n)	Ensures an array or string has the correct length
// expect().toBeGreaterThan(n)	Checks if a number is greater than n
// expect().toBeGreaterThanOrEqual(n)	Checks if a number is greater than or equal to n
// expect().toBeLessThan(n)	Checks if a number is less than n
// expect().toBeLessThanOrEqual(n)	Checks if a number is less than or equal to n
// expect().toBeInstanceOf(Class)	Checks if a variable is an instance of a class


