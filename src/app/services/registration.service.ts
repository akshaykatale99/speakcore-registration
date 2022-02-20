import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RegistrationFields } from '../models/registration-fields.model';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(
    private http: HttpClient
  ) { }

  registerUser(payload: RegistrationFields){
    return this.http.post<RegistrationFields>(`${environment.serverUrl}/api/registrations`, payload);
  }

}
