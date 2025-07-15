import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'https://openrouter.ai/api/v1/chat/completions';
  private apiKey = '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';
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
