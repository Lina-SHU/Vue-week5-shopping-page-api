export default{
  props: ['pagination'],
  template:`
  <nav class="d-flex justify-content-center" >
    <ul class="pagination">
      <li class="page-item" :class="{'disabled': !pagination.has_pre}"><a class="page-link" href="#" @click="$emit('getProduct', pagination.current_page-1)">Previous</a></li>
      <li class="page-item" v-for="page in pagination.total_pages" :key="page" :class="{'active': page === pagination.current_page}"><a class="page-link" href="#" @click="$emit('getProduct', page)">{{page}}</a></li>
      <li class="page-item" :class="{'disabled': !pagination.has_next}"><a class="page-link" href="#" @click="$emit('getProduct', pagination.current_page+1)">Next</a></li>
    </ul>
  </nav>
  `
}