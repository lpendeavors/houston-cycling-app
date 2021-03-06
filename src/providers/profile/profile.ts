import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { ProfileModel } from '../../models/profile/profile';

import 'rxjs/add/operator/toPromise';

/*
  Generated class for the ProfileProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ProfileProvider {

  private apiUrl = 'http://cycle-hou.larryeparks.com/api/profiles/';

  constructor(
    public http: Http,
    public storage: Storage
  ) {}

  public save(profile: ProfileModel) {
    return this.http
                .post(this.apiUrl, profile)
                .toPromise()
                .then(response => {
                  // Save to device
                  let prof = response.json() as ProfileModel;
                  this.saveLocal(prof);
                })
                .catch(this.handleError);
  }

  private saveLocal(profile: ProfileModel): Promise<ProfileModel> {
    return new Promise((resolve, reject) => {
      this.storage.ready().then(() => {
        this.storage.set('profile', profile);
        return resolve(profile as ProfileModel);
      });
    });
  }

  public getProfile(): Promise<ProfileModel> {
    return new Promise((resolve, reject) => {
      this.storage.get('profile').then(profile => {
        return resolve(profile as ProfileModel);
      });
    });
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }

}
