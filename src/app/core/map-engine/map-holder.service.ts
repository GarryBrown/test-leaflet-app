import {Injectable} from "@angular/core";

import * as L from "leaflet";
import {Layer, Map} from "leaflet";
import {Observable, Subject} from "rxjs";

@Injectable({
    providedIn: "root"
})
export class MapHolderService { // TODO: add interface
    public whenMaInitialized: Subject<Map> = new Subject<Map>();
    private mapInstance: Map;
    private currentTileLayer: Layer;

    constructor() {
    }

    public get map(): Map {
        return this.mapInstance;
    }


    // TODO: pass config
    public init(id: string, tilesToSet: AvailableTiles = AvailableTiles.OSM): Observable<void> {
        return new Observable((subscriber) => {
            try {
                const container = document.getElementById(id);
                const map = L.map(container).setView([51.505, -0.09], 13);
                const osm = new L.TileLayer(tilesToSet);
                map.setView(new L.LatLng(
                    59.2111037, 8.6122837
                ), 3);
                this.currentTileLayer = osm;
                map.addLayer(osm);
                this.mapInstance = map;
                subscriber.next();
                subscriber.complete();
                this.whenMaInitialized.next(map);
            } catch (e) {
                subscriber.error(e);
            }

        });
    }

    public changeCurrentTiles(tile: AvailableTiles): void {
        if (this.mapInstance.hasLayer(this.currentTileLayer)) {
            this.mapInstance.removeLayer(this.currentTileLayer);
        }
        const newLayer = new L.TileLayer(tile);
        this.mapInstance.addLayer(newLayer);
        this.currentTileLayer = newLayer;

    }

}

// Right way: hold full options through interfaces
export enum AvailableTiles {
    OSM = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    SURFER = "https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png",
    WATER = "https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg",
}

export interface ITilesItem {
    name: string;
    value: AvailableTiles;
}


