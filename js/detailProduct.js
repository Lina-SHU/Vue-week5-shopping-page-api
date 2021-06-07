export default{
      data(){
        return {
          tempProduct: {},
          modal: '',
          qty: 1
        } 
      },
      props:['product'],
      template:`
      <div class="modal fade" ref="detailModal" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <!---<div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">{{ tempProduct.title }}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>--->
            <div class="modal-body">
              <div class="row">
                <div class="col-md-4">
                  <img :src="tempProduct.imageUrl" alt="product picture" class="img-fluid" height="200" >
                </div>
                <div class="col-md-8">
                  <h3>{{ tempProduct.title }}</h3>
                  <p class="text-secondary"><del>原價：{{ tempProduct.origin_price }} 元</del></p>
                  <p class="h4 text-danger">優惠價：{{ tempProduct.price }} 元</p>
                  <div class="input-group mb-3">
                    <input type="number" min="0" v-model.number="qty" class="form-control">
                    <button type="button" class="btn btn-primary" @click="$emit('add-cart', tempProduct.id,  qty)">加入購物車</button>
                  </div>
                </div>
              </div> 
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal">關閉</button>
            </div>
          </div>
        </div>
      </div>
      `,
      methods:{
        openModal(){
          this.modal.show();
        },
        hideModal(){
          this.modal.hide();
        }
      },
      watch:{
        product(){
          this.tempProduct = this.product;
        }
      },
      mounted(){
        this.modal = new bootstrap.Modal(this.$refs.detailModal);
      }
    }