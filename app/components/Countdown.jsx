var React = require('react');
var Clock = require('Clock');
var CountdownForm = require('CountdownForm');

var Countdown = React.createClass({
    // create an initial state
    getInitialState: function () {
        return {count: 0};
    },
    /* when user submits the form, it will change the 'count' state to 
        whatever the user inputted (defined as seconds) */
    handleSetCountdown: function (seconds) {
        this.setState({
            count: seconds
        });
    },
    render: function () {
        // grab the variables from the state
        var {count} = this.state;
        return(
            <div>
                <Clock totalSeconds={count}/>
                {/* CountdownForm component with a prop onSetCountdown which will execute 
                    a method here called handSetCountdown when it has been passed valid data
                    from CountdownForm.jsx */}
                <CountdownForm onSetCountdown={this.handleSetCountdown}/>
            </div>
        );
    }
});

module.exports = Countdown;