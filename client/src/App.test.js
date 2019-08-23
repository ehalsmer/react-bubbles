import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import App from './App';


describe('<App />', () => {
    it('matches snapshot', () => {
        const tree = renderer.create(<App/>)
        expect(tree.toJSON()).toMatchSnapshot();
    })
})