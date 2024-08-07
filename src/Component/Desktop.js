import '../CSS/Main.css';
import '../CSS/Desktop.css';

function Main() {
  return (
    <div id='Main-Container'>

      {/* Only background img/color */} 
      <div id='Desktop-Background'/>

      {/* Bottom Bar */} 
      <div id='Win-Bar'>

        <div id='Main-Button-div'>
          <img src='./img/logo/win10-Logo-white.png' id='Win-Main-Button' alt='WIN_BUTTON'/>
        </div>

        <div id='Search-bar-div'>
          <img src='./img/icon/search.png' alt='WIN_BUTTON'/>
          <textarea placeholder='Search'>
            
          </textarea>
        </div>

        

      </div>



    </div>
  );
}

export default Main;