import { Component, Input } from "@angular/core";
import { data } from "./file-explorer.constant";

@Component({
    selector    : 'app-file-explorer',
    templateUrl : './file-explorer.component.html',
    styleUrls   : ['./file-explorer.component.scss']
})
export class FileExplorerComponent {
    @Input()
    datax!: Array<any>

    items: any = [];

    ngOnInit() {
       this.items = this.datax ? this.datax :  data;
    }
}