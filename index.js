import React from 'react';
import ReactDOM from 'react-dom';
import { useQuery, ApolloProvider } from '@apollo/react-hooks';
import ApolloClient, { gql } from 'apollo-boost';

const client = new ApolloClient({
  uri: 'https://countries-274616.ew.r.appspot.com/graphql',
});

const GET_COUNTRY_QUERY = gql`
  query country($name: String!) {
    Country(name: $name, first: 1) {
      _id
      name
      capital
      flag {
        emoji
        svgFile
      }
      currencies {
        symbol
        name
      }
      officialLanguages {
        name
      }
    }
  }
`;

const App = ({ name, emoji, country }) => {
  const { loading, error, data } = useQuery(GET_COUNTRY_QUERY, {
    variables: { name: country },
    skip: !country,
  });
  console.log(data);
  return (
    <section>
      <div>
        <h1>
          {name}'s site is {emoji}
        </h1>
      </div>
      {!!data?.Country.length && (
        <div>
          <h3>Country Data</h3>
          <p>
            {data.Country[0].name}{' '}
            {data.Country[0].flag.emoji ? (
              <span>{data.Country[0].flag.emoji}</span>
            ) : (
              <img src={data.Country[0].flag.svgFile} />
            )}
          </p>
          <p>
            {data.Country[0].currencies[0].symbol}{' '}
            {data.Country[0].currencies[0].name}
          </p>
        </div>
      )}
    </section>
  );
};

ReactDOM.render(
  <ApolloProvider client={client}>
    <App name="Ivan" emoji="fire" country="" />
  </ApolloProvider>,
  document.getElementById('app')
);
