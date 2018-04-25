var React = require('react');

var CountdownForm = React.createClass({
    onSubmit: function (e) {
        // this will prevent the current page from refereshing when the form is submitted
        e.preventDefault();
        var strSeconds = this.refs.secondsInput.value;

        // if strSeconds only contain numbers
        if (strSeconds.match(/^[0-9]*$/)) {
            this.refs.secondsInput.value = '';
            /* use the parent's props (onSetCountdown is a prop defined in Countdown.jsx) that 
            will be passed down to here, and then parse it into Int */
            this.props.onSetCountdown(parseInt(strSeconds, 10));
        }
    },
    render: function () {
        return (
            <div>
                {/* onSubmit will take a jsx method. 
                    ref is used to define a reference to the element */}
                <form onSubmit={this.onSubmit} ref="form" className="countdown-form">
                    <input type="text" ref="secondsInput" placeholder="Enter your time in seconds."/>
                    <button className="button expanded">Start</button>
                </form>
            </div>
        );
    }
});

module.exports = CountdownForm;