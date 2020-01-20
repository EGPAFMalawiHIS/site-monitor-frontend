import { Component, OnInit, OnDestroy } from '@angular/core';
import {SocketService} from '../../services/socket.service'
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'ngx-ecommerce',
  templateUrl: './e-commerce.component.html',
})
export class ECommerceComponent implements OnInit, OnDestroy {
	cha:any;
	i:any=0;
	message: string;
  	messages: any;
	constructor(private socket:SocketService){

		
	}

	ngOnInit() {
		/*this.socket
      .getMessages()
      .subscribe((message: string) => {
        this.messages = message;
      });*/
    
  }
  test(){
  	this.i = this.i + 1;
  	this.message = "charlie maere "+ this.i;
  	 this.socket.sendMessage(this.message);
    this.message = '';
  	
  }

	ngOnDestroy() {
   
  }
}
