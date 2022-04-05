import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CloudService {
  constructor(private httpClient: HttpClient){}

  getFiles() {
    return this.httpClient.get("/assets/tracks-data.json");
  }
}