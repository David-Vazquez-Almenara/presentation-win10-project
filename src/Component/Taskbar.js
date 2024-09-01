import React from 'react';
import '../CSS/Taskbar.css';

const Taskbar = () => {
  return (
    <div id='Win-Bar'>
      <div id='Main-Button-div'>
        <img src='./img/logo/win10-Logo-white.png' id='Win-Main-Button' alt='WIN_BUTTON' />
      </div>

      <div id='Search-bar-div'>
        <img src='./img/icon/search.png' alt='SEARCH_ICON' />
        <textarea placeholder='Search' />
      </div>
    </div>
  );
};

export default Taskbar;
