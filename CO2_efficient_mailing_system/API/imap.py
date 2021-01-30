from socket import *
import ssl
import quopri
import re
import unicodedata
import os
import base64
import getpass
import html
from dotenv import load_dotenv
from bs4 import BeautifulSoup


class IMAP:
    '''Class which does all the part of IMAP Protocol

    Arguements: \t
    email: User email \t
    password: User password\t
    imap_server: Url of imap server (default: gmail)\t
    debugging: Utility variable to print sent and received messages
    '''

    # <------------------------------------------------------Variables------------------------------------------>
    # Main socket which does all the work
    __main_socket = None

    __email = ""
    __password = ""

    # Stores the imap server address and port for each domain
    __HOST_EMAIL_PAIR = [
        {
            'domain': 'gmail.com',
            'imap_server': 'imap.gmail.com',
            'port': 993
        },
        {
            'domain': 'coep.ac.in',
            'imap_server': 'outlook.office365.com',
            'port': 993
        },
        {
            'domain': 'outlook.com',
            'imap_server': 'outlook.office365.com',
            'port': 993
        }
    ]

    __AUTH_MSG = "a01 LOGIN"  # Authentication message
    __MAIL_NEW_LINE = "\r\n"

    __SSL_PORT = 993  # Port for gmail imap server
    __HOST = 'imap.gmail.com'
    __TIMEOUT = 15  # 15 seconds for now

    __debugging = False

    # <-----------------------------------------------------Constructor------------------------------------------>

    def __init__(self, email, password, debugging=False):
        self.__email = email
        self.__password = password
        email_domain = email.split('@')[1].lower()

        # Determine host and ssl port using domain name
        for email in self.__HOST_EMAIL_PAIR:
            if email['domain'] == email_domain:
                self.__HOST = email['imap_server']
                self.__SSL_PORT = email['port']
                break

        self.__debugging = debugging

        try:
            # Connect to imap server
            self.__connect()
        except Exception as e:
            raise Exception(e)

    # <----------------------------------------------Private functions------------------------------------------->

    # <!-------------------------------------------Connection--------------------------------------------------->
    def __connect(self):
        '''Connect to IMAP Server'''

        # Create a socket
        self.__main_socket = socket(AF_INET, SOCK_STREAM)
        # Set timeout for it
        self.__main_socket.settimeout(self.__TIMEOUT)
        # Connect to imap server
        self.__main_socket.connect((self.__HOST, self.__SSL_PORT))
        # Wrap the socket in ssl
        self.__ssl_connect()
        # Receive the message from server
        msg = self.__main_socket.recv(1024).decode().strip('\r\n\t')
        if self.__debugging:
            print("Server:", msg)
        if msg.split()[1] != "OK":
            raise Exception(
                "Something Went Wrong! Failed to connect to imap server")
        # Login after connection
        self.__login()

    def __ssl_connect(self):
        '''To wrap socket in SSL'''

        context = ssl.create_default_context()
        host = self.__HOST
        self.__main_socket = context.wrap_socket(
            self.__main_socket, server_hostname=host)

    # <!--------------------------------------------Authentication-------------------------------------------->

    def __login(self):
        '''Login to imap server'''

        # Tell imap server for authentication
        message = self.__AUTH_MSG + " " + self.__email + \
            " " + self.__password + self.__MAIL_NEW_LINE
        self.__main_socket.send(message.encode('ascii'))
        recv_msg = self.__main_socket.recv(1024).decode().strip('\r\t\n')
        if self.__debugging:
            print(recv_msg)
        # Split the lines in received message
        lines_arr = recv_msg.splitlines()
        # Get the last line from received lines and split it
        imap_msg_tokens = lines_arr[-1].split(" ")
        # Check if second element of tokens is OK if not raise exception
        if imap_msg_tokens[1] != "OK":
            raise Exception("Invalid email or password")

    # <!-------------------------------------Commands related to IMAP----------------------------------------->

    def get_mailboxes(self):
        '''To get all the available mail boxes'''

        # LIST command which needs to be sent to imap server
        send = 'a02 LIST "" "*"'
        self.__main_socket.settimeout(2)
        code, msg = self.__send_encoded_msg(send)

        self.__main_socket.settimeout(self.__TIMEOUT)
        if code != "OK":
            raise Exception("Not able to fetch mailboxes")

        # Separate lines of message
        folders_imap = msg.splitlines()
        folders_imap.pop(-1)
        folders = []
        for item in folders_imap:
            # Remove the starting message of imap server which contains "LIST"
            tokens = item.split(" ")
            index = tokens.index('"/"')
            name = ""
            for i in range(index + 1, len(tokens)):
                name += tokens[i]
                name += " "

            if name[:-1] != '"[Gmail]"':
                folders.append(name[:-1])
        # Return list of folders except last attribute
        return folders

    def select_mailbox(self, name):
        '''To select particular mail box

            Arguments \t
            name: Name of mailbox
        '''

        command = 'a02 SELECT {folder_name}{new_line}'.format(
            folder_name=name, new_line=self.__MAIL_NEW_LINE)
        self.__main_socket.send(command.encode())
        msg = ""
        success = True

        # Receive the response
        while 1:
            temp_msg = self.__main_socket.recv(1024).decode()
            msg += temp_msg
            flag = False
            for line in temp_msg.splitlines():
                words = line.split()
                try:
                    if words[1] == "BAD" or words[1] == "NO":
                        success = False
                        raise Exception("Failed to select mailbox")
                    elif words[1] == "OK" and (words[2] == "[READ-WRITE]" or words[2] == "[READ-ONLY]"):
                        flag = True
                        break
                except:
                    pass
            if flag:
                break
        if not success:
            raise Exception('Invalid mailbox name')
            # return {self.__success: False, 'msg': "Invalid mailbox name", 'number_of_mails': -1}
        else:
            number_of_mails = 0
            # To get the number of mails in mailbox
            lines_arr = msg.splitlines()
            for item in lines_arr:
                try:
                    tokens = item.split(" ")
                    if tokens[2] == "EXISTS":
                        number_of_mails = int(tokens[1])
                except Exception as e:
                    continue
            return number_of_mails

    def close_mailbox(self):
        '''To deselect the selected mailbox'''

        try:
            command = "a02 CLOSE"
            code, msg = self.__send_encoded_msg(command)
            if code == "OK":
                return True
            else:
                return False
        except:
            pass

    def list_unsubscribe(self, start, count=1):
        command = "a02 FETCH " + str(start - count) + ":" + str(start) + \
            " (FLAGS BODY[HEADER.FIELDS (List-Unsubscribe mailto FROM)])" + \
            self.__MAIL_NEW_LINE
        self.__main_socket.send(command.encode())
        success, msg = self.__get_whole_message()
        if not success:
            raise("Something went wrong! Please try again")
        msg = self.__separate_mail_headers(msg)
        links = self.__get_unsubscribe_links(msg)
        return links

    def delete_all_mails(self, account_mail, start, count=1):
        command = "a02 FETCH " + str(start - count) + ":" + str(start) + \
            " (FLAGS BODY[HEADER.FIELDS (List-Unsubscribe mailto FROM DATE SUBJECT)])" + \
            self.__MAIL_NEW_LINE
        self.__main_socket.send(command.encode())
        success, msg = self.__get_whole_message()
        if not success:
            raise("Something went wrong! Please try again")
        msg = self.__separate_mail_headers(msg)

        total_deleted_mails = 0
        main_arr = []
        for index, item in enumerate(msg):
            item = self.__get_unsubscribe_headers(item)
            mail = "".join(item[2].split()).lower()
            account_mail = "".join(account_mail.split()).lower()
            if mail == account_mail:
                self.delete_email(start - count + index)
                count -= 1
                total_deleted_mails += 1
        return total_deleted_mails

    def delete_email(self, index):
        '''To delete mail

            Arguements \t
            index: index of email
        '''
        # Copy the mail to trash
        command = "a02 COPY " + str(index) + \
            " [Gmail]/Trash" + self.__MAIL_NEW_LINE
        self.__main_socket.send(command.encode())
        success, msg = self.__get_whole_message()

        # Store the deleted flag
        command = "a02 STORE " + \
            str(index) + " +FLAGS (\\Deleted)" + self.__MAIL_NEW_LINE
        self.__main_socket.send(command.encode())
        success, msg = self.__get_whole_message()
        if True:
            # Delete the mail
            command = "a02 EXPUNGE" + self.__MAIL_NEW_LINE
            self.__main_socket.send(command.encode())
            success, msg = self.__get_whole_message()
            if success:
                return True
            else:
                raise Exception("Something went wrong! Please try again")
        else:
            raise Exception("Something went wrong! Please try again")

    # <-----------------------------------------------Utils----------------------------------------------------->

    def __send_encoded_msg(self, message):
        ''' Utility function to send encoded message to imap server'''

        if self.__debugging:
            print("Client: ", message)
        message = message + self.__MAIL_NEW_LINE
        self.__main_socket.send(message.encode())
        received_msg = self.__main_socket.recv(100024).decode().strip('\r\t\n')
        lines_arr = received_msg.splitlines()

        code = lines_arr[-1].split(" ")[1]
        if self.__debugging:
            print("Server: ", received_msg)
        return code, received_msg

    def __get_whole_message(self):
        '''To get whole reply back from the server'''

        msg = ""
        email_results = ["OK", "NO", "BAD"]
        while 1:
            try:
                # Receive message from server
                recv_bytes = self.__main_socket.recv(1024)
                temp_msg = recv_bytes.decode(errors='ignore')
                print(temp_msg)
                # Split the lines from the received message
                lines_arr = temp_msg.splitlines()

                # Check if the last line contains the codes involved in imap protocol
                code1 = None
                code2 = None
                try:
                    code1 = lines_arr[-1].split(" ")[0]
                    code2 = lines_arr[-1].split(" ")[1]
                except Exception as e:
                    pass

                if code1 in email_results or code2 in email_results:
                    lines_arr.pop(-1)

                    # Add other lines from array to message
                    for item in lines_arr:
                        msg += item
                        msg += self.__MAIL_NEW_LINE
                    # Remove first line and last two line
                    msg = msg.splitlines()
                    # msg = msg[1: -2]
                    reply = ""
                    # Again append other elements in array
                    for index in range(len(msg)):
                        reply += msg[index]
                        if index != len(msg) - 1:
                            reply += self.__MAIL_NEW_LINE
                    # Return them
                    return True, reply

                msg += temp_msg
            except Exception as e:
                return False, "Request Failed"

    # <!------------------------------------------------Base Mail Headers---------------------------------------->

    def __separate_mail_headers(self, msg):
        '''Get individual mails from received'''

        lines_arr = msg.splitlines()
        ans = []
        email = ""
        prev_start = 0
        index = 0
        while index < len(lines_arr):
            # This indicates the end of particular mail
            if lines_arr[index] == "":
                email = ""
                for item in lines_arr[prev_start + 1:index]:
                    email += item + "\n"
                prev_start = index + 2
                ans.append(email)
            index += 1
        return ans

    def __extract_text_from_encoded_words_syntax(self, encoded_words):
        '''Decode subject if it is in encoded words syntax'''
        try:
            temp = encoded_words[2:]
            # Get the charset from encoded subject
            i1 = temp.find("?")
            charset = temp[:i1].lower()
            temp = temp[i1:]

            # Get the encoding type
            encoding = temp[1].upper()
            # Get the main text
            main_text = temp[3:]
            # This will be encoded string
            ending_index = main_text.find("?=")
            main_text = main_text[:ending_index]

            if encoding == "B":
                main_text = base64.b64decode(main_text)
            elif encoding == "Q":
                main_text = quopri.decodestring(main_text)

            return main_text.decode(charset), encoded_words.find("?=") + 3
        except Exception as e:
            return encoded_words

    def __get_unsubscribe_headers(self, item):
        '''Get Unsubscribe link and mail from header'''

        unsubscribe_key = "List-Unsubscribe:"
        from_key = "From:"
        unsubscribe_link = ""
        mail_from_name = ""
        mail_from_email = ""
        for line in item.splitlines():
            if line.startswith(from_key):
                mail_from = line[len(from_key) + 1:]
                if mail_from.startswith("=?"):
                    output, ending_index = self.__extract_text_from_encoded_words_syntax(
                        mail_from)
                    mail_from_name = output
                    mail_from_email = mail_from[ending_index:]
                else:
                    mail_from_name = mail_from[:mail_from.find("<")]
                    mail_from_email = mail_from[mail_from.find("<"):]
            elif line.startswith(unsubscribe_key):
                unsubscribe_link = line[len(unsubscribe_key) + 2:-1]
        return unsubscribe_link, mail_from_name, mail_from_email

    def __get_unsubscribe_links(self, msg):
        '''Separate different unsubscribe links and account names from email headers'''

        unsubscribe_list = []
        for item in msg:
            unsubscribe_link, mail_from_name, mail_from_email = self.__get_unsubscribe_headers(
                item)
            if unsubscribe_link:
                temp = list(
                    filter(lambda item: item['account_email'] == mail_from_email, unsubscribe_list))
                if len(temp) == 0:
                    item = {
                        'account_name': mail_from_name,
                        'account_email': mail_from_email,
                        'link': unsubscribe_link
                    }
                    unsubscribe_list.append(item)
        return unsubscribe_list


if __name__ == "__main__":
    load_dotenv('./.env')
    old_mail = os.getenv('EMAIL')
    old_pass = os.getenv('PASSWORD')
    imap = IMAP(old_mail, old_pass, debugging=True)
    folders = imap.get_mailboxes()
    num = imap.select_mailbox(folders[2])
    imap.delete_email([num, num - 1, num - 2])
    # links = imap.list_unsubscribe(num, count=num - 1)
    imap.delete_all_mails("<noreply@dare2compete.news>", num, 20)
