import { Component, Input,OnInit, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';

import { TrafficList } from '../../../../@core/data/traffic-list';

import {SocketService} from '../../../../services/socket.service'
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'ngx-traffic-front-card',
  styleUrls: ['./traffic-front-card.component.scss'],
  templateUrl: './traffic-front-card.component.html',
})
export class TrafficFrontCardComponent implements OnInit, OnDestroy {


  private alive = true;

  @Input() frontCardData: TrafficList;

  currentTheme: string;
  message: string;
  messages: any = [];

  constructor(private themeService: NbThemeService, private socket:SocketService) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.currentTheme = theme.name;
    });
  }

  status(state){
    if(state == 1)
    {
      return 'Online';
    }
    else
    {
      return 'Offline';
    }
  }

  ngOnInit() {
    this.socket
      .getMessages()
      .subscribe((message: string) => {
        if(message != '')
        {
          this.messages = JSON.parse(message);
        }
      });
    
  }
  

  ngOnDestroy() {
    this.alive = false;
  }
}
