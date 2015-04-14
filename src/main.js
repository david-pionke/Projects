requirejs.config({
    paths: {
        'durandal':'../scripts/durandal',
        'plugins' : '../scripts/durandal/plugins',
        'transitions' : '../scripts/durandal/transitions',
		'jquery' : '../scripts/jquery-2.1.3.min',
		'knockout' : '../scripts/knockout-3.3.0.min',
		'text' : '../scripts/text'
    }
});

define(['durandal/system', 'durandal/app', 'durandal/viewLocator'],  function (system, app, viewLocator) {
    //>>excludeStart("build", true);
    system.debug(true);
    //>>excludeEnd("build");

    app.title = 'Durandal Starter Kit';

    app.configurePlugins({
        router:true,
        dialog: true
    });

    app.start().then(function() {
        //Replace 'viewmodels' in the moduleId with 'views' to locate the view.
        //Look for partial views in a 'views' folder in the root.
        viewLocator.useConvention();

        //Show the app by setting the root view model for our application with a transition.
        app.setRoot('viewmodels/shell', 'entrance');
    });
});