import React, { Component } from 'react';
import Zuck from 'zuck.js';
import './App.css';

import alfaUsaq from "../../../assets/images/stories/Alfa-Təkli-Çarpayı (1).png"
import alfaUsaq1 from "../../../assets/images/stories/Alfa-Uşaq-Dəsti (1).png"
import carpayi from "../../../assets/images/stories/Almaz-Təkli-Çarpayı.png"
import puf from "../../../assets/images/stories/Amor-Puf.png"
import dolab from "../../../assets/images/stories/Aprel-Dolab.png"
import qonaqDesti from "../../../assets/images/stories/Aprel-Qonaq-Dəsti.png"
import yataqDesti from "../../../assets/images/stories/Borçalı-Yataq-Dəsti.png"
import termo from "../../../assets/images/stories/Çinar-termo.png"
import divan from "../../../assets/images/stories/Elit-Divan.png"
export default class App extends Component {
  constructor(props) {
    super(props);
    this.storiesElement = null;
    this.storiesApi = null;
    this.state = {
      stories: [
        Zuck.buildTimelineItem(
        'ramon111',
        alfaUsaq,
        false,
        false,
        1575221470504,
        [
          [
            'ramon-1',
            'photo',
            3,
            alfaUsaq,
            alfaUsaq,
            '',
            false,
            false,
            1575221470504,
          ],
          ],
        ),

        Zuck.buildTimelineItem(
          'ramon',
        alfaUsaq,
            false,
          'https://ramon.codes',
          1575221470504,
          [
            [
              'ramon-1',
              'photo',
              3,
              alfaUsaq1,
              alfaUsaq1,
              '',
              false,
              false,
              1575221470504,
            ],
            ],
        ),
        Zuck.buildTimelineItem(
          'ramon',
        alfaUsaq,
            false,
          'https://ramon.codes',
          1575221470504,
          [
            [
              'ramon-1',
              'photo',
              3,
              alfaUsaq1,
              alfaUsaq1,
              '',
              false,
              false,
              1575221470504,
            ],
            ],
        ),
        Zuck.buildTimelineItem(
          'ramon',
          carpayi,
            false,
          'https://ramon.codes',
          1575221470504,
          [
            [
              'ramon-1',
              'photo',
              3,
              carpayi,
              carpayi,
              '',
              false,
              false,
              1575221470504,
            ],
            ],
        ),

        Zuck.buildTimelineItem(
          'ramon',
          puf,
            false,
          'https://ramon.codes',
          1575221470504,
          [
            [
              'ramon-1',
              'photo',
              3,
              puf,
              puf,
              '',
              false,
              false,
              1575221470504,
            ],
            ],
        ),
        Zuck.buildTimelineItem(
          'ramon',
        alfaUsaq,
            false,
          'https://ramon.codes',
          1575221470504,
          [
            [
              'ramon-1',
              'photo',
              3,
              alfaUsaq1,
              alfaUsaq1,
              '',
              false,
              false,
              1575221470504,
            ],
            ],
        ),
        Zuck.buildTimelineItem(
          'ramon',
          dolab,
            false,
          'https://ramon.codes',
          1575221470504,
          [
            [
              'ramon-1',
              'photo',
              3,
              dolab,
              dolab,
              '',
              false,
              false,
              1575221470504,
            ],
            ],
        ),
        Zuck.buildTimelineItem(
          'ramon',
          dolab,
            false,
          'https://ramon.codes',
          1575221470504,
          [
            [
              'ramon-1',
              'photo',
              3,
              dolab,
              dolab,
              '',
              false,
              false,
              1575221470504,
            ],
            ],
        ),
        Zuck.buildTimelineItem(
          'ramon',
          qonaqDesti,
            false,
          'https://ramon.codes',
          1575221470504,
          [
            [
              'ramon-1',
              'photo',
              3,
              qonaqDesti,
              qonaqDesti,
              '',
              false,
              false,
              1575221470504,
            ],
            ],
        ),
        Zuck.buildTimelineItem(
          'ramon',
          divan,
            false,
          'https://ramon.codes',
          1575221470504,
          [
            [
              'ramon-1',
              'photo',
              3,
              divan,
              divan,
              '',
              false,
              false,
              1575221470504,
            ],
            ],
        ),
        Zuck.buildTimelineItem(
          'ramon',
          termo,
            false,
          'https://ramon.codes',
          1575221470504,
          [
            [
              'ramon-1',
              'photo',
              3,
              termo,
              termo,
              '',
              false,
              false,
              1575221470504,
            ],
            ],
        ),
        Zuck.buildTimelineItem(
          'ramon',
          divan,
            false,
          'https://ramon.codes',
          1575221470504,
          [
            [
              'ramon-1',
              'photo',
              3,
              divan,
              divan,
              '',
              false,
              false,
              1575221470504,
            ],
            ],
        ),
        Zuck.buildTimelineItem(
          'ramon',
          yataqDesti,
            false,
          'https://ramon.codes',
          1575221470504,
          [
            [
              'ramon-1',
              'photo',
              3,
              yataqDesti,
              yataqDesti,
              '',
              false,
              false,
              1575221470504,
            ],
            ],
        ),
        Zuck.buildTimelineItem(
          'ramon',
          yataqDesti,
            false,
          'https://ramon.codes',
          1575221470504,
          [
            [
              'ramon-1',
              'photo',
              3,
              yataqDesti,
              yataqDesti,
              '',
              false,
              false,
              1575221470504,
            ],
            ],
        ),
      ],
    };
  }

