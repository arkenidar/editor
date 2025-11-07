//-------------------------------
// *EXAMPLES* Example code snippets
//-------------------------------

// https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html

function example3() {
    const html_code = /*html*/`
<!-- example3 -->

<h1>Persistent counters with shared data object</h1>

<p><a href="/ht-persist/counters.html">/ht-persist/counters.html</a> SOURCE of following</p>

<p><a href="/ht-persist/initial.html">initial.html</a> - initial page</p>

<hr>
<button id="counter1" onclick="times_increment(this)">click me!</button>
<button onclick="times_set(counter1,0)">reset</button>
<hr>
<button id="counter2" onclick="times_increment(this)">click me!</button>
<button onclick="times_set(counter2,0)">reset</button>

<script>
    // [JS note] JavaScript code here is runned again and again .
    // as this script is runned again and again it should not use e.g. global const variables
    // otherwise it would unsuccessfully try to redefine them
    // so we use var variables here which can be redefined
    // instead of triggering errors which would stop the script execution
    // (as they did till i debugged and fixed it)
    var data_switch = false // false for persistent data
    var data = data_switch ? window : parent.persistentData

    function times_increment(counter) {
        data.counter_times[counter.id] += 1;
        times_set(counter)
    }

    function times_set(counter, times = null) {
        if (times != null) data.counter_times[counter.id] = times
        var s = data.counter_times[counter.id] != 1 ? "s" : ""
        counter.textContent = "click me! clicked " + data.counter_times[counter.id] + " time" + s
    }

    function times_init(counter) {
        if (typeof data.counter_times == "undefined")
            data.counter_times = {}
        times_set(counter, data.counter_times[counter.id] ?? 0)
    }

    function init() {

        times_init(counter1)
        times_init(counter2)

    }

    init()
</script>

<hr>
`;
    return html_code;
}

// https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html

function example2() {
    const html_code = /*html*/`
<div id="ractive-container"></div>

<script id="template" type="text/ractive">
<div>Shopping Cart</div>
{{#if cart && cart.length > 0}}
{{#each cart : index}}
 <div>{{name}} - \${{ price }} -
  <button on-click="@.splice('cart', index, 1)" > Remove </button>
 </div>
{{/each}}
<div>Total: \${{ total }}</div>
{{else}}
<div>Your cart is empty.</div>
{{/if}}
<button on-click="@.push('cart', {name:'type1', price:11})" > add type 1 </button>
<button on-click="@.push('cart', {name:'type2', price:22})" > add type 2 </button>
<br> <a href="product-1.html" >product-1</a> <br> <a href="product-2.html" >product-2</a>
</script>
    
<script>
function init() {

//window.persistentData = {}; // Shared data object

// [ { name:"name10" , price:10 } ]
/*
let initialPersistentData = { 'cart' : [ ] } ;
window.persistentData = initialPersistentData ;

if(typeof window.parent.persistentData !== "undefined")
 window.persistentData = window.parent.persistentData
*/

var ractive = new Ractive({
    target: '#ractive-container',
    template: '#template',
    data: window.parent.persistentData,
    computed: {
        total() {
            const cart = this.get('cart');
            if (!cart) return 0;
            return cart.reduce((total, item) => total + item.price, 0);
        }
    }
});

window.ractive = ractive;
}

function save(){
//window.parent.persistentData = window.persistentData
}

</script>
`;
    return html_code;
} // example2

function example1() {
    // https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html
    return /*html*/`<div id="app">

<div>
<ul>
<li v-for="(item,index) in cart" :key="item.id">
{{ item.name }} , {{ item.price }} , 
<button @click="deleteItem(index)">Delete</button> </li>
</ul>
    <!-- v-else to show a fallback message if the list is empty -->
    <div v-if="cart.length === 0">No items in this shopping cart.</div>
    <div v-else>total: {{total}}</div>
</div>

<br> <a href="product-1.html" >product-1</a> <br> <a href="product-2.html" >product-2</a> <br>
<button @click="addItem( {name:'type1', price:11} )" > add type 1 </button>
<button @click="addItem( {name:'type2', price:22} )" > add type 2 </button>

</div>
    
<script>
function init() {

if( ! parent.persistentData.cart )
  parent.persistentData.cart = [];

const vue = Vue.createApp({
    data() {
        return parent.persistentData
    },
    methods: {
        deleteItem(index) {
            this.cart.splice(index, 1); // Removes the task at the given index
        },
        addItem(item){
            this.cart.push(item);
        }
    },
    computed: {
        total() {
            const cart = this.cart;
            if (!cart) return 0;
            return cart.reduce((total, item) => total + item.price, 0);
        }
    },
}).mount('#app');

}
</script>` // example1
}

function example4() {
    return /*html*/`<h1 class="text-3xl font-bold underline">Hello world from Tailwind with customizations!</h1>
<p>sharing recent hack for TailWind-CSS without pre-compilations ( no PostCSS either ) . </p>
<br>
<a href="javascript: alert('link with javascript'); "> link with js </a>
<br>
<br>
<button onclick="alert('you clicked me !')"> clickable button </button>
<br>
<form onsubmit=" alert('you wrote : ' + this.input_text1.value); return false; ">
    <input required id="input_text1" placeholder="write here then submit">
    <input type="submit" value="submit">
</form>

<br>
<button class="btn-green">green Button</button>
<button class="btn-red">red Button</button>
<br>
<br>
<textarea> text area test </textarea>

<script>

    function init() {
        initCSS(); // TailwindCSS
        const CSSpairs = [
            ['.btn-green', 'bg-green-500 text-white hover:bg-green-700'],
        ]
        initCSSPairs(CSSpairs);
    }

</script>`
}
