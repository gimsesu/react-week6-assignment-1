import React from 'react';

import { render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import { MemoryRouter } from 'react-router-dom';

import App from './App';

describe('App', () => {
  const dispatch = jest.fn();

  useDispatch.mockImplementation(() => dispatch);

  beforeEach(() => {
    useSelector.mockImplementation((selector) => selector({
      regions: [{ id: 1, name: '서울' }],
      categories: [],
      restaurants: [],
      restaurant: {
        id: 1,
        name: '양천주가',
        address: '서울시 강남구 123456',
        menuItems: [
          { id: 1, name: '비빔밥' },
        ],
      },
    }));
  });

  const renderApp = ({ path }) => render((
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>
  ));

  context('with path /', () => {
    it('render HomePage', () => {
      const { container } = renderApp({ path: '/' });

      expect(container).toHaveTextContent('Home');
    });
  });

  context('with path /about', () => {
    it('render AboutPage', () => {
      const { container } = renderApp({ path: '/about' });

      expect(container).toHaveTextContent('About');
    });
  });

  context('with path /restaurants', () => {
    it('render restaurantsPage', () => {
      const { container } = renderApp({ path: '/restaurants' });

      expect(container).toHaveTextContent('서울');
    });
  });

  context('with path /restaurants/:restaurantId', () => {
    it('render restaurantPage', () => {
      const { container } = renderApp({ path: '/restaurants/1' });

      expect(container).not.toBeNull();
    });
  });

  context('with invalid path', () => {
    it('render notFoundPage', () => {
      const { container } = renderApp({ path: '/abcd' });

      expect(container).toHaveTextContent('Not Found');
    });
  });
});
