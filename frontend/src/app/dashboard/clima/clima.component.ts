import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-clima',
  templateUrl: './clima.component.html',
  styleUrls: ['./clima.component.css']
})
export class ClimaComponent implements OnInit {

  paises: string[] = ['Mexico', 'Alemania', 'Francia']
  banderas: string[] = ['../../assets/banderas/mexico.png', '../../assets/banderas/alemania.png', '../../assets/banderas/francia.png']

  mx: string[] = ["America/Mexico_City", "America/Cancun", "America/Merida", "America/Matamoros", "America/Monterrey", "America/Tijuana"]
  fr: string[] = ["Europe/Paris"]
  al: string[] = ["Europe/Berlin"]

  zonas: string[] = []
  clima: any
  capital: any
  hora: any


  async ngOnInit(): Promise<void> {
    this.obtenerClima('Mexico')
  }

  async obtenerClima(pais: string): Promise<void> {

    const pais_eng = pais == 'Mexico' ? 'mexico' : pais == 'Alemania' ? 'germany' : 'france'

    try {
      const params = {
        key: environment.weatherApiKey,
        q: pais_eng
      }

      const response = await axios.get('http://api.weatherapi.com/v1//current.json', { params });

      this.zonas = pais_eng == 'mexico' ? this.mx : pais_eng == 'germany' ? this.al : this.fr
      this.obtenerHora(this.zonas[0])
      this.clima = response.data.current
      this.capital = response.data.location
      console.log(JSON.stringify(response.data));
      return response.data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  async obtenerHora(zona: string): Promise<void> {
    try {
      const response = await axios.get(`http://worldtimeapi.org/api/timezone/${zona}`)
      console.log(JSON.stringify(response.data));
      const datetime = new Date(response.data.datetime);
      console.log(datetime)
      const formattedDate = formatDate(datetime, 'dd/MM/yyyy hh:mm:ss a', 'en-US', response.data.utc_offset);
      this.hora = { fecha: formattedDate, zona }
      console.log(formattedDate)

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
}
