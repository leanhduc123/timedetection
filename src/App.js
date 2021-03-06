
import { Box, CircularProgress, FormControl, InputLabel, LinearProgress, MenuItem, Modal, Select, TextField } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import './App.css';
import { FileInput } from './FileInput';
import { ResultPage } from './ResultPage';
import myVideo from './hw_out.mp4'
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function App() {
  const [min, max] = [1,100];
  const [state, setState] = useState('input');
  const [progress, setProgress] = useState(100);
  const [isProcessing, setProcessing] = useState(false);
  const [s, setS] = useState(1);
  const [v, setV] = useState(1);
  const [t, setT] = useState(13);
  const [date, setDate] = useState("");
  const [future, setFuture] = useState(10);
  const [location, setLocation] = useState("");
  const [file, setFile] = useState(null);
  const values = [10,20,30,40,50,60,70,80,90,100];
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // useEffect(() => {
  //   if (progress >= 100) {
  //     setProcessing(true);
  //     setTimeout(() => {
  //       setState("finished");
  //       setProgress(0);
  //       setProcessing(false);
  //     },1000)
  //   }
  // },[progress])
  // const handleChangeS = (val) => {
  //   val = Math.round(val.target.value * 100) / 100;
  //   if (val >= min && val <= max) setS(val);
  //   else if (val > max) setS(max)
  //   else setS(min);
  // }
  // const handleChangeV = (val) => {
  //   val = Math.round(val.target.value * 100) / 100;
  //   if (val >= min && val <= max) setV(val);
  //   else if (val > max) setV(max)
  //   else setV(min);
  // }
  const changeHandler = (val) => {
    // val = val.target.files[0]
    // console.log(val)
    // if (val.name.split('.')[1] != 'mp4') return;
    // setFile(val);
    // setState("uploading");
    // var form = new FormData();
    // form.append('files[]', val);
    if (val == "") return;
    setProcessing(true);
    setState("uploading");
    setDate((new Date()).toLocaleTimeString());
    axios.get('http://127.0.0.1:5000', {
     responseType: 'blob',
     headers: {
      'Content-type': 'multipart/form-data',
    }
    }).then(response => {
      setFile(response.data)
      setTimeout(() => {
        setState('finished');
      }, 4000)
    })
    .catch(e => {
      setState('input');
    })
    .finally(() => {
      // setProgress(0);
      setTimeout(() => {
        setProcessing(false);
      }, 5000)
    })
  }
  const onRedirecting = () => {
    setState('input');
    setFile(null);
    setLocation("");
  }
  
  return (
    <>
    <div className='bckground-color' />
    <div className="App">
      <div className='header'>
        <div className='header-left'>
          <img src={require('./t.png')} className='icon-logo' alt="logo"/>
          <span className='header-name'>Time Detection</span>
        </div>
        <div className='header-right'>
        <span className='header-name'>Home</span>
        <span className='header-name'>About</span>
        </div>
      </div>
      <div className='container'>
        <div className='title'>
          <img src={require('./vehicle.png')} className='icon-logo' alt="logo"/>
          <span>C??ng c??? d??? ??o??n t???c ???????ng</span>
        </div>
        <div className='description'>
            <span>G???i video giao th??ng c???a con ???????ng, nh???p v??o qu??ng ???????ng v?? t???c ????? c???a xe ????? d??? ??o??n ???????c th???i gian ??i h???t qu??ng ???????ng trong t????ng lai</span>
        </div>
      </div>
      <div className='input-box'>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
          style={{backgroundColor: "rgb(204, 204, 204,0.75)", width: '100%', borderRadius: '5px', display: 'flex'}}
        >
          {/* <TextField 
          id="outlined-basic" 
          inputProps={{ min, max }}
          label="Qu??ng ???????ng (km)" 
          variant="outlined" 
          size="small" 
          type="number"
          value={s}
          onChange={handleChangeS}
          disabled={state != 'input'}/>
          <TextField 
          id="outlined-basic-1" 
          inputProps={{ min, max }}
          label="V???n t???c (km/h)" 
          variant="outlined" 
          size="small" 
          type="number"
          value={v}
          onChange={handleChangeV}
          disabled={state != 'input'}/> */}
          <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">?????a ??i???m</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select_1"
            value={location}
            label="?????n n??i(gi??y)"
            onChange={val => {
              setLocation(val.target.value)
              changeHandler(val.target.value)
            }}
            size='small'
            disabled={state != 'input'}
          >
            {
              ["Xu??n Th???y"].map(item => <MenuItem value={item}>{item}</MenuItem>)
            }
          </Select>
          </FormControl>
          <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">?????n n??i(gi??y)</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={future}
            label="?????n n??i(gi??y)"
            onChange={val => setFuture(val.target.value)}
            size='small'
            disabled={state != 'finished'}
          >
            {
              values.map(item => <MenuItem value={item}>{item}</MenuItem>)
            }
          </Select>
          </FormControl>
        </Box>
      </div>
      <div className='show'>
        <div className="show-box">
          {state == 'input' && <FileInput file={file} changeHandler={changeHandler}/>}
          {state == 'uploading' &&<>
            <LinearProgress variant='determinate' value={progress} color="inherit"/>
            <div className='uploading'>
              <div className="film-image">
                <img src={require("./film.png")} style={{height: "90px"}}/>
              </div>
              <div className="uploading-text">
                <span>{!isProcessing ? '??ang t???i l??n...' : "??ang x??? l??..."}</span>
              </div>
              {isProcessing && <CircularProgress color="inherit" />}
            </div>
          </>}
          {state == 'finished' &&<ResultPage 
          future={future} 
          file={file}
          s={s} 
          v={v}
          onRedirecting={onRedirecting}
          handleOpen={handleOpen}
          date={date}/>
          }
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
