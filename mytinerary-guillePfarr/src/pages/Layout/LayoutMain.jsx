import Footer from "../../components/Footer/Footer";
import NavbarMain from "../../components/Navbar/NavbarMain";
import "./layoutMain.css";
const LayoutMain = ({ children }) => {
  return (
    <div className="layout-main">
      <header className="container layout-main-header">
        <NavbarMain />
      </header>
      {children}
      <Footer />
    </div>
  );
};

export default LayoutMain;
