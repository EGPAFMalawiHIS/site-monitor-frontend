/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NbPasswordAuthStrategy, NbAuthModule,NbAuthJWTToken } from '@nebular/auth';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import {SocketService} from './services/socket.service';



import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';

//const config: SocketIoConfig = { url: 'http://localhost:5001', options: {} };

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,

    ThemeModule.forRoot(),

    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'GOOGLEMAPKEY',
    }),
    CoreModule.forRoot(),
    NbAuthModule.forRoot({
         strategies: [
           NbPasswordAuthStrategy.setup({
             name: 'login',

             token: {
               class: NbAuthJWTToken,
               key: 'token',
             },


             baseEndpoint: 'http://127.0.0.1:8001',
              login: {
                // ...
                endpoint: '/auth/jwt/create/',
                method: 'post',
                redirect: {
                 success: '/pages/dashboard',
                 failure: null, // stay on the same page
               },
              },
              register: {
                // ...
                endpoint: '/auth/users/create/',
                method: 'post',
              },
              logout: {
                endpoint: '/auth/token/destroy/',
                method: 'post',
              },
           }),
         ],
         forms: {
           login: {
                  redirectDelay: 500, // delay before redirect after a successful login, while success message is shown to the user
                  strategy: 'email',  // strategy id key.
                  rememberMe: true,   // whether to show or not the `rememberMe` checkbox
                  showMessages: {     // show/not show success/error messages
                    success: true,
                    error: true,
                  },
                  //socialLinks: socialLinks, // social links at the bottom of a page
            }
            
         },
       }),
    

   // SocketIoModule.forRoot(config) 
  ],
   providers: [SocketService,],
  bootstrap: [AppComponent],
})
export class AppModule {
}
