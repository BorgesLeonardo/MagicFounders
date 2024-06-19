<template>
  <div class="support-popup">
    <div class="popup-content">
      <h3 class="text-center">Apoiar Projeto</h3>
      <input type="number" v-model="amount" @input="validateAmount" placeholder="Digite o valor" class="form-control my-3 no-arrows" />
      <div class="text-center">
        <button class="btn btn-primary my-2 mr-2" @click="generateQRCode" :disabled="!amount || isGenerating">Gerar QR Code</button>
        <button class="btn btn-secondary my-2 ml-2" @click="$emit('close')">Voltar</button>
      </div>
      <div v-if="qrCodeImage" class="text-center mt-3">
        <img :src="qrCodeImage" alt="QR Code" class="img-fluid mb-3" />
        <button class="btn btn-success my-2" @click="confirmSupport">Confirmar Pagamento</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    projectId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      amount: 0,
      qrCodeImage: null,
      isGenerating: false
    };
  },
  methods: {
    async generateQRCode() {
      console.log('Gerando QR Code...');
      this.isGenerating = true;
      try {
        const response = await this.$http.post('/api/projects/support', {
          projectId: this.projectId,
          amount: this.amount
        });
        console.log('Resposta do servidor:', response.data);
        this.qrCodeImage = response.data.qrCodeImage;
      } catch (error) {
        console.error('Erro ao gerar QR Code', error);
      } finally {
        this.isGenerating = false;
      }
    },
    async confirmSupport() {
      try {
        await this.$http.post('/api/projects/confirm-support', {
          projectId: this.projectId,
          amount: this.amount
        });
        alert('Apoio confirmado com sucesso!');
        this.$emit('update-project');
      } catch (error) {
        console.error('Erro ao confirmar apoio', error);
      }
    },
    validateAmount() {
      if (this.amount < 0) {
        this.amount = 0;
      }
    }
  }
};
</script>

<style scoped>
.support-popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1050;
}

.popup-content {
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  width: 400px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-control {
  border-radius: 20px;
  padding: 10px;
  font-size: 1.1em;
}

.form-control.no-arrows::-webkit-outer-spin-button,
.form-control.no-arrows::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.form-control.no-arrows {
  -moz-appearance: textfield;
}

.btn-primary {
  background-color: #5bc0de;
  border-color: #5bc0de;
}

.btn-primary:hover {
  background-color: #31b0d5;
  border-color: #31b0d5;
}

.btn-secondary {
  background-color: #6c757d;
  border-color: #6c757d;
}

.btn-secondary:hover {
  background-color: #5a6268;
  border-color: #545b62;
}

.btn-success {
  background-color: #28a745;
  border-color: #28a745;
}

.btn-success:hover {
  background-color: #218838;
  border-color: #1e7e34;
}

.img-fluid {
  max-width: 100%;
  height: auto;
  border: 2px solid #17a2b8;
  border-radius: 10px;
  padding: 10px;
  background-color: #fff;
}

.text-center {
  text-align: center;
}

.mt-3 {
  margin-top: 1rem;
}

.mb-3 {
  margin-bottom: 1rem;
}

.mb-4 {
  margin-bottom: 1.5rem;
}

.mr-2 {
  margin-right: 0.5rem;
}

.ml-2 {
  margin-left: 0.5rem;
}
</style>
