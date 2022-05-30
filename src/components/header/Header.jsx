import { useEffect, useState } from 'react';
import { SearchBar, SearchBarExpanded } from './SearchBar';
import './Header.scss';

function Header({ location, guests }) {
  const [searchBarActive, setSearchBarActive] = useState(false);
  const handleSearchBarActive = () => { setSearchBarActive(!searchBarActive); };

  useEffect(() => {
    if (!searchBarActive) {
      document.querySelector('body').style.overflow = 'auto';
      return;
    }

    document.querySelector('body').style.overflow = 'hidden';
    document.getElementById('search_bar_expanded').addEventListener('click', (ev) => {
      const { clientY } = ev;
      const windowHeight = window.innerHeight;

      // px to vh => (100 * px) / current_window_height
      if (((100*clientY) / windowHeight) > 60) {
        document.getElementById('search_bar_expanded').removeEventListener('click', () => {}, true);
        setSearchBarActive(false);
      }
    });
  }, [searchBarActive]);

  return (
    <div>
      { searchBarActive ? (
        <SearchBarExpanded
          setSearchLotaion={location[1]}
          setSearchGuests={guests[1]}
          setSearchBarActive={setSearchBarActive}
        /> ) : null }

      <div className="header">
        <img src="assets/images/logo.svg" alt="logo" />

        <SearchBar
          setSearchBarActive={handleSearchBarActive}
          guests={guests[0]}
          location={location[0]}
        />
      </div>
    </div>
  );
}

export default Header;
