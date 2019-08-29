import './enzyme';

const testsContext = require.context('../src', true, /_test$/);

testsContext.keys().forEach(testsContext);
