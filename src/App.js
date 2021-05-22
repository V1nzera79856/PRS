import {useState, useEffect} from "react";
import './App.scss';
import {db} from "./firebase/firebase";
import firebase from 'firebase/app';

function App() {

    //stan - rezerwacje
    const [reservations, setReservations] = useState([]);
    //pobranie rezerwacji z bazy
    useEffect(() => {
        db.collection("reservations").get().then((querySnapshot) => {
            const allReservations = [];
            querySnapshot.forEach((doc) => {
                allReservations.push({
                    ...doc.data(),
                    id:doc.id,
                })
            });
            setReservations(allReservations);
        });
    }, [])

    const [inputs,setInputs] = useState({name: "", surname: "", email: "", phone: "", place: ""});

    //dodawanie danych do bazy

    const handleChange = (e) => {
        const {name,value} = e.target

        setInputs(prev => ({...prev, [name]: value}));
    }

    const handleSubmit = e => {
        e.preventDefault();

        db.collection("reservations").add({
            name: inputs.name,
            surname: inputs.surname,
            email: inputs.email,
            phone: inputs.phone,
            place: inputs.place
        })
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    }


    return (
        <div className="App">
            <form action="" onSubmit={handleSubmit}>
                <input onChange={handleChange} type="text" value={inputs.name} name="name" id=""/>
                <input onChange={handleChange} type="text" value={inputs.surname} name="surname" id=""/>
                <input onChange={handleChange} type="email" value={inputs.email} name="email" id=""/>
                <input onChange={handleChange} type="number" value={inputs.phone} name="phone" id=""/>
                <input onChange={handleChange} type="number" value={inputs.place} name="place" id=""/>
                <button>dodaj</button>
            </form>
        </div>
    );
}

export default App;
