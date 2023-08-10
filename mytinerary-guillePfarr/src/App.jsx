import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function App() {

const alumnos =["Choco", "Late", "Con", "Pelos"];
  return (
    <div className="app-layout">
      <header className="app-header">Header</header>
      <main className="app-main">
<h2>Alumnos</h2>
<ul>

{alumnos.map( alumno => <li> { alumno }</li>)}

</ul>
</main>
      <footer className="app-footer">Footer</footer>
    </div>
  );
}

export default App
