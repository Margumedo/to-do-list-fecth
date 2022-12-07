import React, { useState } from "react";

//componentes
import UserList from "./UserList.jsx";

const Form = () => {

    const [user, setUser] = useState({
        name: "",
        email: ""
    });

    const [userList, setUserList] = useState([]);

    const [error, setError] = useState([false]);

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const saveUser = () => {
        if (
            user.name.trim() !== "" &&
            user.email.trim() !== ""
        ) {
            setUserList(
                [...userList, user]
            );
            setUser({
                name: "",
                email: ""
            })
            setError(false);
        } else {
            setError(true);
        }
    }

    return (
        <>
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-6 border">
                        <form>
                            <div className="form-group">
                                <label>Nombre</label>
                                <input
                                    onChange={handleChange}
                                    className="form-control"
                                    type="text"
                                    placeholder="Nombre"
                                    name="name"
                                    value={user.name} />

                            </div>
                            <div className="from-group">
                                <label>Email</label>
                                <input
                                    onChange={handleChange}
                                    className="form-control"
                                    type="text"
                                    placeholder="Correo electronico"
                                    name="email"
                                    value={user.email} />

                            </div>
                            <button onClick={saveUser} className="btn btn-primary my-3" type="button" >Guardar</button>
                        </form>
                    </div>
                </div>

                <div className="row justify-content-center">
                    { error==true
                      ?<div className="col-12 col-md-6 alert alert-danger">Todos los campos son necesarios</div>
                      :""    
                    }
                </div>

                <UserList userList={userList} />  

                

            </div>

           
        </>
    );
}

export default Form;