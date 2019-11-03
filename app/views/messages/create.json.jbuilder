json.text @message.text
json.image @message.image
json.group @message.group.name
json.user_name @message.user.name
json.created_at @message.created_at.strftime("%Y-%m-%d %H:%M")
json.updated_at @message.updated_at