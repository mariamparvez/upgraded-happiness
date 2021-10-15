import React from 'react'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
 
class Geo1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: ''};
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log("Latitude is :", position.coords.latitude, "Longitude is :", position.coords.longitude);
    });
  }
  
  handleChange = address => {
    this.setState({ address });
  };
 
  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));
  };
 
  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <div className="search-box" style={{padding: "0"}}>
           
            <form className="form-design" action="assets/webpages/list.html">

            <div className='search-location'>
            <input  
            {...getInputProps({placeholder: 'Search Places ...', 
            className: 'location-search-input',})}
            type="text" 
            id="location" 
            placeholder="Search Location"/>                
              <div 
              className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                      const className = suggestion.active
                      ? 'suggestion-item--active'
                      : 'suggestion-item';
                      // inline style for demonstration purpose
                      const style = suggestion.active
                      ? { backgroundColor: 'rgba(238, 238, 232, .9)',padding: ".5rem",  cursor: 'pointer' }
                      : { backgroundColor: '#fdfdfd',padding: ".5rem", cursor: 'pointer' };
                      return (
                      <div 
                          key={suggestion.placeId} 
                          {...getSuggestionItemProps(suggestion, {
                          className,
                          style,
                          })}
                      >
                        <span
                        
                        onClick={() => this.handleChange(suggestion.description)}>
                          {suggestion.description}
                        </span>
                        </div>
                        );
                    })}
                  </div>
            </div>
          
            </form>
          </div>
        </div>
        )}
      </PlacesAutocomplete>
    );
   
  }
} export default Geo1;