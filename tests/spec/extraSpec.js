/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe("RSS Feeds", function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it("are defined", function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it("urls are defined and have an url", function () {
            for(let f of allFeeds){
                expect(f.url).toBeDefined();
                expect(f.url.length).toBeGreaterThan(0);
            }
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it("check that objects in allFeeds have a name", function () {
            for(let f of allFeeds){
                expect(f.name).toBeDefined();
                expect(f.name.length).toBeGreaterThan(0);
            }
        });
    });

    describe("The menu", function(){
        const b = document.querySelector("body");
        const menu = document.querySelector(".menu-icon-link");
        /* TODO: Write a new test suite named "The menu" */

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it("check menu us hidden", function () {
            expect(b).toHaveClass("menu-hidden");  
        });
        /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it("Menu toggle on/off", function () {
            
            //if the menu is hidden
            if(b.classList.contains("menu-hidden")){
                //click it
                menu.click();
                //and expect it to become visible
                expect(b).not.toHaveClass("menu-hidden");
                //if it is already visble
            }else if(b.classList.contains("menu-hidden")!== true){
                menu.click();
                //it should become hidden
                expect(b).toHaveClass("menu-hidden");
            }

            //at the end of the test suit hide the menu if it is visible
            if(b.classList.contains("menu-hidden")!== true){ 
                menu.click();
            }
        });
    });
    
    /* TODO: Write a new test suite named "Initial Entries" */
    describe("Initial Entries", function () {

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done){
            loadFeed(0, done);
        });
        it("loads feed", function () {
            const feed = document.querySelector(".feed");
            expect(feed.children.length).toBeGreaterThan(0);            
        });
        
    });

    

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe("New Feed Selection", function () {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        const feedContent = document.querySelector(".feed").children;//gets the links of the currently loaded feed
        let feed1=[];
        let feed2=[];
        const uniqueLinks= new Set([]);//use set to ensure that links from each feed are not duplicates
       
        
        beforeEach(function(done){
            loadFeed(0, function () {//load first feed
                Array.from(feedContent).forEach(function(entry){
                    feed1.push(entry);//store the links in array
                    uniqueLinks.add(entry);//add the links to the set
                });
                loadFeed(1,done);//load the second feed and let jasmine know its done     
            });  
        });

        it("Feeds load new content", function () {
            Array.from(feedContent).forEach(function(entry){
                feed2.push(entry);//store the links of the second feed in array
                uniqueLinks.add(entry);//add them to the set
            });
            //because sets dont allow duplicate values, if the links from each feed stored in the arrays are unique,
            //the size of the set should be the same as length of the sum of both arrays, otherwise we know that
            //there is a duplicate link
            expect(feed1.length+feed2.length).toBe(uniqueLinks.size);   
        });
        
    });

}());

