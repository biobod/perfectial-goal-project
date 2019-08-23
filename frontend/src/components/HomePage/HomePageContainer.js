import { graphql, compose } from 'react-apollo';
import HomePage from './HomePage';
import { onGeAllFutureEvents } from '../../APIUtilites/apiQuery';


const HomePageContainer = compose(
  graphql(onGeAllFutureEvents, {
    props: ({ data: { allFutureEvents, error, loading } }) => ({ events: allFutureEvents, error, loading }),
    options: () => ({ fetchPolicy: 'network-only' }),
  }),
)(HomePage);

export default HomePageContainer;
