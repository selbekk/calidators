import warning from 'warning';

global.console = {
    error: jest.fn(),
};

export default warning;
