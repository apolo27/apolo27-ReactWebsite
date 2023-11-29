import './Header.css'
import React from 'react'
import logo from '../../imgs/logo.png'
import {Container, Nav, Navbar, Button} from 'react-bootstrap/';
import Themes from '../Themes';
import SelectLanguage from '../SelectLanguage';

function Header(props){
  const t = props.t;

  return(
    <div>
      <Navbar className='titulo' bg="dark" data-bs-theme="dark" expand="lg">
        <Container className="header">
          <Navbar.Brand href="/"><img src={logo} width={75} alt='logo' />{' '}Apolo 27</Navbar.Brand>

          <div className='links'>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/Data-Dashboard">{t('DATA-DASHBOARD')}</Nav.Link>
                <Nav.Link href="/Stem-With-Us">{t('STEM-WITH-US')}</Nav.Link>
                <Nav.Link href="/Sponsors">{t('BECOME-A-SPONSOR')}</Nav.Link>
                {
                  window.screen.width >= 1280 ? <Nav.Link href="/Games">{t('GAMES')}</Nav.Link> : <></>
                }
              </Nav>
            </Navbar.Collapse>
          </div>
          <Nav fill variant='tabs'>
            <Button className="btnAboutUs" href='/About-Us'>{t('ABOUT-THE-TEAM')}</Button>
          </Nav>
          <Themes />
          <SelectLanguage />
        </Container>
        </Navbar>
    </div>
  )
}

export default Header;