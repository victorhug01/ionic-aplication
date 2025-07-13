import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../services/product.service';
import { ToastController } from '@ionic/angular';
import { LoadingService } from '../services/loading.service';

@Component({
  standalone: false,
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  codigo = '';
  nome = '';
  tempoGarantia: number = 0;
  status = false;

  constructor(private produtoService: ProdutoService, private toastCtrl: ToastController, private loadingService: LoadingService) {}

  ngOnInit() {}

  async salvar() {

    if (!this.codigo.trim()) {
      this.showToast('Digite o código', 'danger');
      return;
    }

    if (!this.nome.trim()) {
      this.showToast('Digite o nome', 'danger');
      return;
    }

    if (this.tempoGarantia === null) {
      this.showToast('Digite o tempo de garantia', 'danger');
      return;
    }

    await this.loadingService.show();

    const { error } = await this.produtoService.cadastrar({
      codigo: this.codigo,
      nome: this.nome,
      tempo_garantia: this.tempoGarantia,
      status: this.status,
    });

    await this.loadingService.hide();

    if(error){
      this.showToast('Erro ao cadastrar produto', 'danger');
    }else{
      this.codigo = '';
      this.nome = '';
      this.tempoGarantia = 0;
      this.status = false
      this.showToast('produto cadastrado com sucesso!', 'success');
    }

  }

  async showToast(message: string, color: String | null) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      position: 'top',
      color: color?.trim() ?? 'danger',
    });
    await toast.present();
  }

}
