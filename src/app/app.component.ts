import {Component, OnInit} from "@angular/core";
import {MapHolderService} from "./core/map-engine/map-holder.service";
import {RegionsHolderService} from "./core/map-engine/regions-holder.service";


@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {

    constructor(
        private readonly mapHolderService: MapHolderService,
        private readonly regionsHolderService: RegionsHolderService
    ) {

    }


    ngOnInit(): void {
        this.mapHolderService.init("mapid").subscribe(
            this.whenMapInitiated.bind(this)
        );
    }


    public whenMapInitiated(): void {
        this.regionsHolderService.init().subscribe(
            (regionList: string[]) => {
                for (let i = 0; i < regionList.length; i++) {
                    this.regionsHolderService.addRegion(regionList[i]);
                }
            },
            err => console.error(err)
        );
    }

}


