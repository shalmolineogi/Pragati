import { Component, OnInit } from "@angular/core";
import { Gallery } from "./gallery.model";
import { GalleryService } from "./gallery.service";

@Component({
  selector: "app-gallery",
  templateUrl: "./gallery.page.html",
  styleUrls: ["./gallery.page.scss"],
})
export class GalleryPage implements OnInit {
  picList: Gallery[];
  constructor(private galleryServ: GalleryService) {}

  ngOnInit() {
    this.fetchPhotos();
  }

  fetchPhotos() {
    this.galleryServ.getGalleryPhotos().subscribe((photos: Gallery[]) => {
      console.log(photos);
      this.picList = photos;
    });
  }
}
