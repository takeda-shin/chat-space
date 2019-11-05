$(function(){
  function buildHTML(message){

    var image = message.image.url ? 
               `<img class="message__lower__image" src= ${message.image.url} >` : "";

    var html = `<div class="message">
                  <div class="message">
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
    if (message.text && message.image.url) {
      var html = `<div class="message" data-id="${message.id}">
                    ${upperInfo}
                    <div class="message__lower">
                      <p class="message__lower__text">
                        ${message.text}
                      </p>
                      <img src="${message.image.url}" class="message__lower__image">
                    </div>
                  </div>`
    } else if (message.text) {
      var html = `<div class="message" data-id="${message.id}">
                    ${upperInfo}
                    <div class="message__lower">
                      <p class="message__lower__text">
                        ${message.text}
                      </p>
                    </div>
                  </div>`
    } else if (message.image.url) {
      var html = `<div class="message" data-id="${message.id}">
                    ${upperInfo}
                    </div>
                    <div class="message__lower">
                      <img src="${message.image.url}" class="message__lower__image">
                    </div>
                  </div>`
    };
    return html;
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
    if($('.messages')[0]) {
      //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
      last_message_id = $('.message:last').data('message-id');
      $.ajax({
        //ルーティングで設定した通り/groups/id/api/messagesとなるように
        url: 'api/messages',
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id},
     })
      .done(function(data) {
        var insertHTML = '';
        //配列messagesの中身を一つ一つを取り出し、HTMLに変換した物を入れ物に入れる
        data.forEach(function(message) {
          insertHTML = buildMessageHTML(message);
        });
        $('.messages').append(insertHTML);
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      })
      .fail(function() {
        console.log('error');
      })
    }
  }
  setInterval(reloadMessages, 5000);
});