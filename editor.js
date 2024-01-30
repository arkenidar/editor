
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
    var html = editor.innerText
    html = html.replaceAll("<", "{open-tag}")
    html = html.replaceAll(">", "{close-tag}")

    html = html.replaceAll(/{open-tag}(.*?){close-tag}/g,
        "<span class='tag'>&lt;</span>"
        + "<span class='tag-inside'>$1</span>"
        + "<span class='tag'>&gt;</span>")

    html = html.replaceAll("{open-tag}", "<")
    html = html.replaceAll("{close-tag}", ">")

    editor.innerHTML = html

    for (var tagInside of document.querySelectorAll(".tag-inside")) {
        tagInside.innerHTML = tagInside.innerHTML.replace(/^(\/?\w+)(.*)/, "<span class='tag-name'>$1</span>$2")
    }
}

// [sync] from editor
function syncContent() {
    localStorage.html = editor.innerText // var <- editor
    setHTML(editor.innerText) // page <- editor (display)
}

function syncContentIf() {
    if (autoSync.checked) window.syncContent()
}

window.onload = function () {
    editor.innerText = localStorage.html // editor <- var
    setTimeout(syncContent, 0)
    editor.oninput = syncContentIf
    codeDecorations()
}
