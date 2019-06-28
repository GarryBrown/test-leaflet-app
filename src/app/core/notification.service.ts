import {Injectable} from "@angular/core";

import * as UIkit from "uikit";

@Injectable({
    providedIn: "root"
})
export class NotificationService {

    constructor() {
    }

    public notify(msg: string): void {
        UIkit.notification({
            message: msg,
            status: "primary",
            pos: "bottom-right",
            timeout: 5000
        });
    }
}
