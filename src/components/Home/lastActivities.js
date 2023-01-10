import React from 'react';
import { Link } from '@mui/material';
import '../../pages/Home/home.css';
import { useEffect, useState } from 'react';
import { db, auth } from '../../firebase';
import { collection, addDoc, getDocs } from "firebase/firestore";

function LastActivities() {

  const [actList, setActList] = useState([]);
   //FETCH POST LIST
   const fetchActivities = async () => {
    await getDocs(collection(db, "activities"))
      .then((querySnapshot)=>{               
          const newData = querySnapshot.docs
              .map((doc) => ({...doc.data(), id:doc.id }));
              setActList(newData);                
          console.log(actList, newData);
    })
  }
   
  useEffect(()=>{
    fetchActivities();
  }, [])

  return (
    <div className="lastActivities">
      <h1>Dernière Activités</h1>
      
      <div className="listPosts">
        {
          actList?.map((post,i)=>(
            <div key={i} className="actContent">
              <ul>
                <a href="/actvity:id">
                  <li>
                      <p>{post.title}</p>
                      <span>{post.add_date}</span>
                  </li>
                </a>
              </ul>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default LastActivities;