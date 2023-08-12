import Carousel from "../../components/Carousel/Carousel";
import LayoutMain from "../Layout/LayoutMain";
import "./home.css";
const Home = () => {
  return (
    <LayoutMain>


      <main className="flex-grow-1 d-flex flex-column">
        
        <section className="home-carousel">
          <Carousel />
        </section>
      </main>
    </LayoutMain>
  );
};

export default Home;