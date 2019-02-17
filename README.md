# Flickr-app
This application is developed using by me using the Flickr-API and React.js library

The Technology implemented in this App:
1. React
2. React-router
3. BootStrap
4. Flickr-API
5. Lazy loading of Images

This application has the following Pages:
* Search Group Page
* Search Result Page
* Single Page for Group Card

#### Routes:
/groups/  -- shows the list of groups searched by user
/gallery/ -- shows a gallery of photos

This page has a search box. Then group results (just like flickr.com/groups/) as the result page (i.e. the result page contains a gallery of cards where each card specifies a group info). 
Each group card contain its name, avatar and some images of that group and some other information that you may like to show. 
A click on a group card takes the user to /gallery/.

### First Page view when the search is blank
![Group Search Page](https://raw.githubusercontent.com/Prabhnith/Flickr-app/master/screenshots/group_search_Page.PNG)

API test link: https://www.flickr.com/services/api/explore/flickr.groups.search

### After searching some string the Search Result Page looks like this
![Group Search Result](https://raw.githubusercontent.com/Prabhnith/Flickr-app/master/screenshots/group_search_result.PNG)

### Screen 2: /gallery/
An infinite scrolling photo gallery grid view in a staggered grid view fashion. Use Flickr Group API to get a collection of photos and the Flickr Photo Info API to get details of the photos to be displayed. Used page size as 20 and call subsequent pages using the page number as input to the API. Created an adaptive layout that takes care of the orientation & dimensions of the individual photos. 

API test link: https://www.flickr.com/services/api/explore/flickr.groups.pools.getPhotos

### Result Returns a clickable Group card which then click to get the Group Gallery
![Clickable Grouop Card](https://raw.githubusercontent.com/Prabhnith/Flickr-app/master/screenshots/clickable_group_card.PNG)

### Gallery Page with Lazy Loading Implemented to get the available images of the Group
/gallery/ -- shows a gallery of photos

![Gallery page with lazy loading](https://raw.githubusercontent.com/Prabhnith/Flickr-app/master/screenshots/gallary_page_with_lazy_loading.PNG)

### TODO List
[ ] As you start typing, the search box should display search recommendations of groups as user types.

[ ] Show photo, title, short description, owner of the photo, number of comments, number of views, and date uploaded.

[ ] On photo click, it should take the user to /overview/ page.

[ ] /overview/ : 
Show a pie chart of the number of likes and another pie chart showing the number comments for the photos in the group you decided to display. 
Note: Take the top 10 photos in a group and combine the likes/comments of the rest of the photos into “other”. Hence, your pie chart needs to have have totally 11 divisions.
