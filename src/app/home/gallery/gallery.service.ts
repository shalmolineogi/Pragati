import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class GalleryService {
  uri = "http://localhost:3000";

  constructor(private http: HttpClient) {}

  getGalleryPhotos() {
    return this.http.get(`${this.uri}/api/gallery/all`);
  }
}
