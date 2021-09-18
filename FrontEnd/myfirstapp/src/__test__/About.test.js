import React from 'react';
import ReactDOM from 'react-dom';
import {render} from '@testing-library/react';
import About from '../components/Layout/About';
import renderer from 'react-test-renderer';


it("renders About component crashing",() => {
    const dev = document.createElement("dev");
    ReactDOM.render(<About></About>, dev);
})