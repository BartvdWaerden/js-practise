import getRadio from './getRadio.js'


let calories = (function () {

    /**
     *
     */

    let weight,
        length,
        age,
        gender,
        training,
        pal;


    /**
     * [defaults description]
     * @type {Object}
     */

    const defaults = {

        form: document.querySelector( 'form[name=calories]' ),

        calsPerGram: {
            fat: 9,
            protein: 4,
            carbs: 4,
        },

        fiber: 0.014,

        classes: {
            training: '.training',
            rest: '.rest',
            fat: '.fat',
            protein: '.protein',
            carbs: '.carbs',
            fiber: '.fiber'
        }

    };


    /**
     * [_harrisBenedict description]
     * @return {[type]} [description]
     */

    let _harrisBenedict = function () {

        weight = parseFloat( document.querySelector( 'input[name=weight]' ).value ); // Make global?
        length = parseFloat( document.querySelector( 'input[name=length]' ).value ); // Make global?
        age = parseInt( document.querySelector( 'input[name=age]' ).value ); // Make global?

        gender = getRadio.value( 'calories', 'gender' );

        if ( gender === 'male' ) {

            let value = 88.362 + ( 13.397 * weight ) + ( 4.799 * length) - ( 5.677 * age );

            return value;

        } else if ( gender === 'female' ) {

            let value = 447.593 + ( 9.247 * weight ) + ( 3.098 * length) - ( 4.33 * age );

            return value;
        }
    }


    /**
     * [_restingMetabolicRate description]
     * @return {[type]} [description]
     */

    let _restingMetabolicRate = function () {

        pal = getRadio.value( 'calories', 'pal' ); // Make global?

        let value = _harrisBenedict() * pal;
        return value;

    }


    /**
     * [_training description]
     * @return {[type]} [description]
     */

    let _training = function () {

        training = getRadio.value( 'calories', 'training' ); // Make global?
        gender = getRadio.value( 'calories', 'gender' ); // Make global?

        if ( training === 'fat' ) {

            if ( gender === 'male' ) {

                let training = _restingMetabolicRate() - ( _restingMetabolicRate() * .18 );
                let rest = _restingMetabolicRate() - ( _restingMetabolicRate() * .22 );

                return {
                    training: training,
                    rest: rest
                };


            } else if ( gender === 'female' ) {

                let training = _restingMetabolicRate() - ( _restingMetabolicRate() * .18 );
                let rest = _restingMetabolicRate() - ( _restingMetabolicRate() * .22 );

                return {
                    training: training,
                    rest: rest
                };

            }

        } else if ( training === 'muscle' ) {

            if ( gender === 'male' ) {

                let training  = _restingMetabolicRate() * 1.2;
                let rest  = _restingMetabolicRate() * 1.1;

                return {
                    training: training,
                    rest: rest
                };

            } else if ( gender === 'female' ) {

                let training  = _restingMetabolicRate() * 1.1;
                let rest  = _restingMetabolicRate() * 1.05;

                return {
                    training: training,
                    rest: rest
                };

            }

        }

    }


    /**
     * [_macros description]
     * @return {[type]} [description]
     */

    let _macros = function () {

        let calories = _training();
        let caloriesTraining = calories.training;
        let caloriesRest = calories.rest;

        let fat = {
            training: ( caloriesTraining * .3 ) / defaults.calsPerGram.fat,
            rest: ( caloriesRest * .3 ) / defaults.calsPerGram.fat
        };

        let protein = weight * 2.2;

        let carbs = {
            training: ( caloriesTraining - ( ( fat.training * defaults.calsPerGram.fat ) + ( protein * defaults.calsPerGram.protein ) ) ) / defaults.calsPerGram.carbs,
            rest: ( caloriesRest - ( ( fat.rest * defaults.calsPerGram.fat ) + ( protein * defaults.calsPerGram.protein ) ) ) / defaults.calsPerGram.carbs
        };

        let fibre = {
            training: caloriesTraining * defaults.fiber,
            rest: caloriesRest * defaults.fiber
        };

        return {
            caloriesTraining: caloriesTraining,
            caloriesRest: caloriesRest,
            carbs: carbs,
            protein: protein,
            fat: fat,
            fibre: fibre
        };
    }


    /**
     * [_appendData description]
     * @return {[type]} [description]
     */

    let _appendData = function ( event ) {

        event.preventDefault();

        let macros = _macros(),
            caloriesTraining = document.querySelector( defaults.classes.training ),
            caloriesRest = document.querySelector( defaults.classes.rest ),
            carbs = document.querySelector( defaults.classes.carbs ),
            protein = document.querySelector( defaults.classes.protein ),
            fat = document.querySelector( defaults.classes.fat ),
            fiber = document.querySelector( defaults.classes.fiber );


        // bind results to DOM
        caloriesTraining.innerHTML =  macros.caloriesTraining;
        caloriesRest.innerHTML =  macros.caloriesRest;
        carbs.innerHTML =  'training: ' + macros.carbs.training + ' rest: ' + macros.carbs.rest;
        protein.innerHTML =  macros.protein;
        fat.innerHTML = 'training: ' + macros.fat.training + ' rest: ' + macros.fat.rest;
        fiber.innerHTML =  'training: ' + macros.fibre.training + 'rest: ' + macros.fibre.rest;

    };


    /**
     * [_bindEvents description]
     * @return {[type]} [description]
     */

    let _bindEvents = function () {

        defaults.form.addEventListener( 'submit', _appendData, false );

    }


    /**
     * [init description]
     * @return {[type]} [description]
     */

    let init = function () {

        // public
        _bindEvents();

    };

    return {

        init: init

    };

})();

export default calories;
