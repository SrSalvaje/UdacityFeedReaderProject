
 
$(function() {
    /*tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. */
   
    describe("RSS Feeds", function() {
        
        it("are defined", function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
       
        it("urls are defined and have an url", function () {
            for(let f of allFeeds){
                expect(f.url).toBeDefined();
                expect(f.url.length).toBeGreaterThan(0);
            }
        });

        it("check that objects in allFeeds have a name", function () {
            for(let f of allFeeds){
                expect(f.name).toBeDefined();
                expect(f.name.length).toBeGreaterThan(0);
            }
        });
    });

    describe("The menu", function(){
        /* test that ensures the menu element is
         * hidden by default. */
        const b = document.querySelector("body");
        const menu = document.querySelector(".menu-icon-link");
       
        it("check menu is hidden", function () {
            expect(b).toHaveClass("menu-hidden");  
        });
        /*  ensures the menu changes visibility when the menu icon is clicked.*/
        it("Menu toggle on/off", function () {
            //when menu is clicked
            menu.click();
            //and expect it to become visible
            expect(b).not.toHaveClass("menu-hidden");
            //when clicked again
            menu.click();
            //it should become hidden
            expect(b).toHaveClass("menu-hidden");
            //at the end of the test suit hide the menu if it is visible
            if(b.classList.contains("menu-hidden")!== true){ 
                menu.click();
            }
        });
    });
    
  
    describe("Initial Entries", function () {
        /*  test that ensures when the loadFeed function is called and completes its work, 
        *there is at least a single .entry element within the .feed container.*/
        beforeEach(function(done){
            loadFeed(0, done);
        });
        it("loads feed", function () {
            const feed = document.querySelector(".feed");
            expect(feed.children.length).toBeGreaterThan(0);            
        });
        
    });

    


    describe("New Feed Selection", function () {
        /*  a test that ensures when a new feed is loaded by the loadFeed function 
        that the content actually changes. */

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

