$(function() {
  function addUser(user) {
    let html = `
              <div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
              </div>
              `;
    $('#user-search-result').append(html);
  }

  function addNoUser(user) {
    let html = `
               <div class="chat-group-user clearfix">
                <p class="chat-group-user__name">ユーザーが見つかりません</p>
              </div>`;
    $('#user-search-result').append(html);
  }
  function addDeleteUser(name, id) {
    let html = `
              <div class="ChatMember clearfix" id="${id}">
                <p class="ChatMember__name">${name}</p>
                <div class="ChatMember__remove ChatMember__button" data-user-id="${id}" data-user-name="${name}">削除</div>
              </div>`;
    $(".ChatMembers").append(html);
  }

  $('#user-search-field').on('keyup', function() {
    let input = $('#user-search-field').val();
    $.ajax({
      type: "GET",
      url: "/users",
      dataType: 'json',
      data: { keyword: input },
    })
      .done(function(users) {
        $('#user-search-result').empty();
        if (users.length !== 0) {
          users.forEach(function(user) {
            addUser(user)
          });
        } else if (input.length == 0) {
          return false;
        } else {
          addNoUser();
        }
      })
      .fail(function() {
        alert("ユーザー検索に失敗しました")
      });
  })
})

$(document).on('click','.user-search-add', function(){
  console.log("イベント発火")
})