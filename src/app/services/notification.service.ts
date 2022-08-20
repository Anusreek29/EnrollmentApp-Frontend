import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }

  showInfo(message: string) {
    this.toastr.info(message);
  }

  showDanger(message: string) {
    this.toastr.info(message);
  }
 
}
