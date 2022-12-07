import React from "react";
import PropTypes from "prop-types";

//Componentes
import User from "./User.jsx";

const UserList = ({userList}) => {


    return (

        <div className="row justify-content-center">
            <div className="col-12 col-md-6">
                <ul>

                    {userList.map((user, index) => {
                        return (<User key={index} user={user} />);
                    
                    })}
                </ul>
            </div>
        </div>

    );
}

UserList.propTypes = {
    userList: PropTypes.array

}


export default UserList;