  componentDidMount() {
    let stories = new Zuck(this.storiesElement, {
      skin: 'snapgram', // container class
      avatars: true, // shows user photo instead of last story item preview
      list: false, // displays a timeline instead of carousel
      openEffect: true, // enables effect when opening story - may decrease performance
      cubeEffect: false, // enables the 3d cube effect when sliding story - may decrease performance
      autoFullScreen: false, // enables fullscreen on mobile browsers
      backButton: true, // adds a back button to close the story viewer
      backNative: false, // uses window history to enable back button on browsers/android
      previousTap: true, // use 1/3 of the screen to navigate to previous item when tap the story
      localStorage: true, // set true to save "seen" position. Element must have a id to save properly.
      reactive: true, // set true if you use frameworks like React to control the timeline (see react.sample.html)
      callbacks: {
        onDataUpdate: function(currentState, callback) {
          this.setState(
            state => {
              state.stories = currentState;
               return state;
            },
            () => {
              callback();
            },
          );
        }.bind(this),
      },
      stories: this.state.stories,
    });
  }

  render() {
    const timelineItems = [];

    this.state.stories.map((story, storyId) => {
      const storyItems = [];

      story.items.map(storyItem => {
        storyItems.push(
           <li
            key={storyItem.id}
            data-id={storyItem.id}
            data-time={storyItem.time}
            className={storyItem.seen ? 'seen' : ''}
          >
            <a
              href={storyItem.src}
              data-type={storyItem.type}
              data-length={storyItem.length}
              data-link={storyItem.link}
              data-linkText={storyItem.linkText}
            >
              <img src={storyItem.preview} />
            </a>
          </li>
          
          ,
        );
      });

      let arrayFunc = story.seen ? 'push' : 'unshift';
      timelineItems[arrayFunc](
        <div
          className={story.seen ? 'story seen' : 'story'}
          key={storyId}
          data-id={storyId}
          data-last-updated={story.lastUpdated}
          data-photo={story.photo}
        >
          <a className="item-link" href={story.link}>
            <span className="item-preview">
              <img src={story.photo} />
            </span>
            <span className="info" itemProp="author" itemScope="" itemType="http://schema.org/Person">
              <strong className="name" itemProp="name">
                {story.name}
              </strong>
              <span className="time">{story.lastUpdated}</span>
            </span>
          </a>

          <ul className="items">{storyItems}</ul>
        </div>,
      );
    });

    return (
      <div>
        <div ref={node => (this.storiesElement = node)} id="stories-react" className="storiesWrapper">
          {timelineItems}
        </div>
      </div>
    );
  }
}