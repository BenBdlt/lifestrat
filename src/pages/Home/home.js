import React from 'react';
import './home.css';
import LastActivities from '../../components/Home/lastActivities';
import NewActivity from '../../components/Home/newActivity';
import MainActivity from '../../components/Home/mainActivity';
import InfoProfil from '../../components/Home/infoProfil';

function App() {
  return (
    <div className="homepage">
      <div className="left-pannel">
        <NewActivity/>
        <MainActivity/>
      </div>
      <div className="right-pannel">
        <InfoProfil/>
        <LastActivities/>
      </div>
    </div>
  );
}

export default App;
