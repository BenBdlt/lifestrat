import React from 'react';
import { useState } from 'react';
import '../../pages/Home/home.css';
import { faCirclePlus, faPlusCircle, faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { db, auth } from '../../firebase';
import moment from 'moment/moment';
import { collection, addDoc, getDocs } from "firebase/firestore";
import Select from 'react-select';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function NewActivity() {

  if (auth.currentUser) {
    console.log(auth.currentUser.uid)
  }

  // const [module, setModule] = useState(0);
  // const newModule = event => {
  //   setModule(current => !current);
  // };
  const [actWait, setActWait] = useState(false);
  const [actTitle, setActTitle] = useState("");
  const [actCat, setActCat] = useState("");
  const [actDesc, setActDesc] = useState("");
  const [actTime, setActTime] = useState(null);


  const handleChange = (event) => {
    setActCat(event.value);
  };

  moment.locale('fr');
  //ADD NEW POST
  const addActivity = async (e) => {
    e.preventDefault();
    setActWait(true);
    let deadline = "";
    if (actTime) {
      deadline = actTime.$d
    }
   
    try {
        const docRef = await addDoc(collection(db, "activities"), {
          title: actTitle,    
          cat: actCat,    
          desc: actDesc,
          deadline: deadline,
          author: auth.currentUser.email,
          userId: auth.currentUser.uid,
          add_date: moment().format('llll')  
        });
        console.log("Document written with ID: ", docRef.id);
        setActWait(false);
      } catch (e) {
        console.error("Error adding document: ", e);
        setActWait(false);
    }
  }

  const catOptions = [
    {value: 'cat1', label: 'Catégorie 1'},
    {value: 'cat2', label: 'Catégorie 2'},
    {value: 'cat3', label: 'Catégorie 3'}
  ]

  return (
    <div className="newActivity">
      <h1>Nouvel objectif</h1>
      {/* <FontAwesomeIcon className={module ? 'module-open' : 'module-close'} icon={faPlusCircle} onClick={newModule} /> */}

      <div className="formPost">
          <div className="formHead">
            <input
              className='title'
                type="text"
                placeholder="Titre"
                onChange={(e)=>setActTitle(e.target.value)}
            />
            <div className="time-cat">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  className="date-picker"
                  label="Échéance"
                  value={actTime}
                  onChange={(newValue) => {
                    setActTime(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              {/* <input
                  type="text"
                  placeholder="deadline"
                  onChange={(e)=>setActTime(e.target.value)}
              /> */}
              <Select
                className="basicSingle"
                classNamePrefix="postCat"
                defaultValue={catOptions[0]}
                name="postCat"
                options={catOptions}
                onChange={handleChange}
              />
            </div>
          </div>

          <textarea
            rows="5"
            maxLength={500}
            placeholder="Description (500 car. Max)"
            onChange={(e)=>setActDesc(e.target.value)}
          />
          { actWait 
            ? <FontAwesomeIcon className="loading" icon={faCircleNotch} />
            : <button className='submit-activities' type='submit' onClick={addActivity}>
            Créer
          </button>
          }
          
        </div>
    </div>
    
  );
}

export default NewActivity;