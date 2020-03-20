
# Description

Task is a project management tool run from the command line. It allows team members to create and assign tasks. The data is saved as a text file that can be pushed to any git server.

## Project

### File Organization

From the beginning, we wanted to create an application library that could be portable to different platforms and their consoles. Thus, we split up the project into three Visual Studio projects managed by a single solution. These were: Task (the common static library), TaskApp, and TaskTests. The TaskApp project contained the main entry point into the console process. While the goal was to put all console-specific code into TaskApp, it did not really turn out that way. In the end, combining the code between the static library and front-end console process forced us to add some Windows32 specific code into the static library.

### Hash Table

I implemented a hashed dictionary as the hash table for our project.

## Breakthroughs

### Continuous Integration

One of the most enjoyable things I learned while managing the project was continuous integration. This was the first group programming project that I have been involved in, so I was a little anxious about how successfully run the project.

### SHA-1

In an effort to integrate into git workflow as much as possible, we decided to use SHA-1 hashes to identify task entries. These hashes should look familiar to anyone who has used git before. Any number of unique characters can be used to identify and retrieve a task object. (These are currently searched linearly).

## Takeaways

My project management skills need improvement. While merging code into a cohesive program went well, I think still earlier communication would have served the team better. After a large push, I realized that another team member's semantic style could be very different from mine. This took me by surprise, especially the use of the std's iterator construct.

