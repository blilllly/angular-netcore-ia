import { Component, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-message-input',
  imports: [ReactiveFormsModule],
  templateUrl: './message-input.component.html',
  styleUrl: './message-input.component.css'
})
export class MessageInputComponent {
  messageSent = output<string>();
  loading = input<boolean>(false);

  private fb = inject(FormBuilder);

  form = this.fb.group({
    message: ['', [Validators.required, Validators.minLength(1)]]
  });

  submit(): void {
    if (this.form.invalid || this.loading()) return;
    this.messageSent.emit(this.form.value.message!.trim());
    this.form.reset();
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.submit();
    }
  }
}
