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

    // Get a list of products based on authorId
    getProducts(authorId: string): any {
        const headers = new HttpHeaders({
            'authorId': authorId
        });

        return this.http.get(allApiPaths.URL_PRODUCTS, { headers });
    }
    // Add a new product with authorId and form data
    addProducts(authorId: string, form: any): any {
        const headers = new HttpHeaders({
            'authorId': authorId
        });

        return this.http.post(allApiPaths.URL_ADD_PRODUCTS, form, { headers });
    }
    // Edit an existing product with authorId and form data
    editProducts(authorId: string, form: any): any {
        const headers = new HttpHeaders({
            'authorId': authorId
        });

        return this.http.put(allApiPaths.URL_UPDATE_PRODUCTS, form, { headers });
    }
    // Delete a product based on authorId and id
    deleteProducts(authorId: string, id: any): any {
        const headers = new HttpHeaders({
            'authorId': authorId
        });

        return this.http.delete(allApiPaths.URL_DELETE_PRODUCTS + id, { headers });
    }

}
