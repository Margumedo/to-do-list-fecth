import React from "react";
import PropTypes from "prop-types"

const User = ({user})=>{

    const {name , email} = user

    return(
        <h2 className="text-center ">Soy el usuario {name} y mi correo es {email}</h2>
    );
}

User.propTypes ={
    name : PropTypes.object
}

export default User;