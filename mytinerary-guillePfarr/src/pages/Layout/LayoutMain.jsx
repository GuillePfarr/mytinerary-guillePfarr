import Footer from "../../components/Footer/Footer";
import NavbarMain from "../../components/Navbar/NavbarMain";
import "./layoutMain.css";
const LayoutMain = ({ children }) => {
  return (
    <div className="layout-main">
      <header className="container layout-main-header">
        <NavbarMain />
      </header>
{/* <div class="hero-image">
  <div class="hero-text">
    <h1>I am John Doe</h1>
    <p>And I'm a Photographer</p>
    <button>Hire me</button>
  </div>
</div> */}
      {children}
      <Footer />
    </div>
  );
};

export default LayoutMain;
