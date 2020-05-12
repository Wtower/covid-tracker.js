/**
 * covid_tracker
 *
 * Return live COVID-19 data.
 * @author George Karakostas (9-dev.com)
 * @license MIT
 */

( function( $ ) {

    /* Extend jQuery */
    $.fn.covid_tracker = function() {

        // Assign initial object to use in ajax
        var $this = $( this );

        // Run only once
        if ( $this.hasClass( "covid-tracker-on" ) ) {
            return;
        }

        // Get live data
        $.ajax( { url: "https://coronavirus-tracker-api.herokuapp.com/v2/locations" } )
            .done( function( data ) {
                console.log( data );
                $this.addClass( "covid-tracker-on" )
                    .find( ".covid-tracker-global.covid-tracker-cases" )
                    .text( data.latest.confirmed )
                    .end()
                    .find( ".covid-tracker-global.covid-tracker-deaths" )
                    .text( data.latest.deaths )
                    .end()
                    .find( ".covid-tracker-country" )
                    .each( function() {
                        var country = $( this ).data( "covid-tracker-country" );
                        var latest = data.locations.find( x => ( x.country_code === country ) ).latest;
                        $( this )
                            .filter( ".covid-tracker-cases" )
                            .text( latest.confirmed )
                            .end()
                            .filter( ".covid-tracker-deaths" )
                            .text( latest.deaths );
                    } );

                // Check script counterup present
                if ( $.fn.counterUp ) {
                    $this.find( ".counter" )
                        .counterUp( {
                            delay: 10,
                            time: $this.data( "covid-tracker-counter-time" ) || 5000
                        } );
                }
            } );
    };
    /* eslint-disable no-undef */
} )( jQuery );

// run script on covid-tracker class container
$( ".covid-tracker" ).covid_tracker();
