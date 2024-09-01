import '../CSS/Main.css';
import '../CSS/Desktop.css';
import DesktopBackground from './DesktopBackground';
import Taskbar from './Taskbar';

function Main() {
  return (
    <div id='Main-Container'>
      {/* Fondo del escritorio */}
      <DesktopBackground />

      {/* Barra inferior */}
      <Taskbar />
    </div>
  );
}

export default Main;
