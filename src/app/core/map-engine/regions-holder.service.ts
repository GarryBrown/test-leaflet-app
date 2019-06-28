import {Injectable} from "@angular/core";
import {MapHolderService} from "./map-holder.service";
import {DataReceiverService} from "../data-receiver/data-receiver.service";
import * as L from "leaflet";
import {FeatureGroup, LatLngTuple, LeafletMouseEvent, Polygon} from "leaflet";
import {Observable, Subscription} from "rxjs";
import {NotificationService} from "../notification.service";

@Injectable({
    providedIn: "root"
})
export class RegionsHolderService {
    private readonly regionHolder: Map<string, IRegionItem> = new Map();
    private readonly regionPolygonHolder: Map<Polygon, string> = new Map();
    private readonly baseUrl: string = "assets/"; // RIGHTWAY: get it from env of config token
    private map: L.Map;
    private regionsList: string[] = ["germany", "sea", "norge"];
    private regionLayerGroup: FeatureGroup = new L.FeatureGroup();

    constructor(
        mapHolderService: MapHolderService,
        private readonly dataReceiver: DataReceiverService,
        private readonly notificationService: NotificationService
    ) {
        mapHolderService.whenMaInitialized.subscribe((map) => {
            map.addLayer(this.regionLayerGroup);
            this.map = map;
            // Add only one listener, not on every polygon
            this.regionLayerGroup.addEventListener("click", (e: IFeaturedGroupEvent) => {
                this.polygonClickHandler(e.layer);

            });
        });
    }

    // TODO make async
    public addRegion(name: string) {
        if (this.regionHolder.has(name)) {
            const region = this.regionHolder.get(name);
            const polygon = L.polygon(region.coordinates, {color: region.color});
            this.regionPolygonHolder.set(polygon, name);
            this.regionLayerGroup.addLayer(polygon);
        }

    }

    // It can be handled in variety ways (actually by rxjs fn and pipes)
    public init(): Observable<string[]> {
        return new Observable((subscriber) => {
            let counter = 0;
            const checkerFn = () => {
                if (counter === this.regionsList.length) {
                    subscriber.next(Array.from(this.regionHolder.keys()));
                    subscriber.complete();
                }
            };
            for (let i = 0; i < this.regionsList.length; i++) {
                const regName = this.regionsList[i];
                const sub: Subscription = this.dataReceiver.getData<any>(this.buildUrl(regName)).subscribe(
                    (data) => {
                        this.onSuccess(data, regName, sub);
                        counter++;
                        checkerFn();
                    },
                    (error) => {
                        this.onError(error, sub);
                        subscriber.error();
                        subscriber.complete();
                    }
                );
            }
        });


    }

    private polygonClickHandler(p: Polygon): void {
        if (this.regionPolygonHolder.has(p)) {
            const name = this.regionPolygonHolder.get(p);
            const region = this.regionHolder.get(name);
            this.notificationService.notify(region.data);
        }
    }

    private onSuccess(res: IRegionItem, regName: string, sub: Subscription): void {
        sub.unsubscribe();
        this.saveRegion(regName, res);
    }

    private onError(error: any, sub: Subscription): void {
        sub.unsubscribe();
        console.error(error);
        // TODO: call notification service to show  to user an error occurred
        // prevent waterfall of error because of we call cycle of regions array
    }

    private saveRegion(regName: string, coordinates: IRegionItem): void {
        this.regionHolder.set(regName, coordinates);
    }

    private buildUrl(region: string): string {
        return `${this.baseUrl}${region}.json`;
    }
}

interface IRegionItem {
    coordinates: LatLngTuple[];
    color: string;
    data: string;
}

interface IFeaturedGroupEvent extends LeafletMouseEvent {
    layer: Polygon;
}
