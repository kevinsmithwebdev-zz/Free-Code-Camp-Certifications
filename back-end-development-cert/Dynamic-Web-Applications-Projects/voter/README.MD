## Kevin Smith's Voting App

This was written for the completion of the Back End Certificate at Free Code Camp.

This is my first fullstack app so the file structure is often less than ideal as
I am just finally getting the hang of this. I look forward to making the next
project a little my logical and a little more dry.

I did deviate slightly from the user stories for the following reasons:

* *__User Story:__ As an authenticated user, I can create a poll with any number of possible items.*

Yes, it would have been easy to allow "any number of possible items" and actually took extra
to stop it, but the idea that people create polls with hundreds of choices, rendering them
unusable was too much to bear.

* *__User Story:__ As an authenticated user, if I don't like the options on a poll, I can create a new option.*

Again, from a design perspective, this did not make sense to me. So, I create a poll
that I like and any troll can come in and start adding whatever he wants to my poll?
What if I (as the owner) don't want other options? And how meaningful would it be if,
after hundreds of votes, another option gets added on, starting at zero? It just seems
like a bad idea to me.


I've checked out other people's apps and they lacked these features, so I don't feel too bad.
