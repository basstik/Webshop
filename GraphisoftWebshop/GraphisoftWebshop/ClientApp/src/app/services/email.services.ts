import { Product } from '../models/Product';
import { ApiResponse } from '../interfaces/apiresponse';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { NetworkService } from './network.service';

@Injectable()
export class EmailService {

    private url = '/api/email';

    constructor(private networkService: NetworkService) { }

    public authenticateEmail(email: string): Observable<boolean> {
        return this.networkService.post(this.url, { "email": email });
    }
}
