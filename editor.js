// https://github.com/WebCoder49/code-input
// https://css-tricks.com/creating-an-editable-textarea-that-supports-syntax-highlighted-code/
// https://codepen.io/WebCoder49/pen/dyNyraq

function setHTML(html) {

    function nodeContentFromCode(code, node) {
        var range = document.createRange()
        range.selectNode(document.body)
        var documentFragment = range.createContextualFragment(code)
        node.innerHTML = ""
        node.appendChild(documentFragment)
    }

    //page.innerHTML = html // this doesn't properly handle e.g. <script> tags
    nodeContentFromCode(html, page) // this does handle <script> tags etc.
}

function codeDecorations() {
    var html = textarea.value
    html = html.replaceAll("<", "{open-tag}")
    html = html.replaceAll(">", "{close-tag}")

    html = html.replaceAll(/{open-tag}([\s\S]*?){close-tag}/g,
        "<span class='tag'>&lt;</span>"
        + "<span class='tag-inside'>$1</span>"
        + "<span class='tag'>&gt;</span>")

    html = html.replaceAll("{open-tag}", "&lt;") // <
    html = html.replaceAll("{close-tag}", "&gt;") // >

    editor.innerHTML = html

    for (var tagInside of document.querySelectorAll(".tag-inside")) {
        tagInside.innerHTML = tagInside.innerHTML.replace(/^(\/?\w+)(.*)/, "<span class='tag-name'>$1</span>$2")
    }
}

save_function_was_called = false

// [sync] from editor
function syncContent() {

    try {
        if (typeof save != "undefined") {
            save()
            save_function_was_called = true
        }
        else console.warn("save() is not defined")
    } catch (error) { console.error("save()", error) }

    var text = textarea.value
    // Handle final newlines (see article)
    if (text[text.length - 1] == "\n") { // If the last character is a newline character
        text += " "; // Add a placeholder space character to the final line 
    }
    textarea.value = text

    localStorage.html = text // var <- editor
    setHTML(text) // page <- editor (display)

    try {
        if (typeof init != "undefined") init()
    } catch (error) { console.error("init()", error) }

    try {
        if (save_function_was_called == false)
            console.warn("save() is not called: not calling restore()")
        else if (typeof restore != "undefined") restore()
    } catch (error) { console.error("restore()", error) }
}

function syncContentIf() {
    if (autoSync.checked) syncContent()
}

function textareaInput() {
    syncContentIf()
    codeDecorations()
}

onload = function () {
    textarea.value = localStorage.html || example1() // editor <- var
    textarea.oninput = textareaInput; textareaInput()
}

// https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html

function example1() {
    const html_code = /*html*/
        String.raw`
<div id="ractive-container"></div>

<script id="template" type="text/ractive">
<div>Shopping Cart</div>
{{#if cart && cart.length > 0}}
{{#each cart : index}}
 <div>{{name}} - ${{ price }} -
  <button on-click="@.splice('cart', index, 1)" > Remove </button>
 </div>
{{/each}}
<div>Total: ${{ total }}</div>
{{else}}
<div>Your cart is empty.</div>
{{/if}}
<button on-click="@.push('cart', {name:'type1', price:11})" > add type 1 </button>
<button on-click="@.push('cart', {name:'type2', price:22})" > add type 2 </button>
</script>
    
<script>
function init() {

//window.persistentData = {}; // Shared data object

// [ { name:"name10" , price:10 } ]
let initialPersistentData = { 'cart' : [ ] } ;
window.persistentData = initialPersistentData ;

if(typeof window.persistentData2 !== "undefined")
 window.persistentData = window.persistentData2

var ractive = new Ractive({
    target: '#ractive-container',
    template: '#template',
    data: window.persistentData,
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
window.persistentData2 = window.persistentData
}

</script>
`;
    return html_code;
} // example1

function example2() {
    // https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html
    return /*html*/`<div id="app">
<button @click="count++">Count by click : {{ count }}</button>
</div>
    
<script>
function init() {

initCSS() // TailwindCSS

vue = Vue.createApp({
    data() {
        return {
            count: 0
        }
    }
}).mount('#app')

}
</script>`
}

function example3() {
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
