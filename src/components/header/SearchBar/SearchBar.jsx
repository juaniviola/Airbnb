import { useEffect } from 'react';
import './SearchBar.scss';

function SearchBar({ setSearchBarActive, guests, location }) {
  useEffect(() => {
    if (guests !== 0) {
      document.getElementById('guests_input').value = `${guests} guests`;
    }
  }, [guests]);

  return (
    <div className="search_bar">
      <div className="search_bar_location">
        <span>{location}, Finland</span>
      </div>

      <div className="search_bar_input">
        <input id="guests_input" type="text" placeholder="Add guests" onClick={setSearchBarActive} readOnly={true} />
      </div>

      <div className="search_bar_search">
        <img src="assets/icons/search.svg" width="24" height="24" alt="search" />
      </div>
    </div>
  );
}

export default SearchBar;
