---
title: "Matrix Onboarding Script"
---

# Matrix Onboarding Script

Documentation - [Rooms and Events](https://matrix.org/docs/matrix-concepts/rooms_and_events/) -

```python
import requests
import sys
import time

1. ======================================================
1. Configuration and Authentication
1. ======================================================
access_token = 'secret_here'
headers = {
    'Authorization': f'Bearer {access_token}',
    'Content-Type': 'application/json'
}

1. Define the default room IDs here
default_room_ids = [
    '!btPaQLPWzjrXysSUYG:irregularchat.com',  # Tech lobby
    '!zCyVoUPKubIweyarXA:irregularchat.com',  # Information lobby
    '!FGOHJJGMWuEPobYOEg:irregularchat.com',  # Off topic lobby
    '!TXesYMyzhnCAYeJaja:irregularchat.com',  # Announcements room
    '!mnVnUodoOMJXvKusQm:irregularchat.com',  # Certification lobby
    '!vNcnyzJUFIAEvaNqjl:irregularchat.com',  # Irregular Chat Meetup room
]

default_space_ids = [
    '!OcvzfbMBIgiwxTDcwY:irregularchat.com',  # Irregular chat main space
    '!edpIFQYGanVWnbjokB:irregularchat.com',  # Public irregular chat space
    '!DPJndFqebFSRsbdlLJ:irregularchat.com',  # Tech space
    '!xwKFpriScdIOjPGsBo:irregularchat.com',  # Information space
    '!nigdPNodViHYRLHocg:irregularchat.com',  # Misc space
    '!wVmTeEbHabaSCtNWxG:irregularchat.com',  # Location space
    '!kSjyILmwtHvpUnxBML:irregularchat.com',  # FLNC room
    '!sCdGCPGpPwKaeMFavX:irregularchat.com',  # Certifications space
    '!wSFgXOTvLnrsDlzCtY:irregularchat.com',  # Event space
]

default_delete_room_id = '!jOmVEHzKtmfThYwOCt:irregularchat.com'
default_list_room_id = '!edpIFQYGanVWnbjokB:irregularchat.com'
1. Your Matrix user ID
your_user_id = '@sac:irregularchat.com'
1. Combine room and space IDs for onboarding
default_onboard_ids = default_room_ids + default_space_ids

################## Welcome Message ##################
welcome_message = """
Hello and Welcome!
I've invited you to various rooms and spaces. Here’s a brief overview:
'''Make sure you follow the wiki gu

ide: https://irregularpedia.org/matrix/element-matrix-messenger
### Spaces and Rooms:
'''Note:** You may have issues viewing these rooms if you are not invited into the main space. Make sure to accept the invite to the Main Space first.

#### Main Space:
- Main Space: https://matrix.to/#/!OcvzfbMBIgiwxTDcwY:irregularchat.com?via=irregularchat.com
- Announcements: https://matrix.to/#/#announcements:irregularchat.com
- ChatGPT Discussions: https://matrix.to/#/#chatgpt:irregularchat.com

#### Sub Spaces based on Topics:
Once you accept the Main Space invite, you'll see other spaces you can join:

- Tech and AI Space: https://matrix.to/#/!DPJndFqebFSRsbdlLJ:irregularchat.com?via=irregularchat.com
    - Tech Chat: https://matrix.to/#/#tech-chat:irregularchat.com
    - AI Discussions: https://matrix.to/#/#ai:irregularchat.com
    - Robotics: https://matrix.to/#/#robotics:irregularchat.com
- Information Exchange: https://matrix.to/#/!xwKFpriScdIOjPGsBo:irregularchat.com?via=irregularchat.com
    - Information Chat: https://matrix.to/#/#information-chat:irregularchat.com
    - Research Discussions: https://matrix.to/#/#research-chat:irregularchat.com
- Outdoor Activities: https://matrix.to/#/!nigdPNodViHYRLHocg:irregularchat.com?via=irregularchat.com
    - Outdoor Chat: https://matrix.to/#/#outdoors:irregularchat.com
    - Gaming: https://matrix.to/#/#gaming:irregularchat.com

#### Events Space:
- Events Space: https://matrix.to/#/#events-space:irregularchat.com

### Some Video Guides for using Element:
1. Navigating Element - Video Guide: http://url.irregular.chat/video-guide-navigating-element
2. Element Threads - Video Guide: http://url.irregular.chat/video-guide-element-threads
3. Matrix Recovery Keys - Video Guide: http://url.irregular.chat/video-guide-matrix-recovery-keys

Feel free to browse around, join discussions, and ask questions. Looking forward to seeing you in the chat!
"""

1. ======================================================
1. Function Definitions
1. ======================================================
def format_user_id(username):
    # Check if username already includes '@' and the domain
    if not username.startswith('@'):
        username = f'@{username}'
    if ':irregularchat.com' not in username:
        username = f'{username}:irregularchat.com'
    return username

def get_room_members(room_id):
    response = requests.get(
        f'https://matrix.irregularchat.com/_matrix/client/r0/rooms/{room_id}/joined_members',
        headers=headers
    )
    if response.status_code == 200:
        return response.json().get('joined', {})
    else:
        print(f"Failed to get members of room {room_id}. Status: {response.status_code}")
        return {}

def is_user_in_room(room_id, user_id):
    members = get_room_members(room_id)
    if members:
        return user_id in members.keys()
    else:
        print(f"Failed to get members for room {room_id}.")
        return False

def create_direct_message_room(user_id):
    payload = {
        "preset": "trusted_private_chat",
        "invite": ["is_direct": True
    }
    response = requests.post(
        f'https://matrix.irregularchat.com/_matrix/client/r0/createRoom',
        json=payload,
        headers=headers
    )
    if response.status_code == 200:
        return response.json().get('room_id')
    else:
        print(f'Failed to create direct message room with {user_id}. Status: {response.status_code}, Response: {response.text}')
        return None

def send_direct_message(room_id, message):
    payload = {
        "msgtype": "m.text",
        "body": message
    }
    response = requests.post(
        f'https://matrix.irregularchat.com/_matrix/client/r0/rooms/{room_id}/send/m.room.message',
        json=payload,
        headers=headers
    )
    if response.status_code != 200:
        print(f'Failed to send message to {room_id}. Status: {response.status_code}, Response: {response.text}')

def invite_to_room(room_id, user_to_invite):
    # Format user ID if needed
    if not user_to_invite.startswith('@'):
        user_to_invite = f'@{user_to_invite}:irregularchat.com'

    payload = {'user_id': user_to_invite}
    response = requests.post(f'https://matrix.irregularchat.com/_matrix/client/r0/rooms/{room_id}/invite', json=payload, headers=headers)
    if response.status_code == 200:
        print(f"Successfully invited {user_to_invite} to {room_id}")
    else:
        print(f"Failed to invite {user_to_invite} to {room_id}. Status: {response.status_code}, Response: {response.text}")
    return response

def remove_user_from_room(room_id, user_id):
    payload = {'user_id': user_id}
    response = requests.post(
        f'https://matrix.irregularchat.com/_matrix/client/r0/rooms/{room_id}/kick',
        json=payload,
        headers=headers
    )
    if response.status_code == 200:
        print(f'Removed user {user_id} from room {room_id}.')
    else:
        print(f'Failed to remove user {user_id} from room {room_id}. Status: {response.status_code}')

def remove_all_users_except_self(room_id, self_user_id):
    members = get_room_members(room_id)
    for member in members.keys():
        if member != self_user_id:
            remove_user_from_room(room_id, member)

1. New functions for onboarding steps
def get_invited_members(room_id):
    response = requests.get(
        f'https://matrix.irregularchat.com/_matrix/client/r0/rooms/{room_id}/invited_members',
        headers=headers
    )
    if response.status_code == 200:
        return response.json().get('invited', {})
    else:
        print(f'Failed to get invited members of room {room_id}. Status: {response.status_code}')
        return {}

def is_user_invited(room_id, user_id):
    invited_members = get_invited_members(room_id)
    return user_id in invited_members
1. Define a function to get a user's status in a room
def get_user_status_in_room(room_id, user_id):
    # Check if user is already in the room
    if is_user_in_room(room_id, user_id):
        return 'already_in_room'
    # Check if user has been invited
    elif is_user_invited(room_id, user_id):
        return 'already_invited'
    else:
        return 'not_in_room'

def send_invites(room_id, usernames):
    status_report = {'already_in_room': [](user_id],), 'invited': ['failed_to_invite': [](],)}
    for username in usernames:
        formatted_username = format_user_id(username)  # Ensure correct format
        if not is_user_in_room(room_id, formatted_username):
            result = invite_to_room(room_id, formatted_username)
            if result.status_code == 200:
                status_report[else:
                status_report['failed_to_invite']('invited'].append(username)).append(username)
        else:
            status_report[return status_report

def send_welcome_messages(usernames, welcome_message):
    for username in usernames:
        formatted_username = format_user_id(username)
        dm_room_id = create_direct_message_room(formatted_username)
        if dm_room_id:
            send_direct_message(dm_room_id, welcome_message)
            print(f'Sent welcome message to {username}.')

1. Function to onboard users
def onboard_users(room_ids, usernames, welcome_message):
    # Send welcome messages first
    print("Sending welcome messages...\n")
    for username in usernames:
        formatted_username = format_user_id(username)  # Ensure correct format
        dm_room_id = create_direct_message_room(formatted_username)
        if dm_room_id:
            send_direct_message(dm_room_id, welcome_message)
            print(f'Sent welcome message to {formatted_username}.')

    print("\nStarting the invitation process...\n")
    # Initialize accumulators for summary report
    total_already_in_room = []('already_in_room'].append(username))
    total_invited = [total_failed = [](])

    # Send invites
    for room_id in room_ids:
        print(f"Inviting to room ID: {room_id}")
        status_report = send_invites(room_id, usernames)

        # Extend accumulators with the results
        total_already_in_room.extend(status_report[total_invited.extend(status_report['invited']('already_in_room'])))
        total_failed.extend(status_report[# Print the final summary in a prettier format
    print("\nFinal Summary:\n")
    print("Already in room:")
    for username in set(total_already_in_room):
        print(f" - {username}")
    if not total_already_in_room:
        print(" - None")

    print("\nSuccessfully invited:")
    for username in set(total_invited):
        print(f" - {username}")
    if not total_invited:
        print(" - None")

    print("\nFailed to invite:")
    for username in set(total_failed):
        print(f" - {username}")
    if not total_failed:
        print(" - None")
1. ======================================================
1. Command Line Argument Handling
1. ======================================================
if len(sys.argv) < 2:
    print("Usage: python3 script.py [--invite | --message | --list-users | --remove | --remove-all]('failed_to_invite'])) [room_id](optional:) username1 username2 ...")
    sys.exit(1)

command = sys.argv[# ======================================================
1. Command Execution
1. ======================================================
if command == '--onboard':
    # Diagnostic print
    print("Onboarding command triggered")

    # Check if enough arguments are provided
    if len(sys.argv) < 3:
        print("Error: Not enough arguments for onboarding. Usage: python3 script.py --onboard [optional: room_id](1]) username")
        sys.exit(1)

    # Check if specific room IDs are provided, else use the combined default IDs
    if sys.argv[room_ids = sys.argv[2:-1](2].startswith('!'):)
        usernames = sys.argv[# Extract the last argument as usernames
    else:
        room_ids = default_onboard_ids
        usernames = sys.argv[2](-1].split()).split()  # Extract the second argument as usernames

    # Diagnostic print
    print(f"Room IDs: {room_ids}")
    print(f"Usernames: {usernames}")

    # Initialize accumulators for summary report
    total_already_in_room = [total_invited = [](])
    total_failed = [for room_id in room_ids:
        print(f"Processing room ID: {room_id}")
        status_report = send_invites(room_id, usernames)

        # Extend accumulators with the results
        total_already_in_room.extend(status_report['already_in_room'](]))
        total_invited.extend(status_report[total_failed.extend(status_report['failed_to_invite']('invited'])))

    # Send welcome messages
    send_welcome_messages(usernames, welcome_message)

    # Print the final summary
    print("Final Summary:")
    print("Already in room:", total_already_in_room)
    print("Successfully invited:", total_invited)
    print("Failed to invite:", total_failed)

if command == '--invite':
    if len(sys.argv) < 3:
        print("Usage: python3 script.py --invite [| --rooms | --space | --spaces](--room) username1 username2 ...")
        sys.exit(1)

    # Determine the room IDs to use based on the argument
    room_flag = any(arg in sys.argv for arg in ['--rooms']('--room',))
    space_flag = any(arg in sys.argv for arg in ['--spaces']('--space',))

    if room_flag and not space_flag:
        room_ids = default_room_ids
    elif space_flag and not room_flag:
        room_ids = default_space_ids
    else:
        room_ids = default_room_ids + default_space_ids

    # Extract the usernames (ignoring the flags)
    usernames = [for arg in sys.argv[2:](arg) if arg not in ['--rooms', '--space', '--spaces']('--room',)]

    # Initialize accumulators before the loop
    total_already_in_room = [total_invited = [](])
    total_failed = [# Loop through each room and send invites
    for room_id in room_ids:
        status_report = send_invites(room_id, usernames)
        total_already_in_room.extend(status_report['already_in_room'](]))
        total_invited.extend(status_report[total_failed.extend(status_report['failed_to_invite']('invited'])))

    # Print the summary
    print("Summary:")
    print("Already in room:", total_already_in_room)
    print("Successfully invited:", total_invited)
    print("Failed to invite:", total_failed)

elif command == '--list-users':
    room_id = default_list_room_id
    members = get_room_members(room_id)
    if members:
        local_usernames = [for member in members.keys()](member.split(':')[0][1:])  # Extract local part and remove '@'
        # Sort users by domain
        irregularchat_users = [for user in local_usernames if user.endswith('irregularchat.com')](user)
        other_users = [for user in local_usernames if not user.endswith('irregularchat.com')](user)
        sorted_users = irregularchat_users + other_users
        print(" ".join(sorted_users))

elif command in ['--remove-all']('--remove',):
    if command == '--remove':
        # For the remove command, the username to remove is expected as the second argument.
        user_to_remove = sys.argv[remove_user_from_room(default_delete_room_id, user_to_remove)

    elif command == '--remove-all':
        # For the remove-all command, no additional arguments are needed.
        remove_all_users_except_self(default_delete_room_id, your_user_id)
        print(f'Removed all users except self from room {default_delete_room_id}.')

1. Add this option to the command execution section
elif command == '--message':
    if len(sys.argv) < 3:
        print("Usage: python3 script.py --message username1 username2 ...")
        sys.exit(1)

    # Extract the usernames from the command line arguments
    usernames = sys.argv[2:](2])

    # Send welcome messages to the specified usernames
    print("Sending welcome messages...\n")
    send_welcome_messages(usernames, welcome_message)
    print("\nFinished sending welcome messages.")

```
