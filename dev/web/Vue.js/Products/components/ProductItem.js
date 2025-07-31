const ProductItem = {    
    props:['data'],    
    template: `
    <div>
      <h2> {{ data.title }}</h2>
      <img v-bind:src ="data.image" v-bind:alt = "data.title" width = "100" />
      <p> {{ data.description }} </p>
    </div>
  ` 
};