var React = require('react');
var Clock = require('Clock');
var CountdownForm = require('CountdownForm');
var Controls = require('Controls');

var Countdown = React.createClass({
    // create an initial state
    getInitialState: function () {
        return {
            count: 0,
            countdownStatus: 'stopped'
        };
    },
    // when a change in state or props  is detected, this method gets called automatically
    componentDidUpdate: function (prevProps, prevState) {
        // if current state is not equal to prev state ('stopped')
        if (this.state.countdownStatus !== prevState.countdownStatus) {
            switch (this.state.countdownStatus) {
                case 'started':
                    this.startTimer();
                break;
                case 'stopped':
                    this.setState({count: 0});
                case 'paused': 
                    clearInterval(this.timer)
                    this.timer = undefined;
                    break;
            }
        }

    },
    // fires right before the component gets removed from the DOM
    componentWillUnmount: function () {
        // the moment when user navigates away from component, clear the timer
        clearInterval(this.timer);
        this.timer = undefined;
    },
    startTimer: function() {
        // every 1 sec, - 1sec from the current count until it reaches 0
        this.timer = setInterval(() => {
            var newCount = this.state.count - 1;
            this.setState({
                // makes sure that count doesnt go below 0
                count: newCount >= 0 ? newCount : 0
            });

            if(newCount === 0){
                this.setState({countdownStatus: 'stopped'});
            }
        }, 1000);
    },
    /* when user submits the form, it will change the 'count' state to 
        whatever the user inputted (defined as seconds) */
    handleSetCountdown: function (seconds) {
        this.setState({
            count: seconds,
            countdownStatus: 'started'
        });
    },
    handleStatusChange: function (newStatus) {
        this.setState({countdownStatus: newStatus});
    },
    render: function () {
        // grab the variables from the state
        var {count, countdownStatus} = this.state;
        // a function that stopped
        var renderControlArea = () => {
            if(countdownStatus !== 'stopped'){
                return <Controls countdownStatus={countdownStatus} onStatusChange={this.handleStatusChange}/>
            } else {
                {/* CountdownForm component with a prop onSetCountdown which will execute 
                    a method here called handSetCountdown when it has been passed valid data
                    from CountdownForm.jsx */}
                return <CountdownForm onSetCountdown={this.handleSetCountdown}/>
            }
        };

        return(
            <div>
                <Clock totalSeconds={count}/>
                {renderControlArea()}
            </div>
        );
    }
});

module.exports = Countdown;