<template>
  <div class="support-popup">
    <div class="popup-content">
      <h3>Apoiar Projeto</h3>
      <input type="number" v-model="amount" placeholder="Digite o valor" />
      <button class="btn btn-primary" @click="generateQRCode">Gerar QR Code</button>
      <button class="btn btn-secondary" @click="$emit('close')">Voltar</button>
      <div v-if="qrCodeImage" class="qr-code">
        <img :src="qrCodeImage" alt="QR Code">
        <button class="btn btn-success" @click="confirmSupport">Confirmar Pagamento</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      amount: '',
      qrCodeImage: ''
    };
  },
  methods: {
    async generateQRCode() {
      try {
        const response = await axios.post('http://localhost:5000/api/projects/support', {
          projectId: this.$route.params.id,
          amount: this.amount
        }, {
          headers: {
            'x-auth-token': localStorage.getItem('token')
          }
        });
        this.qrCodeImage = response.data.qrCodeImage;
      } catch (error) {
        console.error('Erro ao gerar QR Code:', error);
      }
    },
    async confirmSupport() {
      try {
        const response = await axios.post('http://localhost:5000/api/projects/confirm-support', {
          projectId: this.$route.params.id,
          amount: this.amount
        }, {
          headers: {
            'x-auth-token': localStorage.getItem('token')
          }
        });
        this.$emit('update-project', response.data);
        this.$emit('close');
      } catch (error) {
        console.error('Erro ao confirmar apoio:', error);
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
}

.popup-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}

input[type="number"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.qr-code {
  margin-top: 20px;
}

button {
  margin-top: 10px;
}
</style>
