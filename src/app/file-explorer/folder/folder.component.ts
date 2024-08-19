import { Component, Input, OnInit } from '@angular/core';
import { Folder } from './folder.model';


@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss']
})
export class FolderComponent implements OnInit {
  @Input()
  folder: any

  @Input() 
  folderId!: number

  @Input()
  opened: boolean = false;

  creatingNewFolder = false;

  constructor() { }

  ngOnInit(): void {
   
  }

  openFolder(currentFolderId: number) {
    this.opened = this.folderId === currentFolderId;
    console.log(this.opened);

   this.folder = this.folder.child;
  }

  addNewFolder(e: any) {
    e.preventDefault();
    this.creatingNewFolder = true;
    const folder = new Folder('Test');
  }

}
