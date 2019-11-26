import React  from 'react';

import Nav from './style.js'

import Logo from './horizontal_night_in_logo.svg'
import '../../public/HorizontalNightInLogo.svg'

function Navbar(props) {

    const handleLogout = async () =>  {
        const logout = await fetch(`${process.env.REACT_APP_API_URL}/user/logout`,{
             method: 'GET',
             credentials: 'include',  
        })
        props.logoutCurrentUser()
    }
    
    return(
        <Nav>
            <main>
                <div>
                    <picture>
                        <source media="(min-width: 700px)" srcSet={Logo}/>
                        <img alt="Night In Logo" src={Logo} style={{'margin' : '1em 3em'}}/>
                    </picture>
                </div>
                <section>
                    {props.isLogged ? <span> <p onClick={() => props.showEditProfileModal()}> EDIT PROFILE </p> <p onClick={()=> handleLogout() }>LOGOUT</p> </span>: <p onClick={() => props.logIn()}>LOGIN</p>}
                </section>
            </main>
        </Nav>
    )
};

export default Navbar;