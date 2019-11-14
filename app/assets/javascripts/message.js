$(function(){
  function buildHTML(message){

    var image = message.image.url ? 
               `<img class="message__lower__image" src= ${message.image.url} >` : "";

    var html = `<div class="message" data-id= "${message.id}">
                  <div class="message__upper-info">
                    <div class="message__upper-info__talker">
                    ${message.user_name}
                    </div>
                    <div class="message__upper-info__date">
                    ${message.created_at}
                    </div>
                  </div>
                  <div class="message__lower">
                    <p class="message__lower__text">
                    ${message.text}
                    </p>
                    ${image}
                  </div>
                </div>`
    return html;
  }

  function buildMessageHTML(message) {
    var upperInfo =`<div class="message__upper-info">
                      <div class="message__upper-info__talker">
                        ${message.user_name}
                      </div>
                      <div class="message__upper-info__date">
                        ${message.created_at}
                      </div>
                    </div>`

    var messageText = message.text ?
                    `${message.text}`: "";

    var messageImage = message.image.url ?
                        `<img src="${message.image.url}" class="message__lower__image">`: "";

    var html = `<div class="message" data-id="${message.id}">
                  ${upperInfo}
                  <div class="message__lower">
                    <p class="message__lower__text">
                      ${messageText}
                    </p>
                    ${messageImage}
                  </div>
                </div>`
    return html
  };

  $('.new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('form')[0].reset();
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました")
    })
    .always(function() {
      $('.form__submit-btn').removeAttr('disabled');
    });
  })

  var reloadMessages = function() {
    if(document.URL.match(/messages/)) {
      last_message_id = $('.message:last').data('id');
      $.ajax({
        url: 'api/messages',
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id},
      })
      .done(function(messages) {
        console.log(messages)
        var insertHTML = '';
        messages.forEach(function(message) {
          insertHTML = buildMessageHTML(message);
        });
        $('.messages').append(insertHTML);
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      })
      .fail(function() {
        alert('error');
      })
    }
  }
  setInterval(reloadMessages, 5000);
});