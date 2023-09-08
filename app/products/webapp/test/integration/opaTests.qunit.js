sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'capcourse/products/test/integration/FirstJourney',
		'capcourse/products/test/integration/pages/ProductsList',
		'capcourse/products/test/integration/pages/ProductsObjectPage',
		'capcourse/products/test/integration/pages/ReviewsObjectPage'
    ],
    function(JourneyRunner, opaJourney, ProductsList, ProductsObjectPage, ReviewsObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('capcourse/products') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheProductsList: ProductsList,
					onTheProductsObjectPage: ProductsObjectPage,
					onTheReviewsObjectPage: ReviewsObjectPage
                }
            },
            opaJourney.run
        );
    }
);