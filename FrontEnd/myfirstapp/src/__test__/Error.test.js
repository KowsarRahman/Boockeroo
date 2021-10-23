import React from 'react';
import ReactDOM from 'react-dom';
import {render} from '@testing-library/react';
import Error from '../components/Layout/Error';
import renderer from 'react-test-renderer';


it("renders Error component crashing",() => {
    const dev = document.createElement("dev");
    ReactDOM.render(<Error></Error>, dev);
})