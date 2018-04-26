var React = require('react');
var Clock = require('Clock');
var Controls = require('Controls');

var Timer = React.createClass ({
    // create an initial state
    getInitialState: function () {
        return {
            count: 0,
            countdownStatus: 'paused'
        };
    },
    // when a change in state or props  is detected, this method gets called automatically
    componentDidUpdate: function (prevProps, prevState) {
        // if current state is not equal to prev state ('stopped')
        if (this.state.countdownStatus !== prevState.countdownStatus) {
            switch (this.state.countdownStatus) {
                case 'started':
                    this.startTiming();
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
    // adds a second to the clock every second
    startTiming: function () {
        this.timer = setInterval(() => {
            var newCount = this.state.count + 1;
            this.setState({count: newCount});
        }, 1000);
    },
    // fires right before the component gets removed from the DOM
    componentWillUnmount: function () {
        // the moment when user navigates away from component, clear the timer
        clearInterval(this.timer);
        this.timer = undefined;
    },
    handleStatusChange: function (newStatus) {
        this.setState({countdownStatus: newStatus});
    },
    render: function () {
        // grab the variables from the state
        var {count, countdownStatus} = this.state;

        return(
            <div>
                <h1 className="page-title">Timer App</h1>
                <Clock totalSeconds={count}/>
                <Controls countdownStatus={countdownStatus} onStatusChange={this.handleStatusChange}/>
            </div>
        )
    }
});

module.exports = Timer;