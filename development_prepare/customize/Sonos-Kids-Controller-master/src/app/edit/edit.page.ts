import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { MediaService } from '../media.service';
import { Media } from '../media';
import muPiBoxNetwork from '../../assets/json/network.json';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  media: Media[] = [];

  public ip = muPiBoxNetwork.ip;
  public host = muPiBoxNetwork.hostname;

  constructor(
    private mediaService: MediaService,
    public alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
    // Subscribe
    this.mediaService.getRawMediaObservable().subscribe(media => {
      this.media = media;
    });

    // Retreive data through subscription above
    this.mediaService.updateRawMedia();
  }

  async deleteButtonPressed(index: number) {
    const alert = await this.alertController.create({
      cssClass: 'alert',
      header: 'Warning',
      message: 'Do you want to delete the selected item from your library?',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.mediaService.deleteRawMediaAtIndex(index);
          }
        },
        {
          text: 'Cancel'
        }
      ]
    });

    await alert.present();
  }

  addButtonPressed() {
    this.router.navigate(['/add']);
  }

  adminButtonPressed() {
    this.router.navigate(['/admin']);
  }
}
