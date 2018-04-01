import { HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpObserve } from '@angular/common/http/src/client';

export interface HttpOptions {
  headers ?: HttpHeaders | {
    [header: string]: string | string[];
  };
  observe?: HttpObserve;
  params ?: HttpParams | {
    [param: string]: string | string[];
  };
  reportProgress?: boolean;
  responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
  withCredentials?: boolean;
}
