import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'https://openrouter.ai/api/v1/chat/completions';
  private apiKey = environment.OPEN_ROUTER_KEY;
  private referer = 'chatbot';
  private siteTitle = 'bot';

  private http:HttpClient = inject(HttpClient)

  sendMessage(userMessage: string) {
    const body = {
      model: 'mistralai/mistral-7b-instruct',
      messages: [
        {
          role: 'user',
          content: userMessage,
        },
      ],
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`,
      'HTTP-Referer': this.referer,
      'X-Title': this.siteTitle,
    });

    return this.http.post<any>(this.apiUrl, body, { headers }).pipe(
      map((response) => response.choices[0].message.content)
    );
  }
}
