import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-verify-code',
  templateUrl: './verify-code.page.html',
  styleUrls: ['./verify-code.page.scss'],
})
export class VerifyCodePage implements OnInit {
  codigo: string = '';

  constructor(private router: Router) {}

  ngOnInit() {}

  moveToNext(event: Event) {
    const el = event.target as HTMLInputElement;

    if (el.value.length === el.maxLength) {
      const next = el.nextElementSibling as HTMLElement | null;
      if (next && next.tagName === 'INPUT') {
        (next as HTMLInputElement).focus();
      }
    }

    if ((event as InputEvent).inputType === 'deleteContentBackward') {
      const prev = el.previousElementSibling as HTMLElement | null;
      if (prev && prev.tagName === 'INPUT') {
        (prev as HTMLInputElement).focus();
      }
    }
  }

  verificar() {
    const inputs = document.querySelectorAll('input[name="pin"]');
    const valores: string[] = [];

    inputs.forEach((input: any) => {
      valores.push(input.value);
    });

    this.codigo = valores.join('');

    if(this.codigo.length === 6){
      this.router.navigate(['/reset-password'])
    }else{
      alert('deu ruim'+ this.codigo.toString())
    }
  }
}
