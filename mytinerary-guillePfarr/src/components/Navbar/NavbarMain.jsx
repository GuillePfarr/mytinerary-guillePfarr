import "./navbarmain.css";
import Anchor from "../Anchor";
let data = [
{href:"#" , title:"Home"},
{href:"Cities.html" , title:"Cities"},
{href:"Contact.html" , title:"Contact"},
{href:"Favourites.html" , title:"Favourites"}
]
const NavbarMain = () => {
  return (
    <nav className="Navbar-main">
      {data.map((each, key)=><Anchor key={key} href={each.href} title={each.title} />)}
    </nav>
  );
};

export default NavbarMain;