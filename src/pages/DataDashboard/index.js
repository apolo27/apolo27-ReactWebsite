import './DataDashboard.css'
import React, { useEffect, useState } from 'react';
import database from '../../services/firebase'; 
import {Container, Table, Tab, Tabs, Button} from 'react-bootstrap';

import {Grid, FormGroup, FormControlLabel, Checkbox} from '@mui/material';
import {List, ListItem, ListItemButton, ListItemText, ListItemAvatar, Avatar} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress'

import {Canvas} from '@react-three/fiber'
import {useGLTF, Stage, PresentationControls} from '@react-three/drei'

import tempIcon from '../../imgs/DataDashboard/tempIcon.png'

function Model(props){
  const {scene} = useGLTF("/rover.glb")
  return <primitive object={scene} {...props} />
}

const DataDashboard = (props) => {
  let t = props.t;
  const [data, setData] = useState(null);
  const [processedData, setProcessedData] = useState([]);
  const [surroundingTemp, setSurroundingTemp] = useState(61);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Assuming we have a 'data' node in our database
        const snapshot = await database
          .ref('/sensors')
          .orderByChild('dateAdded')
          .limitToLast(1)
          .once('value');
        const dataFromDatabase = snapshot.val();
        setData(dataFromDatabase);
      } catch (error) {
        console.error('Error fetching data from Firebase:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      const sensorId = Object.keys(data);
  
      if (sensorId.length > 0) {
        const sensorData = data[sensorId]; // Get the data for that sensor
        const dataToBeProcessed = [
          {key: "ns", value: sensorData.Ns},
          {key: "Latitude", value: sensorData.latitude},
          {key: "Ew", value: sensorData.ew},
          {key: "Speed", value: sensorData.speed},
          {key: "Temp", value: sensorData.temp},
          {key: "Pressure", value: sensorData.pressure},
          {key: "Elevation", value: sensorData.elevation},
          {key: "Humidity", value: sensorData.humidity},
          {key: "accX", value: sensorData.accx},
          {key: "accY", value: sensorData.accy},
          {key: "accZ", value: sensorData.accz},
          {key: "GyroX", value: sensorData.gyrox},
          {key: "GyroY", value: sensorData.gyroy},
          {key: "GyroZ", value: sensorData.gyroz},
          {key: "QuatW", value: sensorData.quatw},
          {key: "QuatX", value: sensorData.quatx},
          {key: "QuatY", value: sensorData.quaty},
          {key: "QuatZ", value: sensorData.quatz},
          {key: "Counter", value: sensorData.counter},
        ]
        
        setProcessedData(dataToBeProcessed)
        
      
      } else {
        console.error("Data object is empty.");
      }
    } else {
      console.error("Data object is undefined or null.");
    }
  }, [data]);

  return(
    <Container >
      <section className='data-dashboard-intro'>
        <h4>
          Cada año blablablabla
          Este es nuestro tablero para el Nasa Herc 2024
        </h4>
      </section>
      <div className='data-dashboard-body'>
        <Tabs defaultActiveKey="overview" justify={true} variant='pills' className='mb-3'>
          <Tab eventKey="overview" title="OVERVIEW" tabClassName='tab'>
            <Grid container={true} wrap='wrap' justifyContent="space-evenly" rowSpacing={4}>

              <Grid item xs="auto" order={{xs: 2,  md: 3, lg: 2, xl: 1 }}>
                <div className='Task-List'>
                  <h2 style={{fontWeight: '700'}}>{t('Tasks')}</h2>
                  <FormGroup >
                      <FormControlLabel control={<Checkbox sx={{color: "aliceblue", '&.Mui-checked': {color: "green"}}}/>} label={t('Find-ARV')} />
                      <FormControlLabel control={<Checkbox sx={{color: "aliceblue", '&.Mui-checked': {color: "green"}}}/>} label={t('Regolith-removal')} />
                      <FormControlLabel control={<Checkbox sx={{color: "aliceblue", '&.Mui-checked': {color: "green"}}}/>} label={t('Moon-maintenance')} />
                      <FormControlLabel control={<Checkbox sx={{color: "aliceblue", '&.Mui-checked': {color: "green"}}}/>} label={t('Power-it-up')} />
                      <FormControlLabel control={<Checkbox sx={{color: "aliceblue", '&.Mui-checked': {color: "green"}}}/>} label={t('Rover-Redundancy')}/>
                  </FormGroup>
                </div>
                <div className='graph'>
                  <h4 style={{fontWeight: '700'}}>{t('Rovers-Accel')}</h4>
                </div>
              
              </Grid>

              <Grid item xs="auto" order={{xs: 1, md: 1, lg: 1, xl: 2 }}>
                <iframe src="https://www.google.com/maps/d/u/0/embed?mid=1O7ZBN5Mw5ox-4F7-HyeIVqI7-Vc3ZG4&ehbc=2E312F&noprof=1"
                  style={{background: <CircularProgress />}}
                  className='herc-map'
                  title='Nasa Herc map'
                  id='herc-map'>
                  
                </iframe>
              </Grid>

              <Grid item xs="auto" order={{xs: 3, md: 3, lg: 3, xl: 3 }}>
                <div className='participants'>
                  <h2 style={{fontWeight: '700'}}>{t('Pilots')}</h2>
                  <List dense className='crewmembers'>
                      <ListItem disablePadding>
                          <ListItemButton>
                          <ListItemAvatar>
                              <Avatar
                              alt="Miguel Arredondo"
                              src="https://apolo27.com/img/about-us/team-members/miguela.png"
                              />
                          </ListItemAvatar>
                          <ListItemText id={1} primary={"Miguel Arredondo"}/>
                          </ListItemButton>
                      </ListItem>

                      <ListItem disablePadding>
                          <ListItemButton>
                          <ListItemAvatar>
                              <Avatar
                              alt="Rosanna Bautista"
                              src="https://apolo27.com/img/about-us/team-members/rosanna.png"
                              />
                          </ListItemAvatar>
                          <ListItemText id={1} primary={"Rosanna Bautista"}/>
                          </ListItemButton>
                      </ListItem>

                      <ListItem disablePadding>
                          <ListItemButton>
                          <ListItemAvatar>
                              <Avatar
                              alt="Raymond Ruiz"
                              src="https://apolo27.com/img/about-us/team-members/raymond.png"
                              />
                          </ListItemAvatar>
                          <ListItemText id={1} primary={"Raymond Ruiz"}/>
                          </ListItemButton>
                      </ListItem>

                      <ListItem disablePadding>
                          <ListItemButton>
                          <ListItemAvatar>
                              <Avatar
                              alt="Ingrid Lopez"
                              src="https://apolo27.com/img/about-us/team-members/ingrid.png"
                              />
                          </ListItemAvatar>
                          <ListItemText id={1} primary={"Ingrid Lopez"} />
                          </ListItemButton>
                      </ListItem>
                  </List>
                </div>
                <div className='environment-sneakpeek'>
                  <h4 style={{fontWeight: '700'}}>{t('Surrounding-temp')}</h4>
                  <div className='temperatura'>
                    <div className='icono-temperatura'>
                      <img alt='termometer' src={tempIcon}></img>
                    </div>
                    <h2 >{surroundingTemp}<span style={{fontSize: '14px', paddingBottom: "15px"}}>°F</span></h2>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Tab>

          <Tab eventKey="rover" title="ROVER" tabClassName='tab'>
            <Canvas spr={[1,2]} camera={{fov: 45}} style={{width: "100%", height: "720px"}}>
              <color attach="background" args={["#283b66"]}/>
              <PresentationControls speed={1.5} zoom={.5} polar={[-0.1, Math.PI/4]}>
                <Stage environment={null}>
                  <Model scale={0.01} />
                </Stage>
              </PresentationControls>
            </Canvas>
          </Tab>
        </Tabs>
      </div>

      {/*
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>Sensor</th>
          <th>Data</th>
        </tr>
      </thead>
      <tbody>
        {
          processedData.map((data) => {
            return(
              <tr key={data.key}>
                <td>{data.key}</td>
                <td>{data.value}</td>
              </tr>
            )
          })
        }
      </tbody>
      </Table>
      */}

    </Container>
  )
}

export default DataDashboard;