from flask import Flask, request, jsonify
from imap import IMAP

app = Flask(__name__)


def login(email, password):
    imap = IMAP(email, password, debugging=True)
    return imap


def get_unsubscribe_list(email, password):
    imap = IMAP(email, password, debugging=True)
    folders = imap.get_mailboxes()
    num = imap.select_mailbox(folders[2])
    links = imap.list_unsubscribe(num, count=num - 1)
    return links


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
        links = get_unsubscribe_list(email, password)
        return jsonify({'data': links}), 200
    except:
        return "Failed to fetch unsubscribe list", 400


if __name__ == '__main__':
    app.run(port=5000)
