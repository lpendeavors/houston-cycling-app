import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ProfileProvider } from '../../providers/profile/profile';
import { ProfileModel } from '../../models/profile/profile';

/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage implements OnInit {

  private profile = new ProfileModel();

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public profileProvider: ProfileProvider,
    public toast: ToastController
  ) {  }

  save(): Promise<any> {
    if (Object.keys(this.profile).length === 0) {
      return; // No profile fields to save
    } else {
      this.profileProvider.save(this.profile)
      .then(response => this.confirmSave());
    }
  }

  private confirmSave(): void {
    let confirm = this.toast.create({
      message: 'Profile saved successfully',
      duration: 3000,
      position: 'top'
    });
    confirm.present();
  }

  private getProfile(): void {
    
  }

  ngOnInit(): void {
    // Check for existing profile
    this.profileProvider.getProfile().then(profile => {
      if (profile) this.profile = profile;
    });
  }

}
