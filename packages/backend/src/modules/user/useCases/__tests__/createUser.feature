Feature: Create user
    Scenario: Valid user details
        Given I provide valid details
        When I attempt to create a user
        Then I should get a successful response

    Scenario: Invalid id
        Given I provide an invalid id
        When I attempt to create a user
        Then I should get an invalid details error

    Scenario: Invalid phone number
        Given I provide an invalid phone number
        When I attempt to create a user
        Then I should get an invalid details error