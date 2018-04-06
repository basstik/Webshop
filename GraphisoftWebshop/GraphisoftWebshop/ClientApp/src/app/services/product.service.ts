import { Injectable } from "@angular/core";

import { Observable } from "rxjs/Observable";

import { Product } from "../models/Product";
import { NetworkService } from "./network.service";

@Injectable()
export class ProductService {

    private url = '/api/product';

    constructor(private networkService: NetworkService) { }

    public list(): Observable<Product[]> {
        return this.networkService.get<Product[]>(this.url);
    }

    public delete(product: Product): Observable<Product> {
        return this.networkService.delete<Product>(this.url + '/delete/' + product.id);
     }

    public create(product: Product): Observable<Product> {
        return this.networkService.post<Product>(this.url + '/create', JSON.stringify(product));
    }
}
