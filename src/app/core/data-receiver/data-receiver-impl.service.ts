import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DataReceiverService} from "./data-receiver.service";

@Injectable({
    providedIn: "root"
})
export class DataReceiverImplService extends DataReceiverService {

    constructor(
        private readonly httpClient: HttpClient
    ) {
        super();
    }

    public getData<T>(url): Observable<T> {
        return this.httpClient.get<T>(url);
    }
}


