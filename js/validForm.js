export default {
  data() {
    return {
      apiUrl: 'https://vue3-course-api.hexschool.io/',
      path: 'linachen',
      user: {
        email: '',
        name: '',
        tel: '',
        address: ''
      },
      message: ''
    }
  },
  props: ['cartList'],
  methods: {
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value) ? true : '需要正確的電話號碼';
    },
    onSubmit(value, { resetForm }) {
      // 檢視購物車是否為空
      if (this.cartList.length === 0) {
        alert('購物車不得為空');
        return;
      }
      // 送出訂單
      const url = `${this.apiUrl}api/${this.path}/order`;
      axios.post(url, { data: { user: this.user, message: this.message } })
        .then(res => {
          if (res.data.success) {
            alert('訂單送出成功');
            this.$emit('getCart');
          } else {
            alert('訂單送出失敗');
          }
        })
        .catch(err => {
          console.log(err);
        })
      resetForm();
    }
  },
  template: `
      <div class="row d-flex justify-content-center my-5">
        <div class="col-md-8">
          <h3 class="text-center">訂單明細</h3>
          <v-form v-slot="{errors}" @submit="onSubmit">
            <div class="mb-3">
              <label for="name" class="form-label">姓名 <span class="text-danger">(必填)</span></label>
              <v-field type="text" class="form-control" id="name" name="姓名" rules="required" placeholder="請輸入姓名"
                :class="{ 'is-invalid': errors['姓名']}" v-model="user.name"></v-field>
              <error-message name="姓名" class="invalid-feedback"></error-message>
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">E-mail <span class="text-danger">(必填)</span></label>
              <v-field type="email" class="form-control" id="email" name="email" rules="email|required"
                placeholder="請輸入 E-mail" :class="{ 'is-invalid': errors['email']}" v-model="user.email"></v-field>
              <error-message name="email" class="invalid-feedback"></error-message>
            </div>
            <div class="mb-3">
              <label for="phone" class="form-label">電話 <span class="text-danger">(必填)</span></label>
              <v-field type="text" class="form-control" id="phone" name="電話" :rules="isPhone" rules="required"
                placeholder="請輸入電話" :class="{ 'is-invalid': errors['電話']}" v-model="user.tel"></v-field>
              <error-message name="電話" class="invalid-feedback"></error-message>
            </div>
            <div class="mb-3">
              <label for="address" class="form-label">地址 <span class="text-danger">(必填)</span></label>
              <v-field type="text" class="form-control" id="address" name="地址" rules="required" placeholder="請輸入地址"
                :class="{ 'is-invalid': errors['地址']}" v-model="user.address"></v-field>
              <error-message name="地址" class="invalid-feedback"></error-message>
            </div>
            <div class="mb-3">
              <label for="message" class="form-label">留言</label>
              <v-field type="text" class="form-control" id="message" name="message" placeholder="歡迎留言給我們 :D"
                v-model="message"></v-field>
            </div>
            <div class="d-grid gap-2 col-4 mx-auto">
              <button class="btn btn-primary">送出訂單</button>
            </div>
          </v-form>
        </div>
      </div>
      `
}