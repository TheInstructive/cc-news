import './App.css';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowLeft, faBook} from '@fortawesome/free-solid-svg-icons'
import { Link, Outlet} from 'react-router-dom';
import logo from './images/logos.svg'
import DarkMode from './theme/DarkMode';
import { useNavigate, useLocation } from "react-router-dom";
import {faDiscord, faTwitter} from '@fortawesome/free-brands-svg-icons'



function App() {
    const navigate = useNavigate();
    const location = useLocation();

    function handleGoBack() {
        navigate(-1);
      }

  return (
    <div>
      <div className='navigation-container'>
        <div className='navigation'>
        {location.pathname !== "/" && (
            <button id='go-back-button' onClick={handleGoBack}><FontAwesomeIcon icon={faArrowLeft} /></button>
        )}
          <div className='logo'><Link to='/'><img src={logo}/></Link></div>

          <DarkMode></DarkMode>
        </div>
      </div>

    <div className='App'>
      <Outlet/>
      <div className="footer">
        <div className="footer-menus">
          <div className="footer-menu">
            <h4>About</h4>
            <li>
              <a target='blank' href='https://docs.cronos.club/cronos.club/about-us/'>About US</a>
            </li>
            <li>
              <a target='blank' href='https://cronos.club/'>CronosClub</a>
            </li>
            <li>
              <a target='blank' href='https://aliensfromearth.com/'>AFE</a>
            </li>
          </div>

          <div className="footer-menu">
            <h4>Terms</h4>
            <li>
              <a>Privacy Policy</a>
            </li>
            <li>
              <a>Terms of Use</a>
            </li>
          </div>

        </div>

        <div className="social-box">
          <a target='_blank' href='https://twitter.com/CronosClubAFE'>
          <FontAwesomeIcon icon={faTwitter} /> &nbsp; Twitter
          </a>
          <a target='_blank' href='https://discord.gg/Nn3hqfmZgT'>
          <FontAwesomeIcon icon={faDiscord} /> &nbsp; Discord
          </a>
          <a target='_blank' href='https://cronosclub.gitbook.io/'>
            <FontAwesomeIcon icon={faBook} /> &nbsp; Gitbook
          </a>
        </div>

        <div className="footer-info">
          <p>
            <br></br> Contact us at <a href='mailto:support@cronos.club'>support@cronos.club</a> or via{" "}
            <a target='_blank' href='https://discord.gg/Nn3hqfmZgT'>Discord</a>.
          </p>
          <p>© 2023 Cronos.News | All Rights Reserved.</p>
        </div>
      </div>
    </div>

</div>
  );
}

export default App;
