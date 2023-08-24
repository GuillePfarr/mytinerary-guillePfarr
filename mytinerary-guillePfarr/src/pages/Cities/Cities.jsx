
import React, { Component } from 'react';
import '../Cities/cities.css';

class Cities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [
          { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Calle_Dlugie_Pobrzeze%2C_Gdansk%2C_Polonia%2C_2013-05-20%2C_DD_06.jpg/1024px-Calle_Dlugie_Pobrzeze%2C_Gdansk%2C_Polonia%2C_2013-05-20%2C_DD_06.jpg", name: "Cape Town-South Africa" },
        { image: "https://www.wendyperrin.com/wp-content/uploads/2018/07/Teotihuacan-pyramid-balloons-near-Mexico-City-shutterstock_718460332.jpg", name: "Mexico-City Mexico" },
        { image: "https://www.wendyperrin.com/wp-content/uploads/2018/10/Galata-Tower-neighberhood-view-Istanbul-Turkey-shutterstock_554343394.jpg", name: "Istambul-Turkey" },
        { image: "https://www.wendyperrin.com/wp-content/uploads/2017/12/shutterstock_388289746.jpg", name: "Barcelona-Spain" },
        { image: "https://tnaa.com/wp-content/uploads/2021/10/hero-684x620.jpg", name: "Ciudad 4" },
        { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Calle_Dlugie_Pobrzeze%2C_Gdansk%2C_Polonia%2C_2013-05-20%2C_DD_06.jpg/1024px-Calle_Dlugie_Pobrzeze%2C_Gdansk%2C_Polonia%2C_2013-05-20%2C_DD_06.jpg", name: "Ciudad 5" },
        { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Hagia_Sophia_Mars_2013.jpg/800px-Hagia_Sophia_Mars_2013.jpg", name: "Istambul" },
        { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Luzern_Kapellbruecke.jpg/800px-Luzern_Kapellbruecke.jpg", name: "Lucerne Swizerland" },
        { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Kremlevskaya_Naberezhnaja_Moscow.hires.jpg/800px-Kremlevskaya_Naberezhnaja_Moscow.hires.jpg", name: "Moscow Russia" },
        { image: "https://www.wendyperrin.com/wp-content/uploads/2019/08/Gran-Via-night-Madrid-Spain-shutterstock_557009335.jpg", name: "Madrid-Spain" },
        { image: "https://www.wendyperrin.com/wp-content/uploads/2018/06/stock-photo-mountain-village-novara-di-sicilia-sicily-italy-shutterstock_736870174.jpg", name: "Sicily-Italy" },
        { image: "https://www.wendyperrin.com/wp-content/uploads/2018/01/venice-2647436_1920.jpg", name: "Venice-Italy" },
        { image: "https://www.wendyperrin.com/wp-content/uploads/2014/09/duomo-florence-italy-cr-brian-dore-1cropped.jpg", name: "Florence-Italy" },
        { image: "https://www.wendyperrin.com/wp-content/uploads/2019/08/Gran-Via-night-Madrid-Spain-shutterstock_557009335.jpg", name: "Madrid-Spai" },
        { image:"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/HerdenkingVuurgrensRotterdam1940_2007_edit1.jpg/800px-HerdenkingVuurgrensRotterdam1940_2007_edit1.jpg", name: "Rotterdam Netherlands" },
        { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Colosseum_in_Rome-April_2007-1-_copie_2B.jpg/1024px-Colosseum_in_Rome-April_2007-1-_copie_2B.jpg", name: "Rome Italy" },
        { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Attica_06-13_Athens_25_Olympian_Zeus_Temple.jpg/800px-Attica_06-13_Athens_25_Olympian_Zeus_Temple.jpg", name: "Athens Greek" },
      ],
      filter: '',
      filteredCities: [], // Initialize as an empty array
    };
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  componentDidMount() {
    // Populate filteredCities with all cities when the component mounts
    this.setState({ filteredCities: this.state.cities });
  }

  handleFilterChange(event) {
    const filterText = event.target.value.toLowerCase();

    const filteredCities = this.state.cities.filter(city =>
      city.name.toLowerCase().startsWith(filterText)
    );

    this.setState({ filter: event.target.value, filteredCities });
  }

  render() {
    const { filter, filteredCities } = this.state;

    return (
      <div className="container">
        <h1>Cities</h1>
        <input
          type="text"
          placeholder="Filter by name..."
          value={filter}
          onChange={this.handleFilterChange}
        />
        <div className="row">
          {filteredCities.map(city => (
            <div className="col-md-4" key={city.name}>
              <div className="card">
                <img src={city.image} className="card-img-top" alt={city.name} />
                <div className="card-body">
                  <h5 className="card-title">{city.name}</h5>
                  <p className="card-text">{city.description}</p>
                  <a href={`/details/${city._id}`} className="btn btn-primary">
                    View Details
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Cities;














