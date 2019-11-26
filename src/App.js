import React from 'react';

import Card from './components/card'

function App() {
  return (
    <div style={{ width: '280px', margin: '25px auto 0 auto' }}>
      <Card temp="32" city="Curitiba" country="PR" temperature={17} humidity={65} pressure={856} updatedAt="25:65:45" />
    </div>
  );
}

export default App;
