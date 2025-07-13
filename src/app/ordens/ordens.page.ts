import { Component, OnInit } from '@angular/core';
import { OrdemService } from '../services/ordem.service';
import { ProdutoService } from '../services/product.service';
import { ToastController } from '@ionic/angular';
import { LoadingService } from '../services/loading.service';

@Component({
  standalone: false,
  selector: 'app-ordens',
  templateUrl: './ordens.page.html',
  styleUrls: ['./ordens.page.scss'],
})
export class OrdensPage implements OnInit {
  numero = '';
  dataAbertura = '';
  nomeConsumidor = '';
  cpf = '';
  defeito = '';
  solucao = '';
  produtoSelecionado = '';
  produtos: any[] = [];

  constructor(private ordemService: OrdemService, private produtoService: ProdutoService, private toastCtrl: ToastController, private loadingService: LoadingService) { }

  async ngOnInit() {
    const { data } = await this.produtoService.listar();
    this.produtos = data || [];
  }


  async salvar() {

    if (!this.numero.trim() || !this.dataAbertura.trim() || !this.nomeConsumidor.trim() || !this.cpf.trim() || !this.defeito.trim() || !this.produtoSelecionado.trim()) {
      this.showToast('Campos em branco', 'danger');
      return;
    }

    const { error } = await this.ordemService.cadastrar({
      numero_ordem: this.numero,
      data_abertura: this.dataAbertura,
      nome_consumidor: this.nomeConsumidor,
      cpf_consumidor: this.cpf,
      defeito_reclamado: this.defeito,
      solucao_tecnico: this.solucao,
      produto_id: this.produtoSelecionado,
    });

    if(error){
      this.showToast('Erro ao cadastrar', 'danger');
    }else{
      this.numero = '';
      this.dataAbertura = '';
      this.nomeConsumidor = '';
      this.cpf = '';
      this.defeito = '';
      this.solucao = '';
      this.produtoSelecionado = '';
      this.showToast('Cadastro realizado com sucesso!', 'success');
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
