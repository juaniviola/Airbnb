import { useState } from 'react';
import './SearchBarExpanded.scss';
import dataHarcoded from '../../../data.json';

const cities = Array.from(new Set(dataHarcoded.map((data) => data.city)));
const handleDOMLocation = () => {
  document.querySelector('.location_input').className = 'search_input location_input border';
  document.querySelector('.guests_input').className = 'search_input guests_input';
};
const handleDOMGuests = () => {
  document.querySelector('.guests_input').className = 'search_input guests_input border';
  document.querySelector('.location_input').className = 'search_input location_input';
};

function SearchBarExpanded({ setSearchGuests, setSearchLotaion, setSearchBarActive }) {
  const [showLocation, setShowLocation] = useState(false);
  const [showGuests, setShowGuests] = useState(false);
  const [guests, setGuests] = useState({ adult: 0, children: 0, total: 0 });
  const [location, setLocation] = useState('');

  const handleClickLocation = () => {
    setShowLocation(true);
    setShowGuests(false);
    handleDOMLocation();
  };

  const handleClickGuests = () => {
    setShowGuests(true);
    setShowLocation(false);
    handleDOMGuests();
  };

  const handleSetCity = (city) => {
    setLocation(city);
    document.getElementById('location').value = `${city}, Finland`;
  };

  const setValueGuestsInput = (value) => document.getElementById('guests').value = `${value} guests`;
  const handleSetGuests = ({type, sign}) => {
    const actions = {
      'children': {
        '+': () => {
          setGuests({ ...guests, children: guests.children + 1, total: guests.total + 1  });
          setValueGuestsInput(guests.total + 1);
        },
        '-': () => {
          setGuests({
            ...guests,
            children: Math.max(guests.children - 1, 0),
            total: Math.max(guests.total - 1, 0)
          });
          setValueGuestsInput(Math.max(guests.total - 1, 0));
        },
      },
      'adult': {
        '+': () => {
          setGuests({ ...guests, adult: guests.adult + 1, total: guests.total + 1  });
          setValueGuestsInput(guests.total + 1);
        },
        '-': () => {
          setGuests({
            ...guests,
            adult: Math.max(guests.adult - 1, 0),
            total: Math.max(guests.total - 1, 0)
          });
          setValueGuestsInput(Math.max(guests.total - 1, 0));
        },
      }
    };

    actions[type][sign]();
  };

  const handleSearch = () => {
    if (guests.total > 0) setSearchGuests(guests.total);
    if (location !== '') setSearchLotaion(location);

    setSearchBarActive(false);
  };

  return (
    <div id="search_bar_expanded" className="search_bar_expanded">
      <div className="search_bar_expanded_content">
        <div className="search_bar_inputs">
          <div className="edit_search">
            <span>Edit your Search</span>
            <span onClick={() => setSearchBarActive(false)}>
              <img src="assets/icons/close.svg" width="20" height="20" />
            </span>
          </div>

          <div className="search_input location_input">
            <span>Location</span>
            <input
              id="location"
              type="text"
              placeholder="Add location"
              onClick={handleClickLocation}
              readOnly={true}
            />
          </div>

          <div className="search_input guests_input">
            <span>Guests</span>
            <input
              id="guests"
              type="text"
              placeholder="Add guests"
              onClick={handleClickGuests}
              readOnly={true}
            />
          </div>

          <div className="search_input search_button">
            <button onClick={handleSearch}>
              <img src="assets/icons/search_white.svg" width="24" height="24" /> Search
            </button>
          </div>
        </div>

        <div className="search_bar_inputs_content">
          {showLocation ? (
            <div className="location_places">
              {cities ? cities.map((city) => {
                return (
                  <p key={city} onClick={() => handleSetCity(city)}>
                    <img src="assets/icons/location.svg" width="24" height="24" />{city}, Finland
                  </p>
                );
              }) : null }
            </div>
          ) : null}

          {showGuests ? (
            <div className="guests_container">
              <div className="space"></div>
              <div className="guests_inputs">
                <div className="guests_adult">
                  <p>Adult</p>
                  <p>Ages 13 or above</p>
                  <button
                    onClick={() => handleSetGuests({ type: 'adult', sign: '-' })}
                  >-</button>
                  <span>{guests.adult}</span>
                  <button
                    onClick={() => handleSetGuests({ type: 'adult', sign: '+' })}
                  >+</button>
                </div>

                <div className="guests_child">
                  <p>Children</p>
                  <p>Ages 2 - 12</p>
                  <button
                    onClick={() => handleSetGuests({ type: 'children', sign: '-' })}
                  >-</button>
                  <span>{guests.children}</span>
                  <button
                    onClick={() => handleSetGuests({ type: 'children', sign: '+' })}
                  >+</button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default SearchBarExpanded;
