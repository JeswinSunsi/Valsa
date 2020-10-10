document.getElementById("shortUrl").value = sessionStorage.getItem("shortUrl"); 

function copy(id) {
    var copyText = document.getElementById(id);
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
}

