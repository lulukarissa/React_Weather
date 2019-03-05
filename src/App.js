import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import Konten from './komponen/Konten'
import Loading from './komponen/Loading'

class App extends Component {
  
  state = {
    kota: '', 
    cuaca: ''
  }

  render() {
    let cari = () => {
      var apikey = '8e6a453d1d3f39ec1324d4f7fff2bc62' //https://home.openweathermap.org/api_keys ==== login first
      var url = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.kota}&APPID=${apikey}`
      axios.get(url)
      .then((z)=>{
        console.log(z.data)
        this.setState({cuaca: z.data})
      })
      .catch((z)=>{
        console.log(z)
        this.setState({cuaca: 'error'})
      })
    }
    return (
      <div className="App">
        <header className="pt-3 App-header">
          <p><span role='img' aria-label='cuaca'>⛅ </span> 
            Today's Weather</p>
        </header>

        <center>
          <div className='input-group my-3 w-50'>
            <input ref='kota' type='text' className='form-control'
            placeholder='Input city...'
            onInput={()=>{
              this.setState({kota: this.refs.kota.value})}
            }/>
            <div className='input-group-append'>
              <button onClick={cari} 
              className='btn btn-info'>Search</button>
            </div>
          </div>
        
        {this.state.cuaca ?
          ( this.state.cuaca === 'error'
          ? <Loading />
          : <Konten data={this.state.cuaca}/>
          )
        : <p>Please input city name...</p>
        }

        </center>
      </div>
    );
  }
}

export default App;