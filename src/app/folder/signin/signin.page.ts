import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage {
  profileForm = new FormGroup({
    nickname: new FormControl(''),
    phone: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(
    private authService: AuthService,
    public toastController: ToastController
  ) {}

  async presentToast(message: string, color: 'success' | 'danger' = 'success') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
    });
    toast.present();
  }

  async signup() {
    try {
      await this.authService.signin(this.profileForm.value);
      this.presentToast('Signin successfull');
    } catch ({ error: { errors } }) {
      console.log('err:', errors);
      this.presentToast((errors && errors[0].msg) || 'generic error', 'danger');
    }
  }
}
