import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {AvailableTiles, ITilesItem, MapHolderService} from "../../core/map-engine/map-holder.service";

@Component({
    selector: "app-tile-selector",
    templateUrl: "./tile-selector.component.html",
    styleUrls: ["./tile-selector.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TileSelectorComponent implements OnInit {
    public readonly tilesList: ITilesItem[] = [
        {
            name: "OSM",
            value: AvailableTiles.OSM
        },
        {
            name: "Surfer",
            value: AvailableTiles.SURFER
        },
        {
            name: "Water",
            value: AvailableTiles.WATER
        }];


    public fSelectedTiles: ITilesItem = this.tilesList[0];

    constructor(
        private readonly mapHolderService: MapHolderService,
    ) {
    }

    public get selectedTiles(): ITilesItem {
        return this.fSelectedTiles;
    }

    ngOnInit() {
    }

    public selectTilesHandler(tile: AvailableTiles): void {
        this.mapHolderService.changeCurrentTiles(tile);
    }


}
