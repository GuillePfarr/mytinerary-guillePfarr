import NavbarMain from "../../components/Navbar/NavbarMain"


const Home = () => {
  const events = [];
  return (
    <div className="app-layout">
      <header className="container app-header">
        <NavbarMain />
      </header>
      <main className="app-main">
        <section className="container d-flex flex-wrap gap-5 justify-content-between">
        </section>
      </main>
      <footer className="app-footer">
        <p className="text-center">MindHub AP MERN 088 - GuillePfarr</p>
      </footer>
    </div>
  );
};

export default Home