import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../components/Layout/Header';
import {render} from '@testing-library/react';
import renderer from 'react-test-renderer';

it("renders Landing component crashing",() => {
    const dev = document.createElement("dev");
    ReactDOM.render(<Header></Header>, dev);
})

