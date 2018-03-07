# GiphEaze

This single page web app displays the GIFs on [Giphy](https://giphy.com/). Users visiting the website can view trending GIFs on the homepage and are able to search for GIFs and see a list of results. The user can click on a GIF to see more details on the Giphy website.

### A/B Tests

I implemented two A/B tests. One test varied the content, shape, and size of a search item, the other varied the way in which users obtained more results. Both tests can be independently selected and do not get in the way of each other's findings.

#### GIF cells

The goal of this test is to measure the difference in engagement and retention (clicks on GIF items) when users see more images on the screen (test A) or more information - such as rating, title, user, etc - on the screen (test B).

**A**: The search result container is made up of a grid of GIFs. There is no information displayed; only the GIF itself is rendered

![GIF cell test A](/static/cell-A.png)

**B**: The search result container is made up of rows; each row shows the GIF as well as some metadata associated with the GIF. There is also a clickable link to the source in the search results.

![GIF cell test B](/static/cell-B.png)

**Expected results**: I predict that users will be more engaged with test A - the grid with images only. My theory is that, unlike restaurants or movies, users do not care about what other people think about GIFs. With GIFs, users can easily see the entire clip, determine their opinions about it quickly, and decide if they want to share it. Knowing information such as the title of the GIF does not add to the user's experience. In fact, it could take away from user's by taking up valuable screen space. The more images that can fit on one screen, the easier it is for users to view results and the more pleasant the entire experience.

#### Pagination

In this app, users initially see one single page full of results. To see more GIFs, they can either click on arrows to see the next page of results (test A) or scroll to the bottom of the page and see more results automatically, an experience typically known as infinite scrolling (test B). The success of each test is determined by how many extra pages are loaded in a user session.

**A**: Users must click left or right arrows to see the next page of GIFs.

![GIF cell test A](/static/cell-A.png)

**B**: More results are loaded automatically when user scrolls to the bottom of the page.

![GIF cell test B](/static/cell-B.png)

**Expected results**: I expect the automatic loading of more pages to perform better in terms of user engagement. It is less effort to simply scroll than it is to click on a small icon - or a big icon for that matter. In general, users want to do less work, and anything that helps further that notion does better on a web app.

### Possible improvements

- Use of a state organizer like Redux to store data such as search queries
- Implement actual logging and analysis of results with a A/B testing framework such as PlanOut or Optimizely
