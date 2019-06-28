import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable({
    providedIn: "root"
})
export abstract class DataReceiverService {

    protected constructor() {
    }


    public abstract getData<T>(url): Observable<T>;
}


