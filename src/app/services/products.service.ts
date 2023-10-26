import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { allApiPaths } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class ProductsService {
    constructor(
        public http: HttpClient
    ) { }


    getProducts(authorId: string): any {
        const headers = new HttpHeaders({
            'authorId': authorId
        });

        return this.http.get(allApiPaths.URL_PRODUCTS, { headers });
    }

    addProducts(authorId: string, form: any): any {
        const headers = new HttpHeaders({
            'authorId': authorId
        });

        return this.http.post(allApiPaths.URL_ADD_PRODUCTS, form, { headers });
    }
    editProducts(authorId: string, form: any): any {
        const headers = new HttpHeaders({
            'authorId': authorId
        });

        return this.http.put(allApiPaths.URL_UPDATE_PRODUCTS, form, { headers });
    }

    deleteProducts(authorId: string, id: any): any {
        const headers = new HttpHeaders({
            'authorId': authorId
        });

        return this.http.delete(allApiPaths.URL_DELETE_PRODUCTS+id, { headers });
    }

}
