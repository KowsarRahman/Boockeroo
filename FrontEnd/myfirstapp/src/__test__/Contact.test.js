import React from 'react';
import ReactDOM from 'react-dom';
import {render} from '@testing-library/react';
import Contact from '../components/Layout/Contact';
import renderer from 'react-test-renderer';


it("renders contact component crashing",() => {
    const dev = document.createElement("dev");
    ReactDOM.render(<Contact></Contact>, dev);
})