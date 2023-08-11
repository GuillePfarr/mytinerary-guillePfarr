import EventCard from "../../components/EventCard/EventCard"
import LayoutMain from "../Layout/LayoutMain";

const Home = () => {
  const events = [
    {
      name: "Collectivities Party",
      image: "https://i.postimg.cc/Fs03hQDt/Collectivities-Partry.jpg"
    }
  ];
  return (
      <LayoutMain >
        <section className="container d-flex flex-wrap gap-5 justify-content-between">
          <h2 className="text-center w-100 text-primary">Events</h2>
          {events.map((event) => (
            <EventCard evento={event} />))}
        </section>  
    </LayoutMain>
  );
};

export default Home;