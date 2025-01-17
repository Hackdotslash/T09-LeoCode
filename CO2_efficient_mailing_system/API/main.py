from flask import Flask, request, jsonify
from imap import IMAP
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


def login(email, password):
    imap = IMAP(email, password, debugging=True)
    return imap


def get_unsubscribe_list(email, password, main_count):
    imap = IMAP(email, password, debugging=False)
    folders = imap.get_mailboxes()
    num = imap.select_mailbox(folders[0])
    links = imap.list_unsubscribe(num, count=main_count)
    return links


def delete_all_mails_main(email, password, account_mail, count=-1):
    imap = IMAP(email, password, debugging=False)
    folders = imap.get_mailboxes()
    num = imap.select_mailbox(folders[0])
    main_count = count
    if main_count == -1:
        main_count = num - 1
    return imap.delete_all_mails(account_mail, num, main_count)


@app.route("/")
def index():
    return "Hello, World!"


@app.route("/login", methods=['POST'])
def login_route():
    if not request.json or not 'email' in request.json or not 'password' in request.json:
        return "Email or password not provided", 400

    try:
        email = request.json['email']
        password = request.json['password']
        login(email, password)
        return "Login Successful", 200
    except:
        return "Invalid Credentials", 400


@app.route("/getUnsubscribeList", methods=['POST'])
def unsubscribe_list_route():
    if not request.json or not 'email' in request.json or not 'password' in request.json:
        return "Email or password not provided", 400

    try:
        email = request.json['email']
        password = request.json['password']
        main_count = 20
        if 'count' in request.json:
            main_count = request.json['count']
        links = get_unsubscribe_list(email, password, main_count)

        return jsonify({'data': links}), 200
    except:
        return "Failed to fetch unsubscribe list", 400


@app.route("/deleteAllMails", methods=['POST'])
def delete_all_mails_route():
    if not request.json or not 'email' in request.json or not 'password' in request.json:
        return "Email or password not provided", 400

    if not 'account_mail' in request.json:
        return "Account mail not provided", 400

    try:
        email = request.json['email']
        password = request.json['password']
        account_mail = request.json['account_mail']

        mail_count = -1
        if 'count' in request.json:
            mail_count = request.json['count']
        count = delete_all_mails_main(
            email, password, account_mail, count=mail_count)
        return jsonify({'count': count}), 200
    except Exception as e:
        print(e)
        return "Failed to delete the mails", 400


if __name__ == '__main__':
    app.run(port=5000)
