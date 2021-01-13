import React,{useEffect, useState} from "react";
// import firebase from "firebase/app";
import firebase from "../firebase";
import "firebase/firestore";

export default function Navbar() {
  const db = firebase.firestore();
  const [count, setcount] = useState()
  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        db.collection("visitor-details")
          .add({
            responseJson,
          })
          .then(function () {
            console.log("Document successfully written!");
          })
          .catch(function (error) {
            console.error("Error writing document: ", error);
          });
      });
  }, []);

 db.collection("visitor-details").get().then(function(querySnapshot) {      
     setcount(querySnapshot.size)
  })
 console.log(count)
  return (
    <div>
      <h3>Visitor details</h3>
      <h3>{count}</h3>
    </div>
  );
}
