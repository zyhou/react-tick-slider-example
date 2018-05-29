import React, { Component, Fragment } from 'react';
import classnames from 'classnames';
import glamorous from 'glamorous';

import TickSlider from 'react-tick-slider';

import { Circle, Slidebar } from './components';

const rootStyle = {
    borderRadius: 10,
    cursor: 'pointer',
    height: 10,
    outline: 'none',
    padding: '20px 0',
    position: 'relative',
    width: '100%',
};

const Container = glamorous.div({
    padding: '0 20px',
    height: '100%',
    width: '500px',
});

const CircleContainer = glamorous.div({
    height: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%',
});

const BulletPointContainer = glamorous.div(
    {
        alignItems: 'center',
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        position: 'absolute',
    },
    ({ position, width }) => ({
        width: `${width}%`,
        left: `calc(${position}% - ${width / 2}%)`,
    }),
);

const bulletSize = 10;

export const BulletPoint = glamorous.span({
    backgroundColor: 'grey',
    borderRadius: '50%',
    height: bulletSize,
    outline: 'none',
    width: bulletSize,
});

export default class MyTickSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 2,
            options: [
                {
                    label: 'value 1',
                    value: 1,
                },
                {
                    label: 'value 2',
                    value: 2,
                },
                {
                    label: 'value 3',
                    value: 3,
                },
            ],
        };
    }

    handleKeyPress = (selectChoice, choice) => e => {
        if (e.key === 'Enter') {
            selectChoice(choice);
        }
    };

    handleValueChange = value => {
        console.log('new value', value);
        this.setState({ value });
    };

    render() {
        const { options, value } = this.state;
        return (
            <Container>
                <TickSlider
                    rootStyle={rootStyle}
                    options={options}
                    value={value}
                    onValueChange={this.handleValueChange}
                >
                    {({ choices, selectedChoice, selectChoice }) => (
                        <Fragment>
                            <Slidebar />
                            <CircleContainer>
                                {choices.map(choice => (
                                    <BulletPointContainer
                                        key={choice.value}
                                        onKeyPress={this.handleKeyPress(
                                            selectChoice,
                                            choice,
                                        )}
                                        position={choice.position}
                                        width={100 / choices.length}
                                    >
                                        <BulletPoint
                                            aria-label={choice.label}
                                            aria-pressed={
                                                selectedChoice &&
                                                selectedChoice.value ===
                                                    choice.value
                                            }
                                            role="button"
                                            tabIndex={0}
                                            title={choice.label}
                                        />
                                    </BulletPointContainer>
                                ))}
                                <Circle
                                    className={classnames({
                                        active: selectedChoice,
                                    })}
                                    position={
                                        selectedChoice
                                            ? selectedChoice.position
                                            : 0
                                    }
                                    withTransition
                                />
                            </CircleContainer>
                        </Fragment>
                    )}
                </TickSlider>
            </Container>
        );
    }
}
