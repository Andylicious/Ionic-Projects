import { Component } from '@angular/core';
import {EdmService} from '../../providers/edm-service';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';


@Component({
  selector: 'page-day',
  templateUrl: 'day.html',
   providers:[EdmService]
})
export class DayPage {

dat:any
  public artists = []
  public urls = []
  public times = []
  public locations = []
  public dj_events = []
  loading:any
  constructor(private loadingCtrl: LoadingController,public navCtrl: NavController,private edmService: EdmService) {
 this.loading = loadingCtrl.create({
    content: 'Fetching and Parsing Event Data...'
  });
  this.loading.present()
    console.log("Running EDM Service..")
     this.edmService.searchEdm("http://electronic.vegas/las-vegas-edm-dayclub-pool-party-dj-calendar/").subscribe(
        data => this.update_edm_table(data)
      )
    
  }

  update_edm_table(edm_list){
    
    console.log("Updating edm table..")
    var html_lines = edm_list.split('\n')
    for (var i in html_lines){
      if (html_lines[i].indexOf("wideeventTitle") !=-1){
        var artist = html_lines[i].substring(html_lines[i].lastIndexOf("prop='name'>")+1,html_lines[i].lastIndexOf("</span")).replace("rop='name'>","")
        var url = html_lines[i].substring(html_lines[i].lastIndexOf("href='")+1,html_lines[i].lastIndexOf("itemprop='url'>")).replace("ref=","").replace("'","")
        this.urls.push(url)
        this.artists.push(artist)
       // console.log("Line: " + html_lines[i])
      }
      if (html_lines[i].indexOf("wideeventDate")!=-1){
        var time = html_lines[i].substring(html_lines[i].lastIndexOf("wideeventDate'>")+1,html_lines[i].lastIndexOf("<meta")).replace("ideeventDate'>","")
        this.times.push(time)
      }
      if (html_lines[i].indexOf("wideeventVenue")!=-1){
        var location = html_lines[i].substring(html_lines[i].lastIndexOf("itemprop='name'>")+1,html_lines[i].lastIndexOf("</span>")).replace("temprop='name'>","")
        this.locations.push(location)
      }
    }

    for (let i=0; i< this.artists.length;i++){
      var dj_event = [this.artists[i],this.urls[i],this.times[i],this.locations[i]]
      this.dj_events.push(dj_event)
    }
    console.log(this.dj_events)
    this.loading.dismiss()  
  }
}
