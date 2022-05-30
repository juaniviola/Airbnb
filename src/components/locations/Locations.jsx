import './Locations.scss';

function Locations({ data }) {
  return (
    <div className="location_container">
      <div className="location_title">
        <h2>Stays in Finland</h2>
        <span>{data.length} stays</span>
      </div>

      <div className="location_photos">
        {data.map((location) => {
          return (
            <div key={location.photo} className="location_photo">
              <img src={location.photo} width="350" height="250" />
              <div className="location_description">
                <div>
                  {location.superHost ? <span className="superhost">Super host</span> : null}
                  <span>{location.type}</span>
                  {location.superHost ? <span> . {location.beds} beds</span> : null}
                </div>

                <div className="rating">
                  <img className="star" src="assets/icons/star.svg" width="24" height="24" />
                  <span>{location.rating}</span>
                </div>
              </div>
              <div className="location_title2">
                <span>{location.title}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Locations;
