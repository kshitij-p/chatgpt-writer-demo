# Preview

https://github.com/user-attachments/assets/b5089cad-63b8-4b03-a0ad-376c2d577774

In case the preview doesn't load for some reason, you can use this link
instead -
https://drive.google.com/file/d/1kQX3fvFHorIPZN8uc1TZN9uYiZ-piaG4/view?usp=sharing

# About

This is my submission for chatgpt writer's take home assignment

# Cases checked

1. The AI icon is visible when linkedin DM chat is focused
1. The AI icon disappears when linkedin DM chat is un-focused
1. The dialog box closes when its backdrop is clicked
1. The dialog box closes when escape is pressed
1. The generate button only works if a prompt is entered
1. The generate button replies with a static prompt after 1 sec (to simulate
   network conditions for the demo) for a reply
1. The regenerate button does nothing as mentioned in the acceptance criteria
1. The insert button inserts the reply given by the AI into the linkedin chat
1. AI button's mounting and unmounting edge cases (dialog backdrop is clicked,
   area outside the linkedin DM's textbox is clicked, etc)

# Undefined Behavior

1. If the textbox already has some content in it and then the AI's reply is
   inserted, then the reply is appended. The requirement doc didnt mention this
   case so I didn't handle this case. If I were to handle this, then this is
   what I think should be done: Since from a UX POV - overwriting what the user
   had entered before instead of appending without a warning would be bad, a
   warning with a prompt to overwrite the reply should be given. There are other
   ways to handle this, each with their own tradeoffs.

# What I would do to further improve the app

1. Handle the undefined behavior mentioned above in a graceful manner
1. Implement the regenerate functionality
1. Use svgr plugin to load the svgs inline through vite instead of hard coding
   the markup
1. Refactor the ui components to be more modular - similar to shadcn (a personal
   preference, since I believe that its the simplest way to write UI while
   allowing for easy one-off modifications)
