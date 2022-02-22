import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  profileForm = new FormGroup({
    nickname: new FormControl(''),
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

  async login() {
    try {
      const { accessToken } = await this.authService.login(
        this.profileForm.value
      );
      this.presentToast('Signin successfull: ' + accessToken);
    } catch ({ error: { errors } }) {
      console.log('err:', errors);
      this.presentToast((errors && errors[0].msg) || 'generic error', 'danger');
    }
  }
}
