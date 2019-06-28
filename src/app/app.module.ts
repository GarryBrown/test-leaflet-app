import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {FormsModule} from "@angular/forms";
import {CoreModule} from "./core/core.module";
import {TileSelectorComponent} from "./components/tile-selector/tile-selector.component";

@NgModule({
    declarations: [
        AppComponent,
        TileSelectorComponent,

    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        CoreModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {

    constructor() {
    }


}
