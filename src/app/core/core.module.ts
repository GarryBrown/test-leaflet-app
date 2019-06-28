import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {MapHolderService} from "./map-engine/map-holder.service";
import {RegionsHolderService} from "./map-engine/regions-holder.service";
import {DataReceiverService} from "./data-receiver/data-receiver.service";
import {DataReceiverImplService} from "./data-receiver/data-receiver-impl.service";
import {NotificationService} from "./notification.service";

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule
    ],
    providers: [
        {provide: DataReceiverService, useClass: DataReceiverImplService},
        MapHolderService,
        NotificationService,
        RegionsHolderService,
    ],
})
export class CoreModule {

    constructor() {
    }


}
