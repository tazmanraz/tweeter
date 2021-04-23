# Tweeter Project

Tweeter is a simple, single-page Twitter clone. I worked on the front end using HTML, CSS, JavaScript, jQuery, and AJAX.

## Final Product

!["Screenshot of error tweet"](https://github.com/tazmanraz/tinyapp/blob/master/docs/pic1.PNG)
!["Screenshot of responsivity"](https://github.com/tazmanraz/tinyapp/blob/master/docs/pic2.PNG)

## Dependencies

- body-parser
- chance
- express
- md5
- Node 5.10.x or above

## Getting Started

- Install all dependencies (using the `npm install` command).
- Run the development web server using the `node express_server.js` command.

## Bug Fixes, Features to Work on, and Notes

- ES5 formatting was consistently used so arrow functions were avoided. This is because I couldn't get one of the jQuery functions working with arrow functions.
- Currently working on separating my CSS so it's not one long stylesheet on layout.css. Order matters when certain CSS are called so I have to be careful when refactoring this.
- The client.js could be cleaned up by moving the helper functions to a separate file. For best practises, the client.js file should only have its primary function in there.
- Working on a desktop+ dimensions on media queries. A max width needs to be specified. I can't imagine this page looking pretty on a widescreen TV.
- Need to figure out a way to lock the textbox. Currently users can manipulate the size of it.
- Some minor tweaks and adjustments required to make things look nicer such as: user display header, fonts, nicer looking error messages.
- The stretch components of leading to top of page (should be able to do by referencing local hrefs) and a toggle for the textarea.

