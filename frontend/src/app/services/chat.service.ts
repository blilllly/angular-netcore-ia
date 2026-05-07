import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from '../models/message.model';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:5105/api/chat';

  sendMessage(message: string): Observable<{ reply: string }> {
    return this.http.post<{ reply: string }>(this.apiUrl, { message });
  }
}
