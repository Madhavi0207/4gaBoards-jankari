Feature: Add Card Successfully
As an admin
I want to add card
So I can easily add my work list


Background:
Given the admin user has navigated to the login page
  | email | password |
  | demo  | demo     |
And the admin user has navigated to the board page
And the user trys to add board and enters following credentials
 |name    |
 |Madhavi |

Scenario: Add Card Successfully
Given the user is in the boards section
When the user clicks the add card button and enters following credentials
  |cardName |
  | Hello    |

Then the card shall be added successfully



# CODE


# login
# add new project
# add new board in the project

# add list
# add card

# enter details
