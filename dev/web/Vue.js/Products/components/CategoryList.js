const CategoryList = {
    props:['datas'],
    template:`<ul>
    <li v-for="data in datas"> {{ data }}</li>
    </ul>
    `
};