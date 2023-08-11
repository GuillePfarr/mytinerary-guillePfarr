import EventCard from "../../components/EventCard/EventCard"
import LayoutMain from "../Layout/LayoutMain";
import Carousel from "../../components/Carousel/Carousel";

const Home = () => {
  const events = [
    {
      name: "Berlin, Germany",
      image: "https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcT644vdv9M6CFvfgGkjJrFBDaP7nBO7WYYa4K3jyMl4U09ZsK1BQp6nMWHnDm51PkeL2WuwGoZWJtL2sITT7jobc5y9TQ"
    },
 {
      name: "London, England",
      image: "https://www.google.com/search?sca_esv=556076959&sxsrf=AB5stBitdLpeW2AKYB729w_UjarD0svo9w:1691791904650&q=Londres&stick=H4sIAAAAAAAAAOOQUeLQz9U3MMkqyDESysvPTSpKVUhJVUjOLE1JTEktjtLPzD28MD01L7UYWRjIzlHILc1LyVdIzs9TKC4tVoDoLT7FCDbP1Cy-EsYsLMmCMkG2nGJkBzGzjQuggoamZoUw-ZycJBizuDwFZkCOmQmUaZZsZgTTZmlo8otRyA_DyQ0sjItY2X3y81KAzrnFJslwa0WPyrxv93t_ffj-hSX8rva9Nwki10MnKQAAMHUdsvwAAAA&sa=X&ved=2ahUKEwjOu4r8z9WAAxXig4QIHUJ1DfkQs9oBKAJ6BAggEAQ"
    }
  ];
  return (
      <LayoutMain >
        {/* <section className="container d-flex flex-wrap gap-5 justify-content-between">
          <h2 className="text-center w-100 text-primary">Events</h2>
          {events.map((event) => (
            <EventCard evento={event} />))}
        </section>   */}
<Carousel />
    </LayoutMain>
  );
};

export default Home;