import { useState, useEffect } from 'react';
import Header from './components/header/Header';
import dataHarcoded from './data.json';
import Locations from './components/locations/Locations';
import useSearch from './hooks/useSearch';
import './App.scss';

function App() {
  const location = useSearch(dataHarcoded[0].city);
  const guests = useSearch(0);
  const [data, setData] = useState(dataHarcoded.filter(({city}) => city === location[0]));

  useEffect(() => {
    const actions = {
      'no-guests': () => dataHarcoded.filter(({city}) => city === location[0]),
      'with-guests': () => dataHarcoded.filter(
        ({city, maxGuests}) => city === location[0] && maxGuests <= guests[0],
      ),
    };

    setData(guests[0] === 0 ? actions['no-guests']() : actions['with-guests']());
  }, [location[0], guests[0]]);

  return (
    <div className="app_container">
      <Header location={location} guests={guests} />

      <Locations data={data} />
    </div>
  );
}

export default App;
