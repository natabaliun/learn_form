import {useCallback, useEffect, useState} from "react";
import "./UserPage.styles.scss"
import avatar from "../images/avatar.png";

const nameRegEx = /^[a-zA-Z ]+$/;
const usernameRegEx = /^[a-zA-Z]+$/;

const UserPage = (props) => {
    const { user: userData = {} } = props;
    const [user, setUser] = useState({...userData});
    const [savedUser, setSavedUser] = useState({...userData});
    const [errors, setErrors] = useState({});

    const handleClearSavedData = () => {
        setSavedUser({});
    }

    const isValidUser = useCallback(() => {
        const isValidName = !user.name || nameRegEx.test(user.name);
        const isValidSurName = !user.surname || nameRegEx.test(user.surname);
        const isValidUserame = !user.username || usernameRegEx.test(user.username);

        const errors = {
            ...(isValidName
                ? {}
                : { name: true }
            ),
            ...(isValidSurName
                ? {}
                : { surname: true }
            ),
            ...(isValidUserame
                ? {}
                : { username: true }
            ),
        };
        setErrors(errors);

        return isValidName && isValidSurName && isValidUserame;
    },[user]);

    const handleSave = useCallback((e) => {
        e.preventDefault();

        console.log({ user });

        if (isValidUser()) {
            setSavedUser({...user});
        }
    },[user]);

    const handleChange = (field) => (event) => {
        let value = event.target.value;

        switch (field) {
            case "age":
                if (value < 18) {
                    value = 18;
                }
                break;

            default:
                break;
        }

        setUser({ ...user, [field]: value });
    }

    useEffect(() => {
        console.log('User was changed');
    }, [user]);

    useEffect(() => {
        console.log('Saved user was changed');

    }, [savedUser]);

    return (
        <div className="user-data">
            <h2>Saved data</h2>

            <div className="saved-user">
                <img className="user-avatar" src={avatar} alt="User avatar"/>

                {Object.keys(savedUser).length === 0
                    ? (
                        <div className="user-info">
                            User data is empty
                        </div>
                    )
                    : (
                        <div className="user-info">
                            {savedUser.name && (
                                <div className="user-field">Name: {savedUser.name}</div>
                            )}
                            {savedUser.surname && (
                                <div className="user-field">Surname: {savedUser.surname}</div>
                            )}
                            {savedUser.username && (
                                <div className="user-field">Username: {savedUser.username}</div>
                            )}
                            {savedUser.age && (
                                <div className="user-field">Age: {savedUser.age}</div>
                            )}

                            <button className="clear" onClick={handleClearSavedData}>Clear saved data</button>
                        </div>
                    )
                }
            </div>

            <h2>User data</h2>

            <form
                className="user-form"
                onSubmit={handleSave}
            >
                <label htmlFor="name">Name</label>
                <input
                    value={user.name}
                    onChange={handleChange('name')}
                    name="name"
                    type="text"
                    placeholder="Name"
                />
                {errors.name && (
                    <div className="field-error">
                        Name should have only english letters or space
                    </div>
                )}

                <label htmlFor="surname">Surname</label>
                <input
                    value={user.surname}
                    onChange={handleChange('surname')}
                    name="surname"
                    type="text"
                    placeholder="Surname"
                />
                {errors.surname && (
                    <div className="field-error">
                        Surname should have only english letters or space
                    </div>
                )}

                <label htmlFor="username">Username</label>
                <input
                    value={user.username}
                    onChange={handleChange('username')}
                    name="username"
                    type="text"
                    placeholder="Username"
                />
                {errors.username && (
                    <div className="field-error">
                        Username should have only english letters
                    </div>
                )}

                <label htmlFor="age">Age</label>
                <input
                    value={user.age}
                    onChange={handleChange('age')}
                    name="age"
                    type="number"
                    placeholder="0"
                />

                <button className="submit" type="submit">Save</button>
            </form>
        </div>
    )
}

export default UserPage;