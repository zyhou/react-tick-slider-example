import React, { Component, Fragment } from 'react';
import styled from 'react-emotion';

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

const Container = styled('div')`
    padding: 0 20px;
    height: 100%;
    width: 500px;
`;

const CircleContainer = styled('div')`
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
`;

const BulletPointContainer = styled('div')`
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;
    position: absolute;
    width: ${({ width }) => `${width}%`};
    left: ${({ position, width }) => `calc(${position}% - ${width / 2}%)`};
`;

const BulletPoint = styled('span')`
    background-color: grey;
    border-radius: 50%;
    outline: none;
    height: ${({ bulletSize }) => `${bulletSize}px`};
    width: ${({ bulletSize }) => `${bulletSize}px`};
`;

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
                                            bulletSize={10}
                                        />
                                    </BulletPointContainer>
                                ))}
                                <Circle
                                    active={selectedChoice !== undefined}
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
