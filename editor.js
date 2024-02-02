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

    html = html.replaceAll(/{open-tag}(.*?){close-tag}/g,
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

// [sync] from editor
function syncContent() {
    var text = textarea.value
    // Handle final newlines (see article)
    if (text[text.length - 1] == "\n") { // If the last character is a newline character
        text += " "; // Add a placeholder space character to the final line 
    }
    textarea.value = text

    localStorage.html = text // var <- editor
    setHTML(text) // page <- editor (display)
    codeDecorations()
}

function syncContentIf() {
    if (autoSync.checked) syncContent()
}

function textareaInput() {
    syncContentIf()
}

onload = function () {
    textarea.value = localStorage.html || "" // editor <- var
    textarea.oninput = textareaInput; textareaInput()
}
