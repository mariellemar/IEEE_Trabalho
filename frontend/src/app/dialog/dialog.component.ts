import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'feedback-dialog',
  imports: [CommonModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})

export class Dialog {
  @Input() show = true;
  @Input() title = "Atenção";
  @Input() message = "Mensagem";
  @Input() type: "confirm" | "alert" = "alert";

  @Output() confirm = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();


  onConfirm() {
    this.confirm.emit();
    this.show = false;
  }

  onClose() {
    this.close.emit();
    this.show = false;
  }
}
