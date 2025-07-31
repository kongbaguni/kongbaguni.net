const ProductList = {    
    props:['datas'],    
    template: `
    <ul>
    <li v-for="data in datas">
    <productitem v-bind:data="data" />
    </li>
    </ul>
  ` 
};