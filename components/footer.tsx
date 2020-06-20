import styles from './footer.module.css'
import utilStyles from '../styles/utils.module.css'
import * as React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { config } from '@fortawesome/fontawesome-svg-core'
config.autoAddCss = false // needed to prevent flashing of icons
import {
    faLinkedin,
    faGithubSquare,
    faSpotify
  } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
    return (
      <div className={styles.footerContainer}>
            <a href="https://www.linkedin.com/in/jack-l-641496106/" className={`${styles.social} linkedIn fa-2x`}>
                <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a href="https://github.com/jacklenzotti" className={`${styles.social} github fa-2x`}>
                <FontAwesomeIcon icon={faGithubSquare} />
            </a>
            <a href="https://open.spotify.com/user/jack_benett_?si=wQLNF0-cRm-88aJNup-mGA" className={`${styles.social} spotify fa-2x`}>
                <FontAwesomeIcon icon={faSpotify} />
            </a>
      </div>
    )
  }