import React from 'react';
import { useState } from 'react';
import '../../pages/Home/home.css';
import { faCirclePlus, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function NewActivity() {
  const [module, setModule] = useState(false);

  const newModule = event => {
    setModule(current => !current);
  };

  return (
    <div className="newActivity">
      <FontAwesomeIcon className={module ? 'module-open' : 'module-close'} icon={faPlusCircle} onClick={newModule} />
    </div>
  );
}

export default NewActivity;