$(function(){
  function buildHTML(message){
    var image_exist = message.image.present ?
        `<img class="message__lower__image" src =${message.image}>` : "";

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
                  ${image_exist}
                </div>`
    return html 
  }
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
      $('.form__input-box__contents__text').val("");
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました")
    })
    .always(() => {
      $('.form__submit-btn').removeAttr('disabled');
    });
  })
})