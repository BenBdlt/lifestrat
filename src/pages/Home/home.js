import React from 'react';
import './home.css';
import LastActivities from '../../components/Home/lastActivities';
import NewActivity from '../../components/Home/newActivity';
import MainActivity from '../../components/Home/mainActivity';
import InfoProfil from '../../components/Home/infoProfil';
import { useEffect } from 'react';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';

function App() {

  const navigate = useNavigate();
  // console.log(auth.currentUser)
  useEffect(() => {
    if (auth.currentUser == null) navigate("/login");
  })

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
