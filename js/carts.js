export default {
  data(){
    return{
      apiUrl: 'https://vue3-course-api.hexschool.io/',
      path: 'linachen',
      carts: {},
    }
  },
  props: ['cartList'],
  emits: ['getCart'],
  methods: {
    editCart(item) {
      if (item.qty <= 0) {
        alert('商品數量需大於0');
        item.qty = 1;
        return;
      }
      // 更新購物車數量
      const url = `${this.apiUrl}api/${this.path}/cart/${item.id}`;
      axios.put(url, { "data": { "product_id": item.product.id, "qty": item.qty } })
        .then(res => {
          if (res.data.success) {
            this.$emit('getCart');
          } else {
            alert('更新購物車失敗');
          }
        })
        .catch(err => {
          console.log(err);
        })
    },
    deleteCarts() {
      // 刪除所有購物車商品
      const url = `${this.apiUrl}api/${this.path}/carts`;
      axios.delete(url)
        .then(res => {
          if (res.data.success) {
            alert('刪除購物車所有商品成功');
            this.$emit('getCart');
          } else {
            alert('刪除購物車所有商品失敗');
          }
        })
        .catch(err => {
          console.log(err);
        })
    },
    deleteCartItem(id) {
      // 刪除購物車單一商品
      const url = `${this.apiUrl}api/${this.path}/cart/${id}`;
      axios.delete(url)
        .then(res => {
          if (res.data.success) {
            alert('刪除購物車商品成功');
            this.$emit('getCart');
          } else {
            alert('刪除購物車商品失敗');
          }
        })
        .catch(err => {
          console.log(err);
        })
    }
  },
  watch:{
    cartList(){
      this.carts = this.cartList;
    }
  },
  template: `
  <button class="btn btn-outline-dark" @click="deleteCarts" v-if="carts.length > 1">刪除所有購物車商品</button>
      <h3 class="text-center mt-5">購物車清單</h3>
      <table class="table mt-3">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">商品圖片</th>
            <th scope="col">商品名稱</th>
            <th scope="col">商品數量</th>
            <th scope="col">商品金額</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="carts.length !==0">
            <tr v-for="item in carts.carts" :key="item.id" class="border-bottom">
              <td class="align-middle text-center"><i class="fas fa-times text-danger fa-1x"
                  @click="deleteCartItem(item.id)" style="cursor: pointer;"></i></td>
              <td width="15%">
                <img :src="item.product.imageUrl" class="card-img-top" alt="productimageUrl"
                style="height: 120px; object-fit:cover; background-position: center center;">
              </td>
              <td>{{ item.product.title }}</td>
              <td width="20%">
                <input type="number" min="1" class="form-control" v-model.number="item.qty" @change="editCart(item)">
              </td>
              <td class="text-end">{{ item.product.price * item.qty }}</td>
            </tr>
          </template>
          <tr>
            <td colspan="4" class="text-end fs-5">結帳金額</td>
            <td class="text-end fs-5">{{ carts.final_total}}</td>
          </tr>
        </tbody>
      </table>
  `
}