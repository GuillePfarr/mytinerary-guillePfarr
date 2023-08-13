import Carousel from "../../components/Carousel/Carousel";
import HeaderMain from "../../components/HeaderMain/HeaderMain";
import LayoutMain from "../Layout/LayoutMain";
import "./home.css";
const Home = () => {
  return (
    <LayoutMain>



      <main className="flex-grow-1 d-flex flex-column">
        <section className="home-hero">
          <h2 className="home-hero-title">
            "Find your perfect trip. Designed by who know and love their cities"
          </h2>
          <div className="button-wrapper">
            <a className="button cta-button" href="#0"></a>
          </div>
        </section>
        <section className="home-carousel">
          <Carousel />
        </section>
      </main>
    </LayoutMain>
  );
};

export default Home;