# Learning log

|Date||
|:---:|:---|
||Learnt, thoughts, progress, ideas, links|

[__************** 2018 Objectives **************__](https://github.com/Syknapse/My-Learning-Tracker/blob/master/log.md#28-dec-17)

----------------------------------------------------------

## Fri 26 Jan 18

__** Introduction to React **__: Today I made my first `Hello World` in React, and I absolutely love the way it works and the idea behind it. I followed these two parts of a tutorial:
+ [Learning React With Create-React-App (Part 1)](https://medium.com/in-the-weeds/learning-react-with-create-react-app-part-1-a12e1833fdc)
+ [Learning React With Create-React-App (Part 2)](https://medium.com/in-the-weeds/learning-react-with-create-react-app-part-2-3ad99f38b48d)

![react hello world](https://user-images.githubusercontent.com/29199184/35457331-d1aca756-02d8-11e8-8314-442d6361035f.gif)

----

## Thurs 25 Jan 18

I spent most of the past few days working along with Wes Bos's #JavaScript30 course and learning some very neat skills. Today I have been getting myself ready for an intensive React weekend. I'm keen on getting familiar with it as soon as possible. Also yesterday I applied for a dev job properly for the first time!

----

## Fri 19 Jan 18

It's been a while since my last log. As expected the return to work meant that I have been swamped and had little time. Still I have not stopped from coding daily and managed more than an hour most days.

Apart from few bits here and there the main work I have done since my last log was to improve and fix my Pixel Art project. Even though it went way beyond my own time limit, I was learning so much I just found it useful to keep on pushing. The biggest skills I have developed over this time is finding bugs, and then figuring out ways to solve them:

+ The process of narrowing down the possible causes of a bug and testing until the exact cause is determined.
+ The process of finding a solution. Is it something that can be fixed writing better code or do I need a new logic to fix it?

Some of the problems, bugs and solutions I have dealt with these past days:

![Pixel Art Maker controls](https://user-images.githubusercontent.com/29199184/35164257-fe5a0116-fd49-11e7-9a7e-74373a8ef295.png)

+ Using manual input and then clicking on the grid builder buttons (+/- rows/columns) only added/removed 1 row/column instead of the value entered and desynchronised the two. The solution was to make the button's own native value always synced to the input.

+ Then to make sure the right number of rows/columns is added or removed I implemented a function that counts the current rows and columns on the grid, compares it to the input value and returns the difference. This value is then used to determine what should be added or removed.

+ This also allowed me to stop the unexpected behaviour produced when manual input was increased followed by clicking the opposite grid builder button. This was solved by making every event check for the current grid and input and create that grid before adding or removing. This ensured that whatever combination of manual input and buttons used it will always result in a grid exactly the size displayed in the inputs.

+ Implemented a build grid function on `enter` on inputs. And to fix problem caused when both inputs are changed before clicking `Make Grid` implemented a solution where as soon as the input looses focus the build grid is fired thus ensuring that make grid is not dealing with two inputs.

+ The final major bug was the buttons stopped working on mobile because of the change from `click` event to `mousedown` event to enable continuous building. This was fixed using the `touchstart` event.

+ [These are the commits](https://github.com/Syknapse/Pixel-art-maker/commits/master) that show the progress of these ideas.

----

## Sat 6 Jan 18

+ Udacity course completely finished.
+ [Pixel Art Project version 1.0](https://syknapse.github.io/Pixel-art-maker/) is ready.
+ Day 1 of #100DaysOfCode Round 3.

I spent most of the day trying to implement a feature where adding rows and columns with the builder don't reset the drawing. I advanced a lot and managed to get the basic function working. But conflicts produced when the number input was manually changed complicated the process and I had to abandon it in a separate branch for another time because I wanted at least the 1st version done.<br>
I also tried to fix the little bug earlier where a new color cannot be added on top of an older one before deleting it in single click mode. But I also decided to leave it for a later stage, when I will refactor and improve the project.

For now The long hours of holiday are over, on Monday I'm back to work. But I'm very glad I finished the course before hand.

----

## 5 Jan 18

Bug fixing day. Spent most of the day trying to improve and fix my code on the Pixel Art project.

**Bug 1**: Found by a fellow student in the feedback forum. Described as such:
> 1. Create new grid
> 1. Select another color i.e. red
> 1. Reset the grid
> 1. Create new grid
> 1. The selected color is shown as black, but if you click on the grid its painting the color selected in step 2.

This one was simple and obvious. I wasn't updating the `selectedColor` variable with the new color input value on reset.

```js
function reset(){
    clearGrid();
    colorInput.val('#000000');
+   selectedColor = colorInput.val();
    inputRows.val(10);
    inputColumns.val(10);
}
```

**Bug 2**: This one was a nightmare, I couldn't understand what was causing it. And when I did I didn't know how to fix it, and in the end it was, as expected, simple to solve!

Basically when clicking individual cells, sometimes the color flickered or didn't show at all. After a long session of testing, and narrowing down the possible causes I finally found the culprit. It was the fact that a `mousemove` was firing because of a tiny mouse move, and when the `mouseup` event was occurring within the same cell it caused the `mouseIsDown` variable to register `false` and counteract the add color function.<br>
The solution seems painfully obvious now, but it took me a very long time with a lot of attempts trying to find a way to register the starting and ending cell between clicks. But eventually I realised that a simple change of event to `mouseleave` is the only thing I needed.

All in all a tiring session, but My project is completed and I'm thrilled. Just need to style it now.

----

## 4 Jan 18

Great advance on my project. Figured out the logic to be able to erase on click, then how to draw by click & drag, then how to erase like this too. Squashed many bugs on the way, and did some major refactoring.

I'm very proud of figuring out how to turn this ugly code repeated for each of the four buttons into a much more elegant and efficient one below.

```diff
-addRowBtn.click(function(){
-    inputHeight.val(function(i, val) {
-        return val*1+1
-    });
-    makeGrid();
- });

+addRowBtn.click(function(){
+    gridBuilder(increment, inputRows);
+});


+function increment (i, val) {
+    return +val +1
+}

+function decrement (i, val) {
+    return +val -1
+}

+function gridBuilder (scale, axis){
+    axis.val(scale);
+    makeGrid();
+}
```

I managed to solve the erase problem by creating an odd/even function using the `data()` method to add color on first click and go back to default on second click.

```js
// draw/erase function
function draw (){
    let clicks = $(this).data('clicks');
    if (!clicks){
        // Change background color of cell
        $(this).css('background-color', selectedColor);
    } else {
        // On second click return color to default (erase)
        $(this).css('background-color', '');
    }
    // Fire `if` event on odd clicks
    $(this).data('clicks', !clicks);
}
```

Once I implemented the click and drag drawing, I managed to fix the bug that was causing `mouseup` event not to fire when the event happened between cells or outside of the table by using `event.preventDefault()` on `mousedown` and adding a `mouseleave` event to the table.

![pixelart2](https://user-images.githubusercontent.com/29199184/34581566-3672338a-f191-11e7-82ce-b7b043133dce.gif)

----

## 3 Jan 18

An epic session on the **Pixel Art Maker** final project and huge progress. Finished much more than I was expecting. Completed all major features without looking at other similar projects. Extremely happy that I managed to solve all the logic required on my own. Then I started trying out more advanced features. I had a bit of difficulty creating a feature that adds and removes rows or columns directly. But in the end, with a bit of Stack Overflow help I figured it out. Great day!

![Pixel Art Maker](https://user-images.githubusercontent.com/29199184/34535567-95422c64-f0c2-11e7-881a-fd1edc1d3195.gif "All the functionalities by the end of this session")

Tomorrow, I will experiment with few more advanced functionalities, work on the style and hopefully have it finished by the end of the day.

----

## 2 Jan 18

Back from a day off. Finished the Udacity course content and I'm no won the final project; Pixel Art Maker. Everything is setup and ready to go tomorrow. I'm really looking forward to doing it and finishing the course completely before moving on to more in depth JavaScript for my #OperationJavaScript objective.

Practiced jQuery DOM manipulation and event listeners and found it useful.
Read the Udacity style guides for HTML, CSS, JavaScript, and Git which gave me a good insight on clean code writing.

read [How I got to 200 productive hours a month](https://qotoqot.com/blog/improving-focus/) and [The Reddit post that initiated the "No Zero Days" idea](https://www.reddit.com/r/getdisciplined/comments/1q96b5/i_just_dont_care_about_myself/cdah4af/) Which I though resonated with the way I have been working on coding for the past few months, and more generally over the last few years of changing negative habits and building positive ones.

----

## 31 Dec 17

Finished the introduction to Javascript on my Udacity course with more work on objects. And started the jQuery section. Advancing at a good pace. Participation in the forum is bringing in a wider understanding of the subjects.<br>
Exercises like this one in the image have really made me understand methods and how versatile objects can be.

![object](https://user-images.githubusercontent.com/29199184/34463352-4a8d6956-ee59-11e7-9db6-f0b6f4c13974.PNG)

**That's a wrap 2017. See you in 2018!**

----

## 30 Dec 17

Continued working on the **Udacity Google Scholarship** course: mainly [arrays](https://github.com/Syknapse/Google-Challenge-Scholarship-Front-End-Web-Dev/blob/master/short-exercises/arrays.js) and [objects](https://github.com/Syknapse/Google-Challenge-Scholarship-Front-End-Web-Dev/blob/master/short-exercises/objects.js).

Since this is not the first time I'm learning some of these concepts I feel I am understanding them on a deeper level, and I feel good about being able to solve most of the exercises with little or no help. Most importantly I feel I can visualise the solution and understand it.<br>
I was especially amazed to discover how you can create a `method()` inside of an object and call it.

![Nested arrays loops](https://user-images.githubusercontent.com/29199184/34457123-0a10bf88-eda8-11e7-9902-e893ff846726.png "Replace numbers in nested arrays with odd or even")


----

## 29 Dec 17

Worked on the **JavaScript** section in the **Udacity Google Scholarship** course: [Functions](https://github.com/Syknapse/Google-Challenge-Scholarship-Front-End-Web-Dev/blob/master/short-exercises/functions.js "Functions practice document") and arrays.<br>
Managed to solve most of the problems without help. Not easy, but **#OperationJavaScript** is on 💪.

![coding a triangle](https://user-images.githubusercontent.com/29199184/34445183-74d8902e-ecd2-11e7-8505-89f662a2c689.png)

Started on the first two screen casts of **Scrimba's Learn CSS Grid** course. I'm amazed by the platform where you can edit the code right in the screen!

All in all a **good** all-day session.

----

----

## 28 Dec 17

**#2018Objectives starts today:**

### Operation JavaScript:

+ Learn and practice JS with the aim of being able to do most basic operations and algorithms.
+ Practice, practice, practice.
+ Start learning React (unless something radically changes the panorama in the next couple of months!)

### Code Everyday

+ Commit to coding everyday.
+ This log becomes a daily log to add everything I'm working on and learning.
+ Finish important and relevant courses.
+ Work on self-initiated or collaboration projects to put skills into practice.

### Get a Web Dev Job

Take the necessary steps to get my first Web Developer job:

+ Apply for jobs.
+ Contact people who can help.
+ Prepare for interviews.
+ Learn any necessary additional skills or technologies.

----

----

## 24 Dec 17

Spent the last few weeks working on the Udacity's Google Challenge Scholarship course. Then built a [full tutorial](https://github.com/Syknapse/Contribute-To-This-Project) for begginers to make their first contribution on GitHub. Spent a good amount of time improving it and learning more markdown in the process and dealing with the PRs I'm getting (17 contributions so far). Also added a custom JS feature to the [contribution page](https://syknapse.github.io/Contribute-To-This-Project/) that counts the number of contributions and displays the number in a counter with a count up style.

![contributions counter](https://user-images.githubusercontent.com/29199184/34326362-caebaf4a-e8aa-11e7-9415-0c88994aa5fc.gif)

## 27 Nov 17

In the last few days I have learnt the basics of AJAX and some more GIT on Tree House. Also installed VS Code, read documentation and watched tutorial videos and started using it.

## 22 Nov 17

Completed [Workflow Tools for Web Developers](https://www.lynda.com/Web-Design-tutorials/Workflow-Tools-Web-Development/533305-2.html) by [Christina Truong](https://twitter.com/christinatruong). Very useful.

Browsers & testing - advanced inspector/console - editor code snippets - CSS preprocessors & compilers - task runners

## 20 Nov 17

completed [Learning Git and GitHub](https://www.lynda.com/Git-tutorials/Up-Running-Git-GitHub/409275-2.html) by [Ray Villalobos](https://twitter.com/planetoftheweb). very good.

Git init - add - commit - staging - deleting - log - branches - states

GitHub cloning - cloning branches - templates

Gitbash to GitHub push and pull

## 17 Nov 17

Completed [CSS Essential Training 3](https://www.lynda.com/CSS-tutorials/CSS-Essential-Training-3/609030-2.html) by [Christina Truong](https://twitter.com/christinatruong). Excellent.

Grid design - CSS grid and flexbox - retina and high density displays - images - svg - transitions - animations - shapes - responsive and fluid typography - advanced attribute selectors - accessibility - ARIA - style guides - refactoring guide

## 15 Nov 17

Completed [CSS Essential Training 2](https://www.lynda.com/CSS-tutorials/CSS-Essential-Training-2/569189-2.html) by [Christina Truong](https://twitter.com/christinatruong). Excellent.

Advanced selectors - float & display - positioning - z-index - CSS reset - background & gradients -

responsive design: mobile first, gracefull degredation, progressive enhancement, fluid, adaptive, media queries, testing responsive,

## 10 Nov 17

Completed [Learn Enough Command Line to Be Dangerous](https://www.learnenough.com/command-line-tutorial). Great tutorial.

## 5 Nov 17

Command line. Worked on [Getting to Know the Command Line](https://www.davidbaumgold.com/tutorials/command-line/) and [Learn Enough Command Line to Be Dangerous](https://www.learnenough.com/command-line-tutorial)

## 3 Nov 17

Read [My journey to becoming a web developer ](https://medium.freecodecamp.org/my-journey-to-becoming-a-web-developer-from-scratch-without-a-cs-degree-2-years-later-and-what-i-4a7fd2ff5503) Which contains a ton of learning resources and recommendations.

