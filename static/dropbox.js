function hookDropbox(){
  var dropbox = document.getElementById('dropbox')

  dropbox.addEventListener("dragenter", noopHandler, false);
  dropbox.addEventListener("dragexit", noopHandler, false);
  dropbox.addEventListener("dragover", noopHandler, false);
  dropbox.addEventListener("drop", drop, false);
}

function noopHandler(evt){
  evt.stopPropagation();
  evt.preventDefault();
}

function drop(evt){
  evt.stopPropagation();
  evt.preventDefault();
  
  var files = evt.dataTransfer.files;
  var count = files.length

  if (count > 0)
    handleFiles(files)
}

function handleFiles(files){
  //for(var i = 0; i < files.length; i++){
  file = files[0]
  $('#upload-area').append("<div id='upload'>Uploading: " + file.name + '</div>')
   
  // begin the read operation
  var fd = new FormData();
  fd.append("uploaded_file", file);
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/file_upload", true);
  xhr.onreadystatechange = function(){
    switch(xhr.readyState){
      case 1:
        break;
      case 2:
        break;
      case 3:
        break;
      case 4:
        text = xhr.responseText
        if (xhr.status == 200) {
          $('#upload').remove()
          as = text.split(',')
          // document.location.href = '/echo_id/' + text
          request_url = "/bridge/" + escape(as[0]) + "/" + escape(as[1]) + '/' + escape(as[2])
          $.ajax({
            url: request_url,
            type: 'GET',
            dataType: 'json',
            success: function(text){
              if(text.status == "error"){
                alert(text.message)
              }else{
                document.location.href = text.message;
              }
            }
          })
          // $(".page").append("<a href=\"" + xhr.responseText + "\">Download</a>")
        }
        break;
    }
  }
  xhr.send(fd);
  //}
}
