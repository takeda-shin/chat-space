class Api::MessagesController < ApplicationController
  def index
    # 自動更新するグループ情報を取得
    group = Group.find(params[:group_id])
    # ajaxで送られてくる最後のメッセージのid番号を変数に代入
    last_message_id = params[:id].to_i
    # 取得したメッセージ群から、idがlast_message_idより大きい（新しい）idを取得
    @messages = group.messages.includes(:user).where("id > #{last_message_id}")
  end
end