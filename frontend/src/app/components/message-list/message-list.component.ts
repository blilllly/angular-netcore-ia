import { Component, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { Message } from '../../models/message.model';

@Component({
  selector: 'app-message-list',
  imports: [NgClass],
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent {
  messages = input<Message[]>([]);
}
