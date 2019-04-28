<template>
<!-- 发货处理 -->
  <div class="ShippingHandler"> 
      <div class="oder-title-box clear">
            <span class="oder-title">订单发货处理</span>
            
      </div> 
      <div class="ShippingHandler-box">
        <DeliverGoods />
        <div class="order-details-box"><router-view /></div>
      </div>
    
  </div>
</template>

<script>
// @ is an alias to /src
import DeliverGoods from '@/components/order/DeliverGoods.vue'

export default {
  name: 'ShippingHandler',
  created(){
  },
  components: {
    DeliverGoods
  }
}
</script>
<style scoped>
.ShippingHandler-box{
    display: flex;
    justify-content: center;
}
.order-details-box{
  border: 1px solid #a3a0a025;
  border-radius: 5px;
}
</style>
