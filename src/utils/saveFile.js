export default function saveFile(url) {
  // Get file name from url.
  var filename = url.substring(url.lastIndexOf("/") + 1).split("?")[0]
  var xhr = new XMLHttpRequest()
  xhr.responseType = "blob"
  xhr.onload = function() {
    var a = document.createElement("a")
    a.href = window.URL.createObjectURL(xhr.response) // xhr.response is a blob
    a.download = filename // Set the file name.
    a.style.display = "none"
    document.body.appendChild(a)
    a.click()
  }
  xhr.open("GET", url)
  xhr.send()
}
