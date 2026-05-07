import { Component, inject, signal } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Message } from '../../models/message.model';
import { MessageListComponent } from '../message-list/message-list.component';
import { MessageInputComponent } from '../message-input/message-input.component';

@Component({
  selector: 'app-chat',
  imports: [MessageListComponent, MessageInputComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  private chatService = inject(ChatService);

  messages = signal<Message[]>([]);
  loading = signal(false);

  sendMessage(text: string): void {
    this.messages.update(msgs => [...msgs, { role: 'user', content: text }]);
    this.loading.set(true);

    this.chatService.sendMessage(text).subscribe({
      next: (res) => {
        this.messages.update(msgs => [...msgs, { role: 'assistant', content: res.reply }]);
        this.loading.set(false);
      },
      error: () => {
        this.messages.update(msgs => [...msgs, { role: 'assistant', content: 'Error al conectar con el servidor.' }]);
        this.loading.set(false);
      }
    });
  }
}